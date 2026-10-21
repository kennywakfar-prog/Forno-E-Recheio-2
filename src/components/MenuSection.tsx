import React from 'react';
import { Flame, Sparkles, Plus, Check } from 'lucide-react';
import { PotatoMenu } from '../types';
import { POTATO_MENUS } from '../lib/constants';

interface MenuSectionProps {
  onSelectMenu: (menu: PotatoMenu) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectMenu }) => {
  return (
    <section id="cardapio" className="py-12 md:py-20 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#FF5E1A]" />
            <span>Cardápio Artesanal a 220°C</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Nossos Menus <span className="text-gradient-oven">Assados no Forno</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Cada pedido é servido como <strong className="text-amber-300">Menu Completo</strong>: inclui a sua batata recheada assada na perfeição a 220°C e uma bebida gelada à sua escolha sem nenhum custo adicional.
          </p>
        </div>

        {/* 4 Menus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {POTATO_MENUS.map((menu) => (
            <div
              key={menu.id}
              className="group relative bg-[#13101C] rounded-3xl border border-white/10 hover:border-orange-500/50 shadow-xl hover:shadow-[0_0_35px_rgba(255,94,26,0.25)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13101C] via-[#13101C]/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                    {menu.badge && (
                      <span className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg">
                        {menu.badge}
                      </span>
                    )}
                    <span className="bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40">
                      📸 Foto Real
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Bebida Inclusa</span>
                  </div>

                  {/* Price Tag pill */}
                  <div className="absolute bottom-3 right-3 bg-[#0C0A10]/90 backdrop-blur-md border border-orange-500/40 text-white font-heading font-black text-xl px-3.5 py-1.5 rounded-2xl shadow-xl">
                    {menu.price.toFixed(2)} €
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-white group-hover:text-amber-300 transition-colors">
                      {menu.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                      {menu.tagline}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {menu.description}
                  </p>

                  {/* Ingredient checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-zinc-400 block">
                      Ingredientes Selecionados:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-zinc-300">
                      {menu.ingredients.slice(0, 4).map((ing, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3.5 h-3.5 text-[#FF5E1A] shrink-0" />
                          <span className="truncate">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3">
                <div className="text-[11px] text-zinc-400">
                  <span className="text-emerald-400 font-bold block">✓ Acompanha Bebida</span>
                  <span>(Coca, Guaraná, Ice Tea...)</span>
                </div>

                <button
                  onClick={() => onSelectMenu(menu)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-[0_0_20px_rgba(255,94,26,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Montar Menu</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
