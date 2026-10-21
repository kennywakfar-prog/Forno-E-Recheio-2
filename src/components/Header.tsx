import React from 'react';
import { Flame, ShoppingBag, Crown, MapPin } from 'lucide-react';
import { WhatsAppIcon, GlovoIcon } from './Icons';
import { RESTAURANT_INFO } from '../lib/constants';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenVipModal: () => void;
  isVip: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenVipModal,
  isVip,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C0A10]/90 backdrop-blur-md border-b border-orange-500/20 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Forno & Recheio Delivery Logo"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_16px_rgba(255,94,26,0.6)] group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(255,162,56,0.8)] transition-all"
                />
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full border border-black shadow">
                  220°C
                </div>
              </div>

              <div className="hidden sm:block">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                  Forno <span className="text-[#FF5E1A]">&</span> Recheio
                </span>
                <span className="block text-[11px] font-medium text-amber-200/80 -mt-0.5">
                  Batatas Recheadas • Creixomil, Guimarães
                </span>
              </div>
            </a>

            {/* Live Oven Status badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-[#1A1424] border border-orange-500/30 text-xs font-semibold text-orange-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Forno Quente a 220°C • Delivery Aberto</span>
            </div>
          </div>

          {/* Quick links & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Location Tag */}
            <a 
              href="#localizacao" 
              className="hidden md:flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF5E1A]" />
              <span>Creixomil, Guimarães</span>
            </a>

            {/* Glovo link button */}
            <a
              href={RESTAURANT_INFO.glovoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all"
              title="Pedir pela Glovo"
            >
              <GlovoIcon className="w-4 h-4" />
              <span>Glovo</span>
            </a>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('Olá Forno & Recheio! Gostaria de informações sobre o cardápio de batatas recheadas.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
              title="Falar no WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Clube VIP Button */}
            <button
              onClick={onOpenVipModal}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                isVip
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-400/50 hover:bg-amber-500/30'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{isVip ? 'Membro VIP ★' : 'Clube VIP'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,94,26,0.4)] hover:shadow-[0_0_25px_rgba(255,94,26,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              aria-label="Abrir cesto de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cesto</span>
              {cartCount > 0 && (
                <span className="bg-black/80 text-amber-300 text-[11px] px-2 py-0.5 rounded-full border border-amber-400/50 font-black">
                  {cartCount} • {cartTotal.toFixed(2)} €
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Live Oven Bar */}
      <div className="lg:hidden bg-gradient-to-r from-[#FF5E1A]/20 via-[#1A1424] to-[#FFA238]/20 border-t border-orange-500/20 py-1.5 px-4 text-center">
        <p className="text-[11px] text-amber-200 font-semibold flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Forno Quente a 220°C • Delivery em Guimarães (Bebida Grátis em Todos os Menus)
        </p>
      </div>
    </header>
  );
};
