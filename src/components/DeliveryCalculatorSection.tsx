import React, { useState } from 'react';
import { MapPin, Navigation, Search, CheckCircle2, AlertCircle, Info, Sparkles, Compass } from 'lucide-react';
import { RESTAURANT_INFO, GUIMARAES_PRESETS } from '../lib/constants';
import { calculateHaversineDistance, getDeliveryTier, calculateDeliveryByAddress } from '../lib/delivery';
import { DeliveryCalculation } from '../types';

interface DeliveryCalculatorSectionProps {
  onSetDeliveryInfo?: (info: DeliveryCalculation) => void;
}

export const DeliveryCalculatorSection: React.FC<DeliveryCalculatorSectionProps> = ({
  onSetDeliveryInfo,
}) => {
  const [addressInput, setAddressInput] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [result, setResult] = useState<DeliveryCalculation | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const handleGpsCalculation = () => {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('A geolocalização não é suportada pelo seu navegador.');
      return;
    }

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGpsLoading(false);
        const { latitude, longitude } = position.coords;
        const dist = calculateHaversineDistance(latitude, longitude);
        const calc = getDeliveryTier(
          dist,
          'gps',
          `GPS Atual (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) - ${dist} km`
        );
        setResult(calc);
        if (onSetDeliveryInfo) onSetDeliveryInfo(calc);
      },
      (err) => {
        setIsGpsLoading(false);
        console.warn('GPS Error', err);
        setGpsError('Não foi possível obter o GPS. Por favor, digite a sua morada ou selecione a sua freguesia abaixo.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleAddressSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!addressInput.trim()) return;

    setIsAddressLoading(true);
    setGpsError(null);
    try {
      const calc = await calculateDeliveryByAddress(addressInput);
      setResult(calc);
      if (onSetDeliveryInfo) onSetDeliveryInfo(calc);
    } catch {
      setGpsError('Erro ao consultar endereço. Tente selecionar uma freguesia abaixo.');
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handlePresetSelect = (preset: typeof GUIMARAES_PRESETS[0]) => {
    const calc = getDeliveryTier(preset.distanceKm, 'preset', preset.name);
    setResult(calc);
    setAddressInput(preset.name);
    if (onSetDeliveryInfo) onSetDeliveryInfo(calc);
  };

  return (
    <section id="calculadora" className="py-12 md:py-20 relative z-10 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with glowing frame */}
        <div className="bg-[#13101E] rounded-3xl border border-orange-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(255,94,26,0.2)]">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#FF5E1A]" />
              <span>Cálculo Inteligente por Haversine</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Calcular <span className="text-gradient-oven">Taxa de Entrega</span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm">
              Cozinha Base: <strong className="text-zinc-200">{RESTAURANT_INFO.address}</strong> (Creixomil). Calcule a distância exata até à sua porta em Guimarães.
            </p>
          </div>

          {/* Pricing Rules Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-[11px] font-bold text-emerald-300 block">De 0 a 4,0 km</span>
              <span className="font-heading font-black text-lg text-emerald-400">100% GRÁTIS</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="text-[11px] font-bold text-amber-300 block">De 4,1 a 8,0 km</span>
              <span className="font-heading font-black text-lg text-amber-400">Taxa Fixa 1,50 €</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-center">
              <span className="text-[11px] font-bold text-orange-300 block">Acima de 8,0 km</span>
              <span className="font-heading font-black text-sm text-orange-300 pt-1 block">A combinar no WhatsApp</span>
            </div>
          </div>

          {/* Action Row: GPS + Address Search */}
          <div className="space-y-4">
            
            {/* GPS Instant Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGpsCalculation}
                disabled={isGpsLoading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg hover:shadow-[0_0_25px_rgba(255,94,26,0.5)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Navigation className={`w-4 h-4 ${isGpsLoading ? 'animate-spin' : ''}`} />
                <span>{isGpsLoading ? 'Obtendo GPS com Alta Precisão...' : 'Usar meu GPS atual (1-Clique)'}</span>
              </button>
            </div>

            {/* Address Search Form */}
            <form onSubmit={handleAddressSearch} className="relative flex items-center">
              <MapPin className="absolute left-4 w-5 h-5 text-orange-500" />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Ou digite sua morada ou freguesia em Guimarães (Ex: Urgezes, Azurém, Silvares...)"
                className="w-full bg-[#1A1527] border border-white/10 rounded-2xl pl-12 pr-32 py-3.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isAddressLoading || !addressInput.trim()}
                className="absolute right-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isAddressLoading ? 'A calcular...' : 'Calcular'}</span>
              </button>
            </form>

            {gpsError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{gpsError}</span>
              </div>
            )}

            {/* Guimarães Presets Chips */}
            <div>
              <span className="text-[11px] font-bold text-zinc-400 block mb-2">
                Freguesias Rápidas de Guimarães:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {GUIMARAES_PRESETS.slice(0, 10).map((preset) => (
                  <button
                    key={preset.freguesia}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="text-[11px] bg-[#1E182D] hover:bg-orange-500/20 text-zinc-300 hover:text-white border border-white/5 hover:border-orange-500/40 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    {preset.freguesia} (~{preset.distanceKm} km)
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            {result && (
              <div className={`mt-6 p-5 rounded-2xl border transition-all ${
                result.status === 'free'
                  ? 'bg-emerald-950/40 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : result.status === 'standard'
                  ? 'bg-amber-950/40 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-orange-950/40 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-5 h-5 ${
                        result.status === 'free' ? 'text-emerald-400' : 'text-amber-400'
                      }`} />
                      <span className="font-heading font-black text-xl text-white">
                        {result.status === 'free' && '🎉 Entrega 100% Grátis!'}
                        {result.status === 'standard' && '🚚 Taxa Fixa de Entrega'}
                        {result.status === 'custom' && '💬 Entrega sob Consulta'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Distância calculada da nossa cozinha em Creixomil: <strong className="text-white">{result.distanceKm} km</strong>
                    </p>
                    {result.addressSummary && (
                      <p className="text-[11px] text-zinc-400 truncate">
                        Local: {result.addressSummary}
                      </p>
                    )}
                  </div>

                  <div className="text-right sm:border-l sm:border-white/10 sm:pl-6">
                    <span className="text-[11px] text-zinc-400 block uppercase tracking-wider">Taxa a aplicar:</span>
                    <span className="font-heading font-black text-2xl text-white">
                      {result.statusText}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
