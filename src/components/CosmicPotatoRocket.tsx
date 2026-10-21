import React from 'react';

export const CosmicPotatoRocket: React.FC = () => {
  return (
    <div 
      className="absolute top-24 right-4 md:right-16 lg:right-28 pointer-events-none select-none z-10 opacity-85 hover:opacity-100 transition-opacity"
      title="Foguete Forno & Recheio - Entrega Espacial em Guimarães"
    >
      <div className="relative animate-rocket">
        {/* Warm thermal pulse aura behind rocket */}
        <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/30 via-amber-500/40 to-yellow-500/20 rounded-full blur-2xl animate-pulse" />

        <svg 
          className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_0_20px_rgba(255,162,56,0.7)]" 
          viewBox="0 0 140 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame propulsion tail matching brand logo */}
          <path 
            d="M32 96 Q14 110 4 134 Q28 120 44 104 Z" 
            fill="url(#brandFlame1)" 
            className="animate-pulse"
          />
          <path 
            d="M36 92 Q22 104 14 124 Q32 112 46 98 Z" 
            fill="url(#brandFlame2)" 
          />
          <path 
            d="M40 88 Q30 96 24 110 Q38 102 48 94 Z" 
            fill="#FFFBEB" 
          />

          {/* Twinkling star sparks around the rocket */}
          <path d="M12 40 L15 48 L23 51 L15 54 L12 62 L9 54 L1 51 L9 48 Z" fill="#FDE047" opacity="0.8" className="animate-pulse" />
          <path d="M115 15 L117 21 L123 23 L117 25 L115 31 L113 25 L107 23 L113 21 Z" fill="#FBBF24" opacity="0.9" />
          <path d="M126 80 L128 85 L133 87 L128 89 L126 94 L124 89 L119 87 L124 85 Z" fill="#FFA238" opacity="0.85" />

          {/* Rocket Main Hull (Retro warm amber/cream matching logo) */}
          <path 
            d="M48 88 C32 72 44 38 78 20 C108 5 125 18 128 44 C130 68 104 98 66 94 C54 93 50 90 48 88 Z" 
            fill="url(#rocketBodyGrad)" 
            stroke="#78350F" 
            strokeWidth="3"
          />

          {/* Red nose cone */}
          <path 
            d="M106 13 C118 18 127 28 128 44 C124 40 114 30 106 13 Z" 
            fill="#C2410C" 
            stroke="#78350F" 
            strokeWidth="2" 
          />

          {/* Turquoise Porthole Windows matching logo */}
          <circle cx="92" cy="38" r="9" fill="#0D9488" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="90" cy="36" r="3" fill="#99F6E4" opacity="0.8" />

          <circle cx="74" cy="52" r="7" fill="#0D9488" stroke="#78350F" strokeWidth="2" />
          <circle cx="72.5" cy="50.5" r="2" fill="#99F6E4" opacity="0.8" />

          {/* Rocket Wing Fin Top */}
          <path d="M54 40 Q40 30 42 16 Q62 26 66 35 Z" fill="#EA580C" stroke="#78350F" strokeWidth="2.5" />
          {/* Rocket Wing Fin Bottom */}
          <path d="M56 90 Q44 104 38 118 Q54 110 68 95 Z" fill="#EA580C" stroke="#78350F" strokeWidth="2.5" />

          {/* Gradients */}
          <defs>
            <linearGradient id="brandFlame1" x1="44" y1="104" x2="4" y2="134" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5E1A" />
              <stop offset="0.5" stopColor="#FFA238" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="brandFlame2" x1="46" y1="98" x2="14" y2="124" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.6" stopColor="#FF5E1A" />
              <stop offset="1" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="rocketBodyGrad" x1="45" y1="20" x2="115" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.4" stopColor="#F59E0B" />
              <stop offset="0.9" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating delivery pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg border border-orange-400/50 backdrop-blur-md -mt-3 ml-4">
          <span className="animate-spin text-xs">🚀</span>
          <span>Entrega a Jato em Guimarães</span>
        </div>
      </div>
    </div>
  );
};
