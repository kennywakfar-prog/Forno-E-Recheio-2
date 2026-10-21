import React, { useState } from 'react';
import { X, Check, Flame, Plus, Minus, Sparkles } from 'lucide-react';
import { PotatoMenu, ExtraOption, CartItem } from '../types';
import { INCLUDED_DRINKS, EXTRA_TOPPINGS } from '../lib/constants';

interface MenuItemModalProps {
  menu: PotatoMenu | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  menu,
  onClose,
  onAddToCart,
}) => {
  const [selectedDrink, setSelectedDrink] = useState<string>(INCLUDED_DRINKS[0].name);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!menu) return null;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = menu.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart({
      menu,
      selectedDrink,
      selectedExtras,
      notes: notes.trim(),
      quantity,
      unitPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#14111D] border border-orange-500/30 rounded-3xl shadow-[0_0_50px_rgba(255,94,26,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover object-[center_65%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14111D] via-transparent to-black/60" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer z-10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <div className="bg-[#FF5E1A] text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow">
              <Flame className="w-3.5 h-3.5" />
              <span>Forno a 220°C</span>
            </div>
            <div className="bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
              📸 Foto Real
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              Menu Completo com Bebida Inclusa
            </span>
            <h2 className="font-heading font-black text-3xl text-white">
              {menu.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
          {/* Description */}
          <div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {menu.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {menu.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-[#1E192B] text-zinc-300 border border-white/5 px-2.5 py-1 rounded-lg"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Step 1: Bebida Inclusa (Obrigatória, sem custo adicional) */}
          <div className="bg-[#1A1527] border border-orange-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FF5E1A] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Escolha sua Bebida Inclusa
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                0,00 € (Grátis)
              </span>
            </div>
            
            <p className="text-[12px] text-zinc-400">
              Todos os menus acompanham uma bebida gelada à sua escolha:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INCLUDED_DRINKS.map((drink) => {
                const isSelected = selectedDrink === drink.name;
                return (
                  <button
                    key={drink.id}
                    type="button"
                    onClick={() => setSelectedDrink(drink.name)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF5E1A]/15 border-[#FF5E1A] text-white shadow-[0_0_15px_rgba(255,94,26,0.25)]'
                        : 'bg-[#130F1F] border-white/5 text-zinc-300 hover:border-orange-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{drink.icon}</span>
                      <span className="font-semibold">{drink.name}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#FF5E1A] flex items-center justify-center text-white">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Extras Opcionais */}
          <div className="bg-[#1A1527] border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-zinc-700 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-white">
                  Deseja algum Extra? (Opcional)
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400">Toppings adicionais</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXTRA_TOPPINGS.map((extra) => {
                const isSelected = selectedExtras.some((e) => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white'
                        : 'bg-[#130F1F] border-white/5 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <span className="font-medium">{extra.name}</span>
                    <span className="font-bold text-amber-300">+{extra.price.toFixed(2)} €</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Observações especiais */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 block">
              Observações para o Chefe de Cozinha (Opcional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Sem cebolinho, queijo bem tostadinho, etc."
              maxLength={120}
              className="w-full bg-[#1A1527] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5E1A] transition-colors"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#100D18] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#1A1527] border border-white/10 rounded-xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-[#251E36] hover:bg-[#322849] flex items-center justify-center text-white transition-all cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-heading font-black text-base text-white px-2">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-[#251E36] hover:bg-[#322849] flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to cart CTA */}
          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-extrabold text-sm shadow-[0_0_20px_rgba(255,94,26,0.4)] hover:shadow-[0_0_30px_rgba(255,94,26,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Adicionar ao Cesto</span>
            <span>•</span>
            <span className="font-black text-amber-100">{totalPrice.toFixed(2)} €</span>
          </button>
        </div>
      </div>
    </div>
  );
};
