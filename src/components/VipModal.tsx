import React, { useState } from 'react';
import { X, Crown, Sparkles, CheckCircle2, Gift, MapPin, Phone, User, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerVipMember, getLocalVipProfile } from '../lib/firebase';
import { MONTHS_LIST, POTATO_MENUS } from '../lib/constants';
import { VipMember } from '../types';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (member: VipMember) => void;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const existing = getLocalVipProfile();
  const [name, setName] = useState(existing?.name || '');
  const [phone, setPhone] = useState(existing?.phone || '');
  const [address, setAddress] = useState(existing?.address || '');
  const [birthdayMonth, setBirthdayMonth] = useState(existing?.birthdayMonth || 'Janeiro');
  const [favoriteFlavor, setFavoriteFlavor] = useState(existing?.favoriteFlavor || 'AeroChicken');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (name.trim().length < 2) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (phone.trim().length < 9) {
      setErrorMessage('Por favor, informe um número de telemóvel/WhatsApp válido (+351).');
      return;
    }

    if (address.trim().length < 4) {
      setErrorMessage('Por favor, informe a sua morada de entrega em Guimarães.');
      return;
    }

    setIsSubmitting(true);
    try {
      const registered = await registerVipMember({
        name: name.trim(),
        phone: phone.trim().startsWith('+') ? phone.trim() : `+351 ${phone.trim()}`,
        address: address.trim(),
        birthdayMonth,
        favoriteFlavor,
        source: 'vip_modal',
      });

      // Confetti burst!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFA238', '#FF5E1A', '#F59E0B', '#FBBF24']
        });
      } catch {
        // Safe if confetti fails
      }

      setIsComplete(true);
      onSuccess(registered);
      setTimeout(() => {
        setIsComplete(false);
        onClose();
      }, 2400);
    } catch (err) {
      console.error(err);
      setErrorMessage('Ocorreu um erro ao registrar. Seus dados foram salvos no dispositivo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#14101F] border border-amber-500/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.3)] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold banner */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-5 text-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-black/10 rounded-xl">
              <Crown className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-black/75 block">
                Privilégio Exclusivo
              </span>
              <h2 className="font-heading font-black text-xl leading-tight">
                Clube VIP Forno & Recheio
              </h2>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/10 hover:bg-black/25 text-black transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-400/50 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              Bem-vindo(a) ao Clube VIP!
            </h3>
            <p className="text-zinc-300 text-sm max-w-sm mx-auto">
              Seus privilégios foram ativados com sucesso! O seu Checkout 1-Clique já está configurado neste dispositivo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <p className="text-xs text-zinc-300">
              Cadastre-se para desbloquear o <strong className="text-amber-300">Checkout 1-Clique</strong>, receber sabores secretos no WhatsApp e ganhar mimo no seu mês de aniversário!
            </p>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Seu Nome Completo:</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria Fernandes"
                className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp (+351):</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 939 123 456 ou +351 939 123 456"
                className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Morada Habitual em Guimarães:</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Rua de Creixomil, Nº 14, 2º Esq, Guimarães"
                className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Birthday month & Favorite Flavor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mês de Aniversário:</span>
                </label>
                <select
                  value={birthdayMonth}
                  onChange={(e) => setBirthdayMonth(e.target.value)}
                  className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {MONTHS_LIST.map((m) => (
                    <option key={m} value={m} className="bg-[#14101F] text-white">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sabor Favorito:</span>
                </label>
                <select
                  value={favoriteFlavor}
                  onChange={(e) => setFavoriteFlavor(e.target.value)}
                  className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {POTATO_MENUS.map((m) => (
                    <option key={m.id} value={m.name} className="bg-[#14101F] text-white">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-black font-black text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Ativando Privilégios...' : 'Ativar Meu Clube VIP 100% Grátis'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
