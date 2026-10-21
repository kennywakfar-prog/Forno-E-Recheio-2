import React from 'react';
import { Flame, MapPin, Phone, Clock, Lock, Heart, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../lib/constants';
import { WhatsAppIcon, GlovoIcon } from './Icons';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenVipModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenVipModal }) => {
  return (
    <footer id="localizacao" className="relative z-10 bg-[#08060B] border-t border-orange-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E1A] to-[#FFA238] p-0.5 shadow-[0_0_15px_rgba(255,94,26,0.4)]">
                <div className="w-full h-full bg-[#120F1A] rounded-[9px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#FF5E1A]" />
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                Forno <span className="text-[#FF5E1A]">&</span> Recheio
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Especialistas em batatas recheadas artesanais assadas na pedra a 220°C. Sabor autêntico, queijo crocante gratinado e bebida inclusa em todos os menus.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#25D366] border border-emerald-500/30 transition-all"
                title="WhatsApp Oficial"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href={RESTAURANT_INFO.glovoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all"
                title="Pedir na Glovo"
              >
                <GlovoIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & Kitchen Base */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-400">
              Cozinha Base
            </h4>
            
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5E1A] shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address}<br />
                  {RESTAURANT_INFO.postalCode} Creixomil, Guimarães
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a 
                  href={`tel:${RESTAURANT_INFO.whatsappRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Entrega 100% Grátis até 4,0 km</span>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-400">
              Horário de Delivery
            </h4>
            
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Terça a Domingo</span>
                  <span className="text-zinc-400">18h30 às 23h00</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#130F1E] border border-white/5 text-[11px] text-zinc-400">
                ♨️ <strong className="text-zinc-200">Segunda-feira:</strong> Forno em descanso para manutenção técnica.
              </div>
            </div>
          </div>

          {/* Links Rápidos & Clube VIP */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-400">
              Links do Forno
            </h4>
            
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#cardapio" className="hover:text-amber-300 transition-colors">
                  ➔ Cardápio com Bebida Inclusa
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-amber-300 transition-colors">
                  ➔ Calculadora de Entrega Haversine
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenVipModal}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  ➔ Clube VIP (Checkout 1-Clique)
                </button>
              </li>
              <li>
                <a 
                  href={RESTAURANT_INFO.glovoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  ➔ Ver Cardápio na Glovo
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & discrete owner link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Forno & Recheio • Creixomil, Guimarães. Feito com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>e calor a 220°C.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-600">Netlify Ready • Node 20 SPA</span>
            
            {/* Protected Owner Panel Link */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer text-xs p-1 rounded"
              title="Acesso com PIN da Gerência"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Área do Restaurante (Gestão)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
