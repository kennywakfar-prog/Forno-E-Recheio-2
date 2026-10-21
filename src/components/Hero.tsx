import React from 'react';
import { Flame, Sparkles, ShieldCheck, MapPin, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { CosmicPotatoRocket } from './CosmicPotatoRocket';

interface HeroProps {
  onOrderClick: () => void;
  onVipClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onVipClick }) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Cosmic potato rocket element */}
      <CosmicPotatoRocket />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 border border-orange-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Flame className="w-4 h-4 text-[#FF5E1A] animate-flame" />
              <span>Assadas no Forno a 220°C • Creixomil, Guimarães</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-orange-400"></span>
              <span className="hidden sm:inline text-white font-bold">Entrega 100% Grátis até 4km</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Batatas Recheadas <br className="hidden sm:inline"/>
              <span className="text-gradient-oven">Artesanais a 220°C</span> <br/>
              com Bebida Inclusa!
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              O autêntico sabor gourmet no conforto da sua casa. Batatas inglesas gigantes assadas na brasa a 220°C, cobertas com recheios generosos, queijo gratinado dourado e uma bebida gelada à sua escolha sem nenhum acréscimo.
            </p>

            {/* Conversion Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#14111B]/80 border border-orange-500/20 rounded-xl p-3 flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-[#FF5E1A]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold">Bebida Grátis</h4>
                  <p className="text-[11px] text-zinc-400">Em todos os menus</p>
                </div>
              </div>

              <div className="bg-[#14111B]/80 border border-orange-500/20 rounded-xl p-3 flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-[#FFA238]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold">Forno a 220°C</h4>
                  <p className="text-[11px] text-zinc-400">Crosta e queijo crocante</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#14111B]/80 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold">Fricção Zero</h4>
                  <p className="text-[11px] text-zinc-400">Peça sem registo chato</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onOrderClick}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#FF5E1A] via-[#FF7A00] to-[#FFA238] text-white font-extrabold text-base shadow-[0_0_30px_rgba(255,94,26,0.5)] hover:shadow-[0_0_40px_rgba(255,94,26,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Fazer Pedido Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onVipClick}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#1A1424] hover:bg-[#221B2F] border border-amber-400/40 text-amber-300 font-bold text-sm transition-all hover:scale-[1.01] cursor-pointer"
              >
                <span>⭐ Entrar no Clube VIP Grátis</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cozinha Base em Creixomil</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Entrega Rápida Quentinha</span>
              </span>
            </div>
          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Visual glow frame */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#FF5E1A]/60 via-amber-500/20 to-transparent shadow-[0_0_45px_rgba(255,94,26,0.3)]">
              <div className="relative rounded-[22px] overflow-hidden bg-[#120E1C] border border-white/10 p-5 space-y-4">
                
                {/* Featured item image preview */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden group">
                  <img
                    src="/assets/aistudio/hero-potato_e5f2646f.jpg"
                    alt="Batata Recheada Forno & Recheio Real"
                    className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-3 left-3 bg-[#0C0A10]/90 backdrop-blur-md border border-orange-500/40 text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-[#FF5E1A]" />
                    <span>Forno 220°C Real</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg">
                    Bebida Inclusa
                  </div>

                  {/* Bottom overlay inside image */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#FFA238]">Foto Real do Menu</span>
                    <h3 className="font-heading font-black text-2xl text-white">MeatLove & Bacon em Cubos</h3>
                    <p className="text-xs text-zinc-300 line-clamp-1">Carne moída apurada, farto bacon fumado crocante e batata palha</p>
                  </div>
                </div>

                {/* Quick Drinks Showcase Strip */}
                <div className="bg-[#191424] rounded-xl p-3 border border-orange-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 block">Bebida à Escolha (Grátis):</span>
                    <span className="text-[10px] text-zinc-400">Coca-Cola, Guaraná, Ice Tea, Água ou Super Bock</span>
                  </div>
                  <div className="flex -space-x-1 text-base">
                    <span title="Refrigerante">🥤</span>
                    <span title="Ice Tea">🍑</span>
                    <span title="Cerveja Super Bock">🍺</span>
                    <span title="Água">💧</span>
                  </div>
                </div>

                {/* Price and Instant Add Callout */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Preço do Menu Completo:</span>
                    <span className="font-heading font-black text-2xl text-white">12,90 €</span>
                  </div>
                  <button
                    onClick={onOrderClick}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white text-xs font-black shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    Personalizar Menu ➔
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
