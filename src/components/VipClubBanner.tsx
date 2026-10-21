import React from 'react';
import { Crown, Sparkles, Gift, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface VipClubBannerProps {
  onOpenModal: () => void;
  isVip: boolean;
  vipName?: string;
}

export const VipClubBanner: React.FC<VipClubBannerProps> = ({
  onOpenModal,
  isVip,
  vipName,
}) => {
  return (
    <section className="py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl p-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(245,158,11,0.25)] overflow-hidden">
          <div className="relative rounded-[22px] bg-gradient-to-br from-[#191307] via-[#120E1A] to-[#1F140A] p-6 sm:p-8 md:p-10">
            
            {/* Background luxury glow and sparkles */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Text side */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{isVip ? 'Você é Membro Exclusivo' : 'Clube VIP 100% Grátis'}</span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                  {isVip ? (
                    <>Olá, <span className="text-gradient-gold">{vipName || 'Membro VIP'}</span>! Seus privilégios estão ativos.</>
                  ) : (
                    <>Entre no <span className="text-gradient-gold">Clube VIP Forno & Recheio</span> e peça com 1-Clique</>
                  )}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {isVip
                    ? 'Sua morada e telemóvel já estão salvos com segurança neste telemóvel. Ao pedir, o formulário de checkout é pré-preenchido automaticamente!'
                    : 'Cadastre-se em 30 segundos sem senhas. Tenha acesso a checkout instantâneo, ofertas secretas semanais e um mimo saboroso no seu mês de aniversário.'}
                </p>

                {/* Privileges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-yellow-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Checkout 1-Clique</span>
                      <span className="text-[10px] text-zinc-400">Morada salva no telemóvel</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-yellow-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Sabores Secretos</span>
                      <span className="text-[10px] text-zinc-400">Em 1ª mão no WhatsApp</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-yellow-400">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Mimo de Aniversário</span>
                      <span className="text-[10px] text-zinc-400">Sobremesa ou extra especial</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Side */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                {isVip ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-center w-full max-w-xs space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
                    <span className="text-xs font-bold text-amber-200 block">Status: Membro VIP Ativo</span>
                    <button
                      onClick={onOpenModal}
                      className="text-xs text-amber-400 underline hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      Atualizar dados do Clube VIP
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onOpenModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-black font-black text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Quero Entrar no Clube VIP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
