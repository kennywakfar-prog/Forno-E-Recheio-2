import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDocFromServer,
  Timestamp 
} from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';
import { VipMember, CustomerOrder } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// Test connection at initialization
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client is offline or initializing.");
    }
  }
}
testConnection();

const LOCAL_STORAGE_VIP_KEY = 'forno_recheio_vip_members';
const LOCAL_STORAGE_VIP_PROFILE = 'forno_recheio_vip_profile';

export function getLocalVipProfile(): VipMember | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_VIP_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLocalVipProfile(member: VipMember) {
  try {
    localStorage.setItem(LOCAL_STORAGE_VIP_PROFILE, JSON.stringify(member));
    // Also save in local list
    const currentList = getLocalVipList();
    const updated = [member, ...currentList.filter(m => m.phone !== member.phone)];
    localStorage.setItem(LOCAL_STORAGE_VIP_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed saving local VIP profile', err);
  }
}

export function getLocalVipList(): VipMember[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_VIP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Register a VIP Member in Firestore with fallback to LocalStorage
 */
export async function registerVipMember(member: Omit<VipMember, 'id' | 'createdAt'> & { source?: 'vip_modal' | 'checkout_optin' | 'admin_entry' }): Promise<VipMember> {
  const fullMember: VipMember = {
    name: member.name.trim(),
    phone: member.phone.trim(),
    address: member.address.trim(),
    birthdayMonth: member.birthdayMonth || 'Janeiro',
    favoriteFlavor: member.favoriteFlavor || 'AeroChicken',
    source: member.source || 'vip_modal',
    createdAt: new Date().toISOString(),
  };

  // Always save locally first for instant 1-Click checkout readiness
  saveLocalVipProfile(fullMember);

  try {
    const docRef = await addDoc(collection(db, 'vip_members'), {
      ...fullMember,
      timestamp: Timestamp.now(),
    });
    return { ...fullMember, id: docRef.id };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'vip_members');
    // Still return the valid fullMember backed up in localStorage
    return fullMember;
  }
}

/**
 * Fetch all VIP Members from Firestore with local fallback
 */
export async function fetchVipMembers(): Promise<VipMember[]> {
  try {
    const q = query(collection(db, 'vip_members'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const remoteMembers: VipMember[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      remoteMembers.push({
        id: doc.id,
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        birthdayMonth: data.birthdayMonth || '',
        favoriteFlavor: data.favoriteFlavor || '',
        source: data.source || 'vip_modal',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });

    if (remoteMembers.length > 0) {
      // Sync local cache
      try {
        localStorage.setItem(LOCAL_STORAGE_VIP_KEY, JSON.stringify(remoteMembers));
      } catch {
        // Ignore quota
      }
      return remoteMembers;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'vip_members');
  }

  // Fallback to local storage list
  return getLocalVipList();
}

/**
 * Save an order in Firestore
 */
export async function saveOrderToFirestore(order: CustomerOrder) {
  try {
    await addDoc(collection(db, 'orders'), {
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      address: order.address,
      summary: order.itemsSummary,
      total: order.total,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      timestamp: Timestamp.now(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'orders');
  }
}
