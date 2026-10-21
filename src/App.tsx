import React, { useState, useEffect } from 'react';
import { OvenAtmosphere } from './components/OvenAtmosphere';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { VipClubBanner } from './components/VipClubBanner';
import { DeliveryCalculatorSection } from './components/DeliveryCalculatorSection';
import { Footer } from './components/Footer';
import { MenuItemModal } from './components/MenuItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { VipModal } from './components/VipModal';
import { OwnerAdminModal } from './components/OwnerAdminModal';
import { CartItem, PotatoMenu, DeliveryCalculation, VipMember } from './types';
import { getLocalVipProfile } from './lib/firebase';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'forno_recheio_cart_items';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryCalculation | null>(null);
  const [selectedMenuForModal, setSelectedMenuForModal] = useState<PotatoMenu | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [vipProfile, setVipProfile] = useState<VipMember | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // Load VIP profile from local storage on mount
  useEffect(() => {
    const profile = getLocalVipProfile();
    setVipProfile(profile);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleAddToCart = (newItem: Omit<CartItem, 'cartId'>) => {
    const cartId = `${newItem.menu.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const fullItem: CartItem = { ...newItem, cartId };
    setCartItems((prev) => [...prev, fullItem]);

    // Show temporary feedback toast
    setAddedToast(`${newItem.quantity}x ${newItem.menu.name} adicionado ao cesto!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 3000);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    } catch {
      // Ignore
    }
  };

  const handleVipSuccess = (member: VipMember) => {
    setVipProfile(member);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A10] text-gray-100 relative selection:bg-[#FF5E1A]/30 selection:text-[#FFA238]">
      {/* 220°C Oven Sparks and Atmospheric Background */}
      <OvenAtmosphere />

      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        isVip={!!vipProfile}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOrderClick={() => scrollToSection('cardapio')}
          onVipClick={() => setIsVipModalOpen(true)}
        />

        {/* VIP Club Golden Banner */}
        <VipClubBanner
          onOpenModal={() => setIsVipModalOpen(true)}
          isVip={!!vipProfile}
          vipName={vipProfile?.name}
        />

        {/* 4 Signature Oven Menus */}
        <MenuSection
          onSelectMenu={(menu) => setSelectedMenuForModal(menu)}
        />

        {/* Haversine Delivery Calculator */}
        <DeliveryCalculatorSection
          onSetDeliveryInfo={(info) => setDeliveryInfo(info)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      {/* Sticky Mobile Floating Cart Bar */}
      {cartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-extrabold shadow-[0_0_30px_rgba(255,94,26,0.6)] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs block font-bold leading-tight">Ver Cesto ({cartCount})</span>
                <span className="text-[11px] text-amber-100">Bebidas Inclusas</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-base">{cartSubtotal.toFixed(2)} €</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Toast Notification when item added */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1428] border border-orange-500/40 text-white px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(255,94,26,0.4)] flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <MenuItemModal
        menu={selectedMenuForModal}
        onClose={() => setSelectedMenuForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        deliveryInfo={deliveryInfo}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        initialDeliveryInfo={deliveryInfo}
        onClearCart={handleClearCart}
      />

      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        onSuccess={handleVipSuccess}
      />

      <OwnerAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
