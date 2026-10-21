import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  Navigation, 
  User, 
  Phone, 
  Banknote, 
  Crown, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DeliveryCalculation, VipMember } from '../types';
import { RESTAURANT_INFO, GUIMARAES_PRESETS } from '../lib/constants';
import { calculateHaversineDistance, getDeliveryTier, calculateDeliveryByAddress } from '../lib/delivery';
import { getLocalVipProfile, registerVipMember, saveOrderToFirestore } from '../lib/firebase';
import { WhatsAppIcon, MbWayIcon } from './Icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  initialDeliveryInfo: DeliveryCalculation | null;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  initialDeliveryInfo,
  onClearCart,
}) => {
  const vipProfile = getLocalVipProfile();

  const [customerName, setCustomerName] = useState(vipProfile?.name || '');
  const [customerPhone, setCustomerPhone] = useState(vipProfile?.phone || '');
  const [address, setAddress] = useState(vipProfile?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'MBWAY' | 'DINHEIRO'>('MBWAY');
  const [changeFor, setChangeFor] = useState('');
  const [vipOptIn, setVipOptIn] = useState(!vipProfile);

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryCalculation | null>(initialDeliveryInfo);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // If initialDelivery passed, keep updated
  useEffect(() => {
    if (initialDeliveryInfo && !deliveryInfo) {
      setDeliveryInfo(initialDeliveryInfo);
    }
  }, [initialDeliveryInfo]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = deliveryInfo?.fee && deliveryInfo.fee > 0 ? deliveryInfo.fee : 0;
  const isCustomDelivery = deliveryInfo?.status === 'custom';
  const total = subtotal + deliveryFee;

  const handleGpsClick = () => {
    setDeliveryError(null);
    if (!navigator.geolocation) {
      setDeliveryError('Geolocalização não disponível no navegador.');
      return;
    }

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        const { latitude, longitude } = pos.coords;
        const dist = calculateHaversineDistance(latitude, longitude);
        const calc = getDeliveryTier(
          dist,
          'gps',
          `GPS Atual (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) - ${dist} km`
        );
        setDeliveryInfo(calc);
        if (!address) {
          setAddress(`Localização via GPS (Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}) - Guimarães`);
        }
      },
      (err) => {
        setIsGpsLoading(false);
        console.warn(err);
        setDeliveryError('Não foi possível obter GPS. Por favor digite sua morada ou freguesia.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleAddressCalc = async () => {
    if (!address.trim()) {
      setDeliveryError('Por favor digite sua morada para calcular a taxa.');
      return;
    }

    setIsAddressLoading(true);
    setDeliveryError(null);
    try {
      const calc = await calculateDeliveryByAddress(address);
      setDeliveryInfo(calc);
    } catch {
      setDeliveryError('Erro ao calcular endereço. Selecione uma freguesia abaixo.');
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handlePresetSelect = (preset: typeof GUIMARAES_PRESETS[0]) => {
    const calc = getDeliveryTier(preset.distanceKm, 'preset', preset.name);
    setDeliveryInfo(calc);
    setAddress(`${preset.name}, Guimarães`);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (customerName.trim().length < 2) {
      setFormError('Por favor preencha o seu nome completo.');
      return;
    }

    if (customerPhone.trim().length < 9) {
      setFormError('Por favor preencha um número de telemóvel (+351) válido.');
      return;
    }

    if (address.trim().length < 4) {
      setFormError('Por favor informe a morada de entrega em Guimarães.');
      return;
    }

    // Default delivery info if not yet calculated
    let finalDelivery = deliveryInfo;
    if (!finalDelivery) {
      finalDelivery = getDeliveryTier(3.0, 'address', 'Guimarães Centro (estimado)');
      setDeliveryInfo(finalDelivery);
    }

    // Build items summary
    const itemsLines = items.map((item, index) => {
      const extrasStr = item.selectedExtras.length > 0 
        ? `\n   🧀 Extras: ${item.selectedExtras.map(e => `${e.name} (+${e.price.toFixed(2)}€)`).join(', ')}`
        : '';
      const notesStr = item.notes ? `\n   📝 Obs: "${item.notes}"` : '';

      return `${index + 1}x *${item.menu.name}* (${item.unitPrice.toFixed(2)} €/un)
   🥤 Bebida inclusa: *${item.selectedDrink}*${extrasStr}${notesStr}`;
    }).join('\n\n');

    const deliveryFeeLabel = finalDelivery.status === 'free'
      ? '100% GRÁTIS'
      : finalDelivery.status === 'standard'
      ? '1,50 €'
      : 'A combinar no WhatsApp';

    const cleanPhone = customerPhone.startsWith('+') ? customerPhone : `+351 ${customerPhone}`;

    // Format WhatsApp Message
    const message = `🔥 *NOVO PEDIDO - FORNO & RECHEIO* 🥔
📍 Creixomil, Guimarães | Forno a 220°C

📋 *RESUMO DOS MENUS:*
${itemsLines}

💰 *VALORES:*
• Subtotal Menus: ${subtotal.toFixed(2)} €
• Taxa de Entrega: *${deliveryFeeLabel}* (${finalDelivery.distanceKm} km)
👉 *TOTAL A PAGAR: ${total.toFixed(2)} €* ${isCustomDelivery ? '(+ taxa entrega)' : ''}

👤 *DADOS DE ENTREGA:*
• Nome: *${customerName.trim()}*
• Telemóvel: *${cleanPhone}*
• Morada: *${address.trim()}*
• Pagamento: *${paymentMethod === 'MBWAY' ? 'MB WAY' : `Dinheiro${changeFor ? ` (Troco para ${changeFor} €)` : ' (Valor exato)'}`}*
${vipProfile ? '⭐ *Cliente Membro VIP Ativo*' : vipOptIn ? '⭐ *Opt-in: Quero entrar no Clube VIP*' : ''}

Obrigado! Aguardo a confirmação do forno para assar! 🚀`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodedMessage}`;
    setWhatsappUrl(waUrl);

    // If VIP opt-in requested and not already VIP
    if (vipOptIn && !vipProfile) {
      try {
        await registerVipMember({
          name: customerName.trim(),
          phone: cleanPhone,
          address: address.trim(),
          birthdayMonth: 'Janeiro',
          favoriteFlavor: items[0]?.menu.name || 'AeroChicken',
          source: 'checkout_optin',
        });
      } catch (err) {
        console.warn('Could not auto-register VIP', err);
      }
    }

    // Record order in Firestore for owner panel
    try {
      await saveOrderToFirestore({
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        address: address.trim(),
        itemsSummary: items.map(i => `${i.quantity}x ${i.menu.name} (${i.selectedDrink})`).join(', '),
        subtotal,
        deliveryFee: finalDelivery.fee > 0 ? finalDelivery.fee : 0,
        total,
        paymentMethod,
        changeFor: paymentMethod === 'DINHEIRO' ? changeFor : undefined,
        distanceKm: finalDelivery.distanceKm,
        createdAt: new Date().toISOString(),
        vipOptIn,
      });
    } catch (err) {
      console.warn('Failed saving order record', err);
    }

    // Trigger celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#25D366', '#FF5E1A', '#FFA238', '#FFFFFF']
      });
    } catch {
      // Confetti fallback
    }

    setOrderSent(true);

    // Open WhatsApp in new tab / app
    window.open(waUrl, '_blank');
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#14101F] border border-orange-500/40 rounded-3xl shadow-[0_0_60px_rgba(255,94,26,0.3)] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-[#1E172C] via-[#161223] to-[#251B38] border-b border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF5E1A]/20 text-[#FF5E1A] border border-[#FF5E1A]/40">
              <Flame className="w-6 h-6 animate-flame" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 block">
                Fricção Zero • Sem Registo Obrigatório
              </span>
              <h2 className="font-heading font-black text-xl text-white">
                Finalizar Pedido no WhatsApp
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSent ? (
          /* Order success state */
          <div className="p-8 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-[#25D366] flex items-center justify-center mx-auto border border-[#25D366]/40 animate-pulse">
              <WhatsAppIcon className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Pedido Formatado com Sucesso!
              </h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto">
                A janela do WhatsApp foi aberta. Caso não tenha aberto automaticamente, clique no botão abaixo para enviar o pedido diretamente para o número <strong className="text-white">+351 939 975 314</strong>:
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1A1428] border border-white/10 max-w-md mx-auto text-left text-xs text-zinc-300 space-y-1">
              <span className="font-bold text-amber-300 block">Resumo do Pedido ({total.toFixed(2)} €):</span>
              <p className="line-clamp-3 italic text-zinc-400">
                {items.map(i => `${i.quantity}x ${i.menu.name}`).join(', ')} • {customerName} • {address}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 text-black" />
                <span>Abrir Mensagem no WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#251D38] hover:bg-[#322849] text-white font-bold text-sm transition-all cursor-pointer"
              >
                Concluir & Novo Pedido
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 max-h-[calc(85vh-8rem)] overflow-y-auto">
            
            {/* VIP Recognized Notice */}
            {vipProfile && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Crown className="w-5 h-5 text-yellow-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Checkout 1-Clique Ativo!</span>
                    <span className="text-[11px] text-amber-200">Seus dados VIP foram pré-preenchidos automaticamente.</span>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-amber-400 text-black px-2 py-0.5 rounded-full">
                  VIP ★
                </span>
              </div>
            )}

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 1: Client Contacts */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>1. Seus Dados de Contacto</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 block">
                    Nome Completo:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5E1A] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-300 block">
                    Telemóvel / WhatsApp (+351):
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ex: 939 123 456"
                    className="w-full bg-[#1A1428] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5E1A] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Morada & Taxa de Entrega Haversine */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>2. Morada de Entrega em Guimarães</span>
                </h3>
                
                {/* Instant GPS trigger */}
                <button
                  type="button"
                  onClick={handleGpsClick}
                  disabled={isGpsLoading}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF5E1A] hover:text-[#FFA238] bg-orange-500/10 hover:bg-orange-500/20 px-2.5 py-1 rounded-lg border border-orange-500/30 transition-all cursor-pointer"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isGpsLoading ? 'animate-spin' : ''}`} />
                  <span>{isGpsLoading ? 'Obtendo GPS...' : 'Usar meu GPS atual'}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Rua de Creixomil, Nº 26, 1º Dto, Guimarães"
                  className="w-full bg-[#1A1428] border border-white/10 rounded-xl pl-3.5 pr-28 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5E1A] transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddressCalc}
                  disabled={isAddressLoading || !address.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  <span>{isAddressLoading ? 'A calcular...' : 'Calcular'}</span>
                </button>
              </div>

              {deliveryError && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-xs">
                  {deliveryError}
                </div>
              )}

              {/* Quick Freguesia Presets */}
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[10px] text-zinc-400 mr-1">Freguesias rápidas:</span>
                {GUIMARAES_PRESETS.slice(0, 6).map((preset) => (
                  <button
                    key={preset.freguesia}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="text-[10px] bg-[#1E172D] text-zinc-300 hover:text-white hover:bg-orange-500/20 border border-white/5 px-2 py-0.5 rounded transition-colors cursor-pointer"
                  >
                    {preset.freguesia} (~{preset.distanceKm}km)
                  </button>
                ))}
              </div>

              {/* Delivery Fee Status Tag */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                !deliveryInfo
                  ? 'bg-zinc-900 border-white/10 text-zinc-400'
                  : deliveryInfo.status === 'free'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : deliveryInfo.status === 'standard'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  : 'bg-orange-950/40 border-orange-500/40 text-orange-300'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Taxa de Entrega: <strong className="text-white">{deliveryInfo ? deliveryInfo.statusText : '100% GRÁTIS até 4km'}</strong>
                    {deliveryInfo && ` (${deliveryInfo.distanceKm} km de Creixomil)`}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  Cozinha a 220°C
                </span>
              </div>
            </div>

            {/* Step 3: Pagamento */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Banknote className="w-4 h-4" />
                <span>3. Forma de Pagamento</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MBWAY')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === 'MBWAY'
                      ? 'bg-red-500/15 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : 'bg-[#1A1428] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-1">
                    <MbWayIcon />
                    <span className="text-xs font-bold text-white block">MB WAY</span>
                    <span className="text-[10px] text-zinc-400">Paga no telemóvel</span>
                  </div>
                  {paymentMethod === 'MBWAY' && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('DINHEIRO')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === 'DINHEIRO'
                      ? 'bg-emerald-500/15 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-[#1A1428] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-base">💶</span>
                    <span className="text-xs font-bold text-white block">Dinheiro</span>
                    <span className="text-[10px] text-zinc-400">Na entrega</span>
                  </div>
                  {paymentMethod === 'DINHEIRO' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {paymentMethod === 'DINHEIRO' && (
                <div className="p-3 bg-[#1A1428] rounded-xl border border-white/10 space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300 block">
                    Precisa de troco? Para quanto? (Opcional):
                  </label>
                  <input
                    type="text"
                    value={changeFor}
                    onChange={(e) => setChangeFor(e.target.value)}
                    placeholder="Ex: Troco para nota de 20 € ou 50 €"
                    className="w-full bg-[#130F1E] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              )}
            </div>

            {/* VIP Opt-in Checkbox (if not already member) */}
            {!vipProfile && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-400/30 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="vipOptIn"
                  checked={vipOptIn}
                  onChange={(e) => setVipOptIn(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                />
                <label htmlFor="vipOptIn" className="text-xs text-zinc-200 cursor-pointer">
                  <strong className="text-amber-300 block">Desejo entrar no Clube VIP Forno & Recheio (100% Grátis)</strong>
                  <span className="text-[11px] text-zinc-400 block">
                    Salvar minha morada para Checkout 1-Clique nos próximos pedidos e receber ofertas secretas no WhatsApp.
                  </span>
                </label>
              </div>
            )}

            {/* Price breakdown summary */}
            <div className="p-4 rounded-2xl bg-[#1A1428] border border-white/10 space-y-1.5 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} menus com bebida):</span>
                <span className="font-bold text-white">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Entrega:</span>
                <span className={`font-bold ${deliveryInfo?.fee === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {deliveryInfo ? deliveryInfo.statusText : '100% GRÁTIS'}
                </span>
              </div>
              <div className="flex justify-between text-base font-heading font-black text-white pt-2 border-t border-white/10">
                <span>Total a Pagar:</span>
                <span className="text-gradient-oven text-xl">
                  {total.toFixed(2)} € {isCustomDelivery ? '(+ taxa)' : ''}
                </span>
              </div>
            </div>

            {/* Send WhatsApp Order Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-emerald-500 to-teal-500 hover:brightness-110 text-black font-black text-sm sm:text-base shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-5 h-5 text-black" />
                <span>Enviar Pedido Pronto para o WhatsApp (+351 939 975 314)</span>
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
