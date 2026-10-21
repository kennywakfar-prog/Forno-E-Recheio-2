import { RESTAURANT_INFO, GUIMARAES_PRESETS } from './constants';
import { DeliveryCalculation } from '../types';

/**
 * Calculates straight line distance in km between two GPS coordinates using Haversine formula
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number = RESTAURANT_INFO.kitchenCoords.lat,
  lon2: number = RESTAURANT_INFO.kitchenCoords.lng
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Applies delivery fee tier based on distance:
 * 0 a 4,0 km: 100% GRÁTIS
 * 4,1 a 8,0 km: Taxa fixa de 1,50 €
 * Acima de 8,0 km: Taxa a combinar pelo WhatsApp
 */
export function getDeliveryTier(distanceKm: number, calculatedVia: 'gps' | 'address' | 'preset', addressSummary?: string): DeliveryCalculation {
  if (distanceKm <= 4.0) {
    return {
      distanceKm,
      fee: 0,
      status: 'free',
      statusText: '100% GRÁTIS',
      calculatedVia,
      addressSummary,
    };
  } else if (distanceKm <= 8.0) {
    return {
      distanceKm,
      fee: 1.50,
      status: 'standard',
      statusText: '1,50 €',
      calculatedVia,
      addressSummary,
    };
  } else {
    return {
      distanceKm,
      fee: -1,
      status: 'custom',
      statusText: 'A combinar no WhatsApp',
      calculatedVia,
      addressSummary,
    };
  }
}

/**
 * Smart lookup by Guimarães address or freguesia
 */
export async function calculateDeliveryByAddress(query: string): Promise<DeliveryCalculation> {
  const normalized = query.trim().toLowerCase();

  // 1. Try local Guimarães database matches
  const match = GUIMARAES_PRESETS.find(p => 
    normalized.includes(p.freguesia.toLowerCase()) || 
    p.freguesia.toLowerCase().includes(normalized) ||
    normalized.includes(p.name.toLowerCase())
  );

  if (match) {
    return getDeliveryTier(match.distanceKm, 'preset', `${match.name} (~${match.distanceKm} km)`);
  }

  // 2. Try Nominatim Geocoding for Guimarães with fallback
  try {
    const encoded = encodeURIComponent(`${query}, Guimarães, Portugal`);
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`, {
      headers: { 'Accept-Language': 'pt' }
    });
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      const dist = calculateHaversineDistance(lat, lon);
      return getDeliveryTier(dist, 'address', `${data[0].display_name.split(',')[0]} (${dist} km)`);
    }
  } catch (err) {
    console.warn('Geocoding request failed or blocked, using heuristic distance', err);
  }

  // 3. Fallback: Estimativa padrão para o concelho de Guimarães
  const fallbackKm = 3.2;
  return getDeliveryTier(fallbackKm, 'address', `${query} (~${fallbackKm} km estimada)`);
}
