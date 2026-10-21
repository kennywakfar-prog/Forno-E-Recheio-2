import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { CartItem, DeliveryCalculation } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  deliveryInfo: DeliveryCalculation | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  deliveryInfo,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = deliveryInfo?.fee && deliveryInfo.fee > 0 ? deliveryInfo.fee : 0;
  const isCustomDelivery = deliveryInfo?.status === 'custom';
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130F1E] border-l border-orange-500/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#191427]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-500/20 text-[#FF5E1A]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-lg text-white">
                  Seu Cesto do Forno
                </h2>
                <span className="text-[11px] text-zinc-400">
                  {items.length === 0 ? 'Vazio no momento' : `${items.length} ${items.length === 1 ? 'menu selecionado' : 'menus selecionados'}`}
                </span>
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

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Flame className="w-8 h-8 animate-flame" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Seu cesto está vazio
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Que tal experimentar nossa deliciosa batata assada a 220°C com bebida inclusa?
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#FF5E1A] text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                >
                  Ver Menus
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-[#1A1428] border border-white/10 rounded-2xl p-4 space-y-2.5 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-base text-white">
                          {item.menu.name}
                        </span>
                        <span className="text-xs font-black text-amber-400">
                          {(item.unitPrice * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                      
                      {/* Included Drink */}
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit">
                        <Sparkles className="w-3 h-3" />
                        <span>Bebida: {item.selectedDrink}</span>
                      </div>

                      {/* Extras */}
                      {item.selectedExtras.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.selectedExtras.map((extra) => (
                            <span
                              key={extra.id}
                              className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded"
                            >
                              +{extra.name} (+{extra.price.toFixed(2)}€)
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Notes */}
                      {item.notes && (
                        <p className="mt-1 text-[11px] text-zinc-400 italic">
                          Obs: "{item.notes}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] text-zinc-400">
                      {item.unitPrice.toFixed(2)} € unid.
                    </span>

                    <div className="flex items-center gap-2 bg-[#120D1D] rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="w-6 h-6 rounded bg-[#251D38] hover:bg-[#34294E] flex items-center justify-center text-white text-xs cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="w-6 h-6 rounded bg-[#251D38] hover:bg-[#34294E] flex items-center justify-center text-white text-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 bg-[#191427] border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal Menus:</span>
                  <span className="font-bold text-white">{subtotal.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Taxa de Entrega:</span>
                  {deliveryInfo ? (
                    <span className={`font-bold ${deliveryInfo.fee === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {deliveryInfo.statusText}
                    </span>
                  ) : (
                    <span className="text-zinc-400 text-[11px]">Calculada no checkout</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-heading font-black text-white pt-2 border-t border-white/10">
                  <span>Total Estimado:</span>
                  <span className="text-gradient-oven text-xl">
                    {total.toFixed(2)} € {isCustomDelivery && '(+ taxa WhatsApp)'}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-extrabold text-sm shadow-[0_0_25px_rgba(255,94,26,0.4)] hover:shadow-[0_0_35px_rgba(255,94,26,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Finalizar Pedido no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-zinc-400 text-center">
                🔒 Sem registo obrigatório • Pagamento por MB WAY ou Dinheiro na entrega
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
