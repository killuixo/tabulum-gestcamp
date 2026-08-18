import React, { useState, useEffect } from 'react';

const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const IconUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconPackage = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>;
const IconAlert = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconCheck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconTruck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const IconList = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconGrid = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

export default function App() {
  const [activeTab, setActiveTab] = useState('novo_pedido'); 
  const [viewConfig, setViewConfig] = useState({ mode: 'list', sort: 'data_desc', page: 1, detailFilter: null });
  
  const [articulador, setArticulador] = useState({ nome: '', email: '', telefone: '' });
  const [lideranca, setLideranca] = useState({ nome: '', email: '', telefone: '' });
  const [modoRecebimento, setModoRecebimento] = useState(''); 
  const [regiaoDespacho, setRegiaoDespacho] = useState('Interior de Santa Catarina');
  const [enderecoRecebimento, setEnderecoRecebimento] = useState('');
  const [horarioRetirada, setHorarioRetirada] = useState('');
  
  const [estoque, setEstoque] = useState([]);
  const [pedidos, setPedidos] = useState({});
  const [loadingEstoque, setLoadingEstoque] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState(null); 

  const [listaPedidos, setListaPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [mensagemLista, setMensagemLista] = useState(null);
  const [modalStatus, setModalStatus] = useState({ show: false, step: 1, order: null, newStatus: '' });
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (activeTab === 'novo_pedido' && estoque.length === 0) fetchStockData();
    if (activeTab === 'dashboard') fetchPedidosData();
  }, [activeTab]);

  const fetchStockData = async () => {
    setLoadingEstoque(true);
    setMensagem(null);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      if (!url) throw new Error('A URL do script não foi configurada na variável VITE_SHEETS_API_URL.');
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.status === 'error') throw new Error(result.message);
      if (result.type !== 'estoque') throw new Error('O Google Script retornou dados incorretos.');
      
      setEstoque(result.data || []);
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: `Erro no Estoque: ${error.message}` });
    } finally {
      setLoadingEstoque(false);
    }
  };

  const fetchPedidosData = async () => {
    setLoadingPedidos(true);
    setMensagemLista(null);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      if (!url) throw new Error('A URL do script não foi configurada na Vercel.');
      
      const separator = url.includes('?') ? '&' : '?';
      const response = await fetch(`${url}${separator}action=pedidos`);
      const result = await response.json();
      
      if (result.status === 'error') throw new Error(result.message);
      
      if (result.type !== 'pedidos') {
        throw new Error('A Planilha ainda está sincronizando. Aguarde alguns instantes e tente recarregar.');
      }
      
      setListaPedidos(result.data || []);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setMensagemLista(error.message);
      setListaPedidos([]); 
    } finally {
      setLoadingPedidos(false);
    }
  };

  const handleQuantidadeChange = (id, quantidadeNova) => {
    const material = estoque.find(m => m.id === id);
    let qtd = parseInt(quantidadeNova) || 0;
    if (qtd > material.disponivel) qtd = material.disponivel;
    if (qtd < 0) qtd = 0;
    setPedidos(prev => ({ ...prev, [id]: qtd }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMensagem(null);

    if (!articulador.nome.trim() || !lideranca.nome.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Nomes do Articulador e Liderança são obrigatórios.' });
      setSubmitting(false); return;
    }
    if (!modoRecebimento) {
      setMensagem({ tipo: 'erro', texto: 'Selecione um Modo de Recebimento.' });
      setSubmitting(false); return;
    }
    if (modoRecebimento === 'Despacho' && !enderecoRecebimento.trim()) {
      setMensagem({ tipo: 'erro', texto: 'O endereço de recebimento é obrigatório.' });
      setSubmitting(false); return;
    }
    if (modoRecebimento === 'Retirada no comitê' && !horarioRetirada) {
      setMensagem({ tipo: 'erro', texto: 'Selecione o horário de retirada.' });
      setSubmitting(false); return;
    }

    const materiaisSolicitados = estoque.filter(i => pedidos[i.id] > 0).map(i => ({ nome: i.nome, quantidade: pedidos[i.id] }));
    if (materiaisSolicitados.length === 0) {
      setMensagem({ tipo: 'erro', texto: 'Selecione ao menos um material.' });
      setSubmitting(false); return;
    }

    const payload = {
      action: 'new_order',
      articulador, lideranca, modoRecebimento,
      regiaoDespacho: modoRecebimento === 'Despacho' ? regiaoDespacho : '',
      enderecoRecebimento: modoRecebimento === 'Despacho' ? enderecoRecebimento : 'Retirada no Comitê',
      horarioRetirada: modoRecebimento === 'Retirada no comitê' ? horarioRetirada : '',
      materiais: materiaisSolicitados
    };

    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const response = await fetch(url, { 
        method: 'POST', 
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload) 
      });
      const result = await response.json();
      
      if (result.status === 'error') throw new Error(result.message);
      
      setMensagem({ tipo: 'sucesso', texto: 'Pedido registrado com sucesso na planilha!' });
      setArticulador({ nome: '', email: '', telefone: '' });
      setLideranca({ nome: '', email: '', telefone: '' });
      setPedidos({}); setModoRecebimento(''); setEnderecoRecebimento(''); setHorarioRetirada('');
      
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: `Falha ao enviar: ${error.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const triggerStatusModal = (pedido) => {
    const isEnviado = String(pedido.status || '').toUpperCase() === 'ENVIADO';
    const newStatus = isEnviado ? 'Pendente' : 'ENVIADO';
    setModalStatus({ show: true, step: 1, order: pedido, newStatus });
  };

  const confirmStatusChange = async () => {
    setUpdatingStatus(true);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const payload = { action: 'update_status', row: modalStatus.order.row, status: modalStatus.newStatus };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      
      setListaPedidos(prev => prev.map(p => p.row === modalStatus.order.row ? { ...p, status: modalStatus.newStatus } : p));
      setModalStatus({ show: false, step: 1, order: null, newStatus: '' });
    } catch (error) {
      alert("Erro ao alterar status: " + error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getFilteredAndSortedPedidos = () => {
    let filtered = [...listaPedidos];
    
    if (viewConfig.detailFilter) {
      filtered = filtered.filter(p => p[viewConfig.detailFilter.type] === viewConfig.detailFilter.value);
    }

    return filtered.sort((a, b) => {
      if (viewConfig.sort === 'data_desc') return (b.row || 0) - (a.row || 0);
      if (viewConfig.sort === 'data_asc') return (a.row || 0) - (b.row || 0);
      if (viewConfig.sort === 'art_asc') return String(a.articuladorNome || '').localeCompare(String(b.articuladorNome || ''));
      if (viewConfig.sort === 'art_desc') return String(b.articuladorNome || '').localeCompare(String(a.articuladorNome || ''));
      if (viewConfig.sort === 'lid_asc') return String(a.liderancaNome || '').localeCompare(String(b.liderancaNome || ''));
      if (viewConfig.sort === 'lid_desc') return String(b.liderancaNome || '').localeCompare(String(a.liderancaNome || ''));
      if (viewConfig.sort === 'loc_asc') return String(a.enderecoRecebimento || '').localeCompare(String(b.enderecoRecebimento || ''));
      if (viewConfig.sort === 'loc_desc') return String(b.enderecoRecebimento || '').localeCompare(String(a.enderecoRecebimento || ''));
      return 0;
    });
  };

  const sortedPedidos = getFilteredAndSortedPedidos();
  const CARDS_PER_PAGE = 30;
  const totalPages = Math.ceil(sortedPedidos.length / CARDS_PER_PAGE);
  const displayedPedidos = viewConfig.mode === 'cards' 
    ? sortedPedidos.slice((viewConfig.page - 1) * CARDS_PER_PAGE, viewConfig.page * CARDS_PER_PAGE)
    : sortedPedidos; 

  const EntityLink = ({ type, label }) => (
    <span onClick={() => { setViewConfig({...viewConfig, detailFilter: { type, value: label }, page: 1}); window.scrollTo(0,0); }} 
          className="text-slate-900 font-bold border-b-2 border-transparent hover:border-[#20B2AA] hover:text-[#20B2AA] cursor-pointer transition-colors">
      {label}
    </span>
  );

  const StatusBadge = ({ pedido }) => {
    const isEnviado = String(pedido.status || '').toUpperCase() === 'ENVIADO';
    return (
      <button onClick={() => triggerStatusModal(pedido)}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-transform hover:scale-105 ${isEnviado ? 'bg-[#20B2AA]/20 text-[#008080] border-[#20B2AA]' : 'bg-[#E5B80B]/20 text-[#B8860B] border-[#E5B80B]'}`}>
        {pedido.status || 'Pendente'}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 font-sans text-slate-800">
      
      {/* Navegação de Abas */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase border-b-4 border-slate-900 inline-block pb-1">
            Gestão 2026
          </h1>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-xl shadow-inner border-2 border-slate-300">
          <button onClick={() => setActiveTab('novo_pedido')} className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'novo_pedido' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>Novo Pedido</button>
          <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>Painel de Pedidos</button>
        </div>
      </div>

      {/* TELA DE NOVO PEDIDO */}
      {activeTab === 'novo_pedido' && (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-[#E5B80B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
            <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-800/30 pb-3">
              <IconUser />
              <h2 className="text-2xl font-bold text-slate-900">Articulador</h2>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">Nome Completo <span className="text-[#DC143C]">*</span></label>
              <input type="text" required value={articulador.nome} onChange={e => setArticulador({...articulador, nome: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">E-mail</label>
              <input type="email" value={articulador.email} onChange={e => setArticulador({...articulador, email: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">Telefone / WhatsApp</label>
              <input type="tel" value={articulador.telefone} onChange={e => setArticulador({...articulador, telefone: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
          </div>

          <div className="md:col-span-7 bg-[#20B2AA] text-slate-900 rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
             <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-900/30 pb-3">
              <IconUsers />
              <h2 className="text-2xl font-bold">Liderança de Destino</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">Nome da Liderança <span className="text-[#DC143C]">*</span></label>
                <input type="text" required value={lideranca.nome} onChange={e => setLideranca({...lideranca, nome: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">E-mail</label>
                <input type="email" value={lideranca.email} onChange={e => setLideranca({...lideranca, email: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">Telefone</label>
                <input type="tel" value={lideranca.telefone} onChange={e => setLideranca({...lideranca, telefone: e.target.value})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
            </div>
          </div>

          <div className="md:col-span-12 bg-white rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
             <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-slate-200">
              <IconTruck />
              <h2 className="text-2xl font-bold text-slate-900">Modo de Recebimento <span className="text-[#DC143C] text-sm">*</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${modoRecebimento === 'Despacho' ? 'border-[#20B2AA] bg-[#20B2AA]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setModoRecebimento('Despacho')}>
                <div className="flex items-center mb-3">
                  <input type="radio" checked={modoRecebimento === 'Despacho'} readOnly className="w-5 h-5 mr-3 accent-[#20B2AA]" />
                  <h3 className="font-bold text-lg">Despacho</h3>
                </div>
                {modoRecebimento === 'Despacho' && (
                  <div className="mt-4 space-y-4 pl-8" onClick={e => e.stopPropagation()}>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">Região</label>
                      <select className="w-full p-2 border-2 border-slate-400 rounded-lg" value={regiaoDespacho} onChange={(e) => setRegiaoDespacho(e.target.value)}>
                        <option value="Interior de Santa Catarina">Interior de Santa Catarina</option>
                        <option value="Florianópolis">Florianópolis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">Município / Bairro <span className="text-[#DC143C]">*</span></label>
                      <input type="text" value={enderecoRecebimento} onChange={e => setEnderecoRecebimento(e.target.value)} className="w-full p-2 border-2 border-slate-400 rounded-lg focus:border-[#20B2AA] focus:outline-none" />
                    </div>
                  </div>
                )}
              </div>
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${modoRecebimento === 'Retirada no comitê' ? 'border-[#DC143C] bg-[#DC143C]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setModoRecebimento('Retirada no comitê')}>
                <div className="flex items-center mb-3">
                  <input type="radio" checked={modoRecebimento === 'Retirada no comitê'} readOnly className="w-5 h-5 mr-3 accent-[#DC143C]" />
                  <h3 className="font-bold text-lg">Retirada no comitê</h3>
                </div>
                {modoRecebimento === 'Retirada no comitê' && (
                  <div className="mt-4 pl-8" onClick={e => e.stopPropagation()}>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Horário da retirada <span className="text-[#DC143C]">*</span></label>
                    <div className="space-y-2">
                      {['10h - 12h', '12h - 16h', '16h - 19h'].map(hora => (
                        <label key={hora} className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" value={hora} checked={horarioRetirada === hora} onChange={(e) => setHorarioRetirada(e.target.value)} className="w-4 h-4 accent-[#DC143C]"/>
                          <span>{hora}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-12 bg-white rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(220,20,60,1)] border-4 border-[#DC143C]">
            <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-slate-200">
              <div className="text-[#DC143C]"><IconPackage /></div>
              <h2 className="text-2xl font-bold text-slate-900">Seleção de Materiais <span className="text-[#DC143C] text-sm">*</span></h2>
            </div>
            {loadingEstoque ? (
              <div className="text-center py-10 font-bold text-slate-500 flex flex-col items-center">
                <div className="animate-spin text-[#DC143C] mb-4"><IconPackage /></div>
                Buscando estoque da planilha...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estoque.map((item) => {
                  const porcentagem = item.total > 0 ? ((item.disponivel / item.total) * 100).toFixed(1) : 0;
                  const quantidadeEscolhida = pedidos[item.id] || 0;
                  
                  let colorClass = "bg-[#20B2AA]";
                  if (porcentagem < 30) colorClass = "bg-[#DC143C]";
                  else if (porcentagem < 60) colorClass = "bg-[#E5B80B]";

                  return (
                    <div key={item.id} className="p-4 bg-[#F9F6F0] border-2 border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 transition-colors">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{item.nome}</h3>
                        <div className="mt-3 mb-1 flex justify-between text-xs font-bold text-slate-500">
                          <span>Restam: {item.disponivel} un.</span>
                          <span>{porcentagem}% em estoque</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
                          <div className={`${colorClass} h-2 rounded-full`} style={{ width: `${porcentagem}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Quantidade:</span>
                        <div className="flex items-center space-x-2">
                          <button type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida - 1)} className="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-md font-bold hover:bg-slate-300">-</button>
                          <input type="number" min="0" max={item.disponivel} value={quantidadeEscolhida || ''} onChange={(e) => handleQuantidadeChange(item.id, e.target.value)} className="w-20 text-center py-1 bg-white border-2 border-slate-300 rounded-md font-bold focus:border-[#DC143C] focus:outline-none"/>
                          <button type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida + 1)} disabled={quantidadeEscolhida >= item.disponivel} className="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-md font-bold hover:bg-slate-300 disabled:opacity-50">+</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-2xl p-6 mt-4">
            <div className="flex-1 w-full mb-4 md:mb-0 pr-0 md:pr-4">
              {mensagem && (
                <div className={`p-4 rounded-lg flex items-center font-bold ${mensagem.tipo === 'sucesso' ? 'bg-[#20B2AA]/20 text-[#20B2AA]' : 'bg-[#DC143C]/20 text-[#DC143C]'}`}>
                  <div className="mr-3">{mensagem.tipo === 'sucesso' ? <IconCheck /> : <IconAlert />}</div>
                  <p>{mensagem.texto}</p>
                </div>
              )}
            </div>
            <button type="submit" disabled={submitting} className="w-full md:w-auto flex justify-center items-center space-x-2 bg-[#DC143C] text-white font-black uppercase py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] disabled:opacity-70 border-2 border-white">
              {submitting ? <span>Salvando...</span> : <span>Confirmar Pedido</span>}
            </button>
          </div>
        </form>
      )}

      {/* TELA DE DASHBOARD E FICHA COMPLETA */}
      {activeTab === 'dashboard' && (
        <div className="max-w-6xl mx-auto space-y-6">
          
          {viewConfig.detailFilter && (
            <div className="bg-[#20B2AA] text-white rounded-2xl p-6 mb-6 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800">Ficha Completa • {viewConfig.detailFilter.type === 'articuladorNome' ? 'Articulador' : viewConfig.detailFilter.type === 'liderancaNome' ? 'Liderança' : 'Destino'}</span>
                <h2 className="text-3xl font-black">{viewConfig.detailFilter.value}</h2>
                <p className="mt-2 font-bold text-slate-800 bg-white/30 px-3 py-1 rounded-full inline-block">{sortedPedidos.length} Pedidos Encontrados</p>
              </div>
              <button onClick={() => setViewConfig({...viewConfig, detailFilter: null})} className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition">
                <IconArrowLeft /> <span>Voltar à lista geral</span>
              </button>
            </div>
          )}

          {mensagemLista && (
            <div className="bg-[#DC143C]/10 border-2 border-[#DC143C] p-4 rounded-xl text-[#DC143C] font-bold text-center mb-6">
              <span className="block mb-1">Aviso do Sistema:</span>
              {mensagemLista}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border-2 border-slate-200">
            <div className="flex items-center w-full md:w-auto space-x-2">
              <span className="font-bold text-slate-500 mr-2">Ordenar por:</span>
              <select className="p-2 border-2 border-slate-300 rounded-lg bg-slate-50 font-bold text-slate-800 focus:outline-none focus:border-[#20B2AA]" value={viewConfig.sort} onChange={(e) => setViewConfig({...viewConfig, sort: e.target.value})}>
                <option value="data_desc">Data (Mais recentes)</option>
                <option value="data_asc">Data (Mais antigos)</option>
                <option value="art_asc">Articulador (A-Z)</option>
                <option value="art_desc">Articulador (Z-A)</option>
                <option value="lid_asc">Liderança (A-Z)</option>
                <option value="lid_desc">Liderança (Z-A)</option>
                <option value="loc_asc">Localização (A-Z)</option>
                <option value="loc_desc">Localização (Z-A)</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button onClick={() => setViewConfig({...viewConfig, mode: 'list'})} className={`p-2 rounded-lg border-2 ${viewConfig.mode === 'list' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}><IconList /></button>
              <button onClick={() => setViewConfig({...viewConfig, mode: 'cards', page: 1})} className={`p-2 rounded-lg border-2 ${viewConfig.mode === 'cards' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}><IconGrid /></button>
            </div>
          </div>

          {loadingPedidos && (
            <div className="text-center py-10 font-bold text-slate-500 flex flex-col items-center">
              <div className="animate-spin text-[#20B2AA] mb-4"><IconPackage /></div>
              Buscando Pedidos da Planilha...
            </div>
          )}

          {}
          {!loadingPedidos && viewConfig.mode === 'cards' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPedidos.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-slate-500 font-bold text-lg bg-white rounded-2xl border-2 border-slate-200 border-dashed">
                    Nenhum pedido encontrado para esta visualização.
                  </div>
                ) : (
                  displayedPedidos.map(pedido => (
                    <div key={pedido.row} className="bg-white rounded-2xl border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] flex flex-col h-full hover:shadow-[6px_6px_0px_0px_rgba(229,184,11,1)] transition-all">
                      <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-3">
                        <StatusBadge pedido={pedido} />
                      </div>
                      
                      <div className="flex-1 space-y-3 text-sm">
                        <div><span className="text-slate-500 text-xs font-bold uppercase">Liderança</span><br/><EntityLink type="liderancaNome" label={pedido.liderancaNome || 'Não Informado'} /></div>
                        <div><span className="text-slate-500 text-xs font-bold uppercase">Articulador</span><br/><EntityLink type="articuladorNome" label={pedido.articuladorNome || 'Não Informado'} /></div>
                        <div><span className="text-slate-500 text-xs font-bold uppercase">Destino</span><br/><EntityLink type="enderecoRecebimento" label={pedido.enderecoRecebimento || pedido.modoRecebimento || 'Não Informado'} /></div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4">
                          <span className="text-slate-500 text-xs font-bold uppercase mb-2 block">Resumo do Material</span>
                          <div className="flex justify-between text-slate-700 text-xs">
                            <p className="whitespace-pre-line leading-tight pr-2">{pedido.materiais}</p>
                            <p className="whitespace-pre-line leading-tight font-black text-right">{pedido.quantidades}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 pt-6">
                  {Array.from({length: totalPages}, (_, i) => (
                    <button key={i+1} onClick={() => setViewConfig({...viewConfig, page: i+1})} className={`w-10 h-10 rounded-full font-bold border-2 ${viewConfig.page === i+1 ? 'bg-[#DC143C] text-white border-[#DC143C]' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {!loadingPedidos && viewConfig.mode === 'list' && (
             <div className="overflow-x-auto bg-white rounded-2xl border-2 border-slate-800 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)]">
               <table className="w-full text-left text-sm border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-slate-100 border-b-2 border-slate-800 text-slate-600 uppercase text-xs">
                     <th className="p-4 font-black">Data</th>
                     <th className="p-4 font-black">Liderança</th>
                     <th className="p-4 font-black">Articulador</th>
                     <th className="p-4 font-black">Local</th>
                     <th className="p-4 font-black">Materiais</th>
                     <th className="p-4 font-black text-center">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {displayedPedidos.map(pedido => (
                     <tr key={pedido.row} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                       <td className="p-4 font-bold text-slate-700">{String(pedido.data || '').split(' ')[0] || '-'}</td>
                       <td className="p-4"><EntityLink type="liderancaNome" label={pedido.liderancaNome || 'Não Informado'} /></td>
                       <td className="p-4"><EntityLink type="articuladorNome" label={pedido.articuladorNome || 'Não Informado'} /></td>
                       <td className="p-4"><EntityLink type="enderecoRecebimento" label={pedido.enderecoRecebimento || pedido.modoRecebimento || 'Não Informado'} /></td>
                       <td className="p-4 text-xs text-slate-600 truncate max-w-[200px]">
                         {String(pedido.materiais || '').split('\n').join(' | ')}
                       </td>
                       <td className="p-4 text-center"><StatusBadge pedido={pedido} /></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               {displayedPedidos.length === 0 && <div className="p-8 text-center text-slate-500 font-bold">Nenhum pedido encontrado.</div>}
             </div>
          )}

        </div>
      )}

      {}
      {modalStatus.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_0px_rgba(32,178,170,1)] animate-in fade-in zoom-in-95 duration-200">
            
            {modalStatus.step === 1 ? (
              <>
                <div className="w-16 h-16 bg-[#E5B80B]/20 text-[#E5B80B] rounded-full flex items-center justify-center mb-6 mx-auto"><IconAlert /></div>
                <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Confirmar Ação</h3>
                <p className="text-center text-slate-600 font-medium mb-8">
                  Você está prestes a alterar o status deste pedido para <strong className="text-slate-900">{modalStatus.newStatus}</strong>. Deseja continuar?
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setModalStatus({show: false})} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50">Cancelar</button>
                  <button onClick={() => setModalStatus({...modalStatus, step: 2})} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] hover:bg-slate-800">Sim, continuar</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Resumo da Alteração</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 mb-6 space-y-3 text-sm">
                  <p><span className="font-bold text-slate-500">Liderança:</span><br/><span className="text-lg font-bold text-slate-800">{modalStatus.order.liderancaNome}</span></p>
                  <p><span className="font-bold text-slate-500">Status Original:</span><br/><span className="text-slate-600 line-through">{modalStatus.order.status}</span></p>
                  <p><span className="font-bold text-slate-500">Novo Status:</span><br/><span className={`text-lg font-black ${modalStatus.newStatus === 'ENVIADO' ? 'text-[#20B2AA]' : 'text-[#E5B80B]'}`}>{modalStatus.newStatus}</span></p>
                </div>
                <p className="mb-6 text-center text-slate-700 font-bold">Deseja salvar esta modificação definitivamente na planilha?</p>
                
                <div className="flex gap-4">
                  <button onClick={() => setModalStatus({show: false})} disabled={updatingStatus} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50">Cancelar</button>
                  <button onClick={confirmStatusChange} disabled={updatingStatus} className="flex-1 flex justify-center items-center py-3 bg-[#20B2AA] text-white font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] hover:bg-[#1c9c95] border-2 border-[#20B2AA] disabled:opacity-70">
                    {updatingStatus ? "Salvando..." : "Confirmar e Salvar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
