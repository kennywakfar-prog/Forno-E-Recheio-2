import React from 'react';

export const CosmicPotatoRocket: React.FC = () => {
  return (
    <div 
      className="absolute top-28 right-4 md:right-16 lg:right-24 pointer-events-none select-none z-10 opacity-75 hover:opacity-100 transition-opacity"
      title="Foguete Cósmico de Batata - Entrega Rápida Forno & Recheio"
    >
      <div className="relative animate-rocket">
        {/* Glow behind the rocket */}
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/30 rounded-full blur-xl" />

        <svg 
          className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(255,162,56,0.6)]" 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame propulsion tail */}
          <path 
            d="M25 85 Q15 95 8 115 Q30 102 38 88 Z" 
            fill="url(#flameGrad1)" 
            className="animate-pulse"
          />
          <path 
            d="M30 82 Q22 92 18 108 Q32 98 40 84 Z" 
            fill="url(#flameGrad2)" 
          />

          {/* Golden Baked Potato Body */}
          <path 
            d="M35 80 C20 65 30 35 55 22 C80 10 102 25 106 50 C108 70 85 95 55 92 C42 91 38 86 35 80 Z" 
            fill="url(#potatoSkinGrad)" 
            stroke="#92400E" 
            strokeWidth="2.5"
          />

          {/* Melted Cheese Filling Core */}
          <path 
            d="M50 35 C65 28 85 36 88 52 C90 65 78 78 60 76 C48 75 42 66 44 52 C45 42 48 38 50 35 Z" 
            fill="url(#cheeseGrad)" 
          />

          {/* Crispy bacon and green herbs flakes on potato */}
          <rect x="58" y="44" width="7" height="3" rx="1.5" fill="#991B1B" transform="rotate(-15 58 44)" />
          <rect x="70" y="52" width="6" height="3" rx="1.5" fill="#7F1D1D" transform="rotate(25 70 52)" />
          <circle cx="54" cy="52" r="1.5" fill="#15803D" />
          <circle cx="75" cy="42" r="1.5" fill="#15803D" />
          <circle cx="68" cy="62" r="1.5" fill="#16A34A" />

          {/* Astronaut Glass Visor */}
          <ellipse cx="78" cy="38" rx="12" ry="9" fill="#0284C7" fillOpacity="0.4" stroke="#E0F2FE" strokeWidth="1.5" transform="rotate(20 78 38)" />
          <ellipse cx="76" cy="36" rx="4" ry="2" fill="#FFFFFF" fillOpacity="0.8" transform="rotate(20 76 36)" />

          {/* Rocket Wing Fin 1 */}
          <path d="M42 86 L28 100 L44 94 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          {/* Rocket Wing Fin 2 */}
          <path d="M72 82 L78 98 L64 90 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />

          {/* Rocket Thruster Nozzle */}
          <ellipse cx="36" cy="84" rx="7" ry="4" fill="#4B5563" stroke="#1F2937" strokeWidth="1" transform="rotate(35 36 84)" />

          {/* Gradients */}
          <defs>
            <linearGradient id="flameGrad1" x1="38" y1="88" x2="8" y2="115" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5E1A" />
              <stop offset="0.6" stopColor="#FFA238" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameGrad2" x1="40" y1="84" x2="18" y2="108" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#FDE047" />
              <stop offset="1" stopColor="#FF5E1A" />
            </linearGradient>
            <linearGradient id="potatoSkinGrad" x1="30" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B45309" />
              <stop offset="0.5" stopColor="#D97706" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="cheeseGrad" x1="45" y1="35" x2="85" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.5" stopColor="#FBBF24" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Speed trail tag */}
        <div className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-orange-400/40 backdrop-blur-sm -mt-2 ml-4">
          <span>🚀 220°C a Jato</span>
        </div>
      </div>
    </div>
  );
};
