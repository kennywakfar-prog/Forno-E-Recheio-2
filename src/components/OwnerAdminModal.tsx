import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Lock, 
  Search, 
  Download, 
  Copy, 
  Check, 
  Users, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { VipMember } from '../types';
import { fetchVipMembers } from '../lib/firebase';
import { RESTAURANT_INFO } from '../lib/constants';
import { WhatsAppIcon } from './Icons';

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [members, setMembers] = useState<VipMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVipMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === RESTAURANT_INFO.adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.address.toLowerCase().includes(q) ||
      m.favoriteFlavor.toLowerCase().includes(q)
    );
  });

  // Export Excel CSV with UTF-8 BOM
  const handleExportCsv = () => {
    if (members.length === 0) return;

    const headers = [
      'Data de Registo',
      'Nome do Cliente',
      'Telemóvel / WhatsApp',
      'Morada de Entrega',
      'Mês Aniversário',
      'Sabor Favorito',
      'Origem'
    ];

    const rows = members.map((m) => {
      const dateFormatted = new Date(m.createdAt).toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      return [
        `"${dateFormatted}"`,
        `"${m.name.replace(/"/g, '""')}"`,
        `"${m.phone}"`,
        `"${m.address.replace(/"/g, '""')}"`,
        `"${m.birthdayMonth}"`,
        `"${m.favoriteFlavor.replace(/"/g, '""')}"`,
        `"${m.source}"`
      ].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `forno-recheio-vip-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy clean phone numbers for WhatsApp Business Broadcast List
  const handleCopyWhatsAppNumbers = () => {
    const numbers = members.map((m) => {
      let num = m.phone.replace(/\D/g, '');
      if (num.length === 9) num = `351${num}`;
      return `+${num}`;
    }).filter(Boolean);

    const uniqueNumbers = Array.from(new Set(numbers));
    const textToCopy = uniqueNumbers.join(', ');

    navigator.clipboard.writeText(textToCopy);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#130F1F] border border-orange-500/30 rounded-3xl shadow-[0_0_60px_rgba(255,94,26,0.25)] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-[#1D172B] to-[#120E1C] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-[#FF5E1A]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                Painel Restrito da Gerência
              </span>
              <h2 className="font-heading font-black text-xl text-white">
                Gestão de Leads & Membros VIP
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

        {!isAuthenticated ? (
          /* PIN Auth Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1428] border border-orange-500/30 flex items-center justify-center mx-auto text-[#FF5E1A]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading font-bold text-xl text-white">
                Introduza o PIN de Acesso
              </h3>
              <p className="text-xs text-zinc-400">
                Acesso exclusivo para os responsáveis do restaurante Forno & Recheio. (PIN padrão: <strong className="text-amber-400">1234</strong>)
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Introduza o PIN (Ex: 1234)"
                className="w-full bg-[#1A1428] border border-white/15 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:outline-none focus:border-orange-500"
              />

              {pinError && (
                <div className="p-2 text-xs text-red-300 bg-red-500/10 rounded-lg border border-red-500/30 flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>PIN incorreto. Tente novamente (Padrão: 1234).</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E1A] to-[#FFA238] text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                Entrar no Painel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-6 space-y-6 max-h-[calc(85vh-8rem)] overflow-y-auto">
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#1A1428] border border-orange-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Total de Leads VIP</span>
                  <span className="font-heading font-black text-2xl text-white">{members.length}</span>
                </div>
                <Users className="w-8 h-8 text-amber-400 opacity-60" />
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1428] border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Base Firestore</span>
                  <span className="font-heading font-bold text-sm text-emerald-400 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Sincronizado
                  </span>
                </div>
                <Sparkles className="w-8 h-8 text-emerald-400 opacity-60" />
              </div>

              <div className="p-4 rounded-2xl bg-[#1A1428] border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Campanhas WhatsApp</span>
                  <span className="font-heading font-black text-xs text-amber-300 mt-1 block">
                    {members.length} números prontos
                  </span>
                </div>
                <WhatsAppIcon className="w-8 h-8 text-emerald-400 opacity-70" />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome, telefone, morada ou sabor..."
                  className="w-full bg-[#1A1428] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCsv}
                  disabled={members.length === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow disabled:opacity-50"
                  title="Exportar para Excel / Google Sheets"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar Excel (CSV)</span>
                </button>

                <button
                  onClick={handleCopyWhatsAppNumbers}
                  disabled={members.length === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs transition-all cursor-pointer shadow disabled:opacity-50"
                  title="Copiar lista de números para Lista de Transmissão"
                >
                  {copiedSuccess ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                  <span>{copiedSuccess ? 'Copiados (+351)!' : 'Copiar p/ WhatsApp'}</span>
                </button>

                <button
                  onClick={loadData}
                  className="p-2.5 rounded-xl bg-[#1A1428] hover:bg-[#251D38] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Atualizar dados"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

            </div>

            {/* Leads Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#181324]">
              {filteredMembers.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 text-xs">
                  {members.length === 0 
                    ? 'Nenhum membro ou lead registrado ainda. Conforme os clientes fizerem pedidos ou se inscreverem no Clube VIP, eles aparecerão aqui instantaneamente!' 
                    : 'Nenhum lead encontrado com o termo pesquisado.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#120E1C] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Cliente</th>
                        <th className="py-3 px-4">WhatsApp (+351)</th>
                        <th className="py-3 px-4">Morada</th>
                        <th className="py-3 px-4">Sabor / Niver</th>
                        <th className="py-3 px-4 text-right">Contacto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-200">
                      {filteredMembers.map((member, i) => {
                        const rawPhone = member.phone.replace(/\D/g, '');
                        const waChatUrl = `https://wa.me/${rawPhone.startsWith('351') ? rawPhone : `351${rawPhone}`}?text=${encodeURIComponent(`Olá ${member.name}! Aqui é do Forno & Recheio. Temos uma oferta especial para si!`)}`;

                        return (
                          <tr key={member.id || i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-bold text-white block">{member.name}</span>
                              <span className="text-[10px] text-zinc-400">
                                {new Date(member.createdAt).toLocaleDateString('pt-PT')}
                              </span>
                            </td>

                            <td className="py-3 px-4 font-mono text-emerald-400">
                              {member.phone}
                            </td>

                            <td className="py-3 px-4 max-w-xs truncate text-zinc-300" title={member.address}>
                              {member.address}
                            </td>

                            <td className="py-3 px-4">
                              <span className="text-amber-300 font-semibold block">{member.favoriteFlavor}</span>
                              <span className="text-[10px] text-zinc-400">🎉 {member.birthdayMonth}</span>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <a
                                href={waChatUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-all"
                                title="Conversar no WhatsApp"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" />
                                <span>Conversar</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
