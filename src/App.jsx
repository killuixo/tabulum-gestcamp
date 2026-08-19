import React, { useState, useEffect } from 'react';

const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconPackage = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>;
const IconAlert = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconCheck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconTruck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const IconList = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const IconGrid = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const IconMessage = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const IconTrendingUp = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconPlus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const initialFormState = {
  row: null,
  articulador: { nome: '', email: '', telefone: '' },
  lideranca: { nome: '', email: '', telefone: '' },
  modoRecebimento: '',
  regiaoDespacho: 'Interior de Santa Catarina',
  enderecoRecebimento: '',
  horarioRetirada: '',
  dataAgendada: '',
  status: 'A ENVIAR',
  observacoes: ''
};

export default function App() {
  const [activeTab, setActiveTab] = useState('novo_pedido'); 
  const [viewConfig, setViewConfig] = useState({ mode: 'list', sort: 'data_desc', page: 1, detailFilter: null });
  const [estoqueViewConfig, setEstoqueViewConfig] = useState({ mode: 'list' });
  
  const [formData, setFormData] = useState(initialFormState);
  const [pedidos, setPedidos] = useState({});
  const [enviados, setEnviados] = useState({});
  
  const [estoque, setEstoque] = useState([]);
  const [levasHeaders, setLevasHeaders] = useState([]);
  const [listaPedidos, setListaPedidos] = useState([]);
  
  const [loadingEstoque, setLoadingEstoque] = useState(false);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [mensagem, setMensagem] = useState(null); 
  const [mensagemLista, setMensagemLista] = useState(null);
  
  const [filters, setFilters] = useState({ articulador: [], lideranca: [], local: [] });
  const [modalStatus, setModalStatus] = useState({ show: false, step: 1, order: null, newStatus: '' });
  const [modalEditConfirm, setModalEditConfirm] = useState({ show: false, step: 1, changesSummary: [] });
  const [modalLeva, setModalLeva] = useState({ show: false, step: 1, nome: '', itens: {} });
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (activeTab === 'novo_pedido' && estoque.length === 0) fetchStockData();
    if (activeTab === 'dashboard') fetchPedidosData();
    if (activeTab === 'editar_pedido' && estoque.length === 0) fetchStockData();
    if (activeTab === 'estoque') { fetchStockData(); fetchPedidosData(); }
  }, [activeTab]);

  const fetchStockData = async () => {
    setLoadingEstoque(true);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const response = await fetch(url);
      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      setEstoque(result.data || []);
      setLevasHeaders(result.levasHeaders || []);
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
      const separator = url.includes('?') ? '&' : '?';
      const response = await fetch(`${url}${separator}action=pedidos`);
      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      if (result.type !== 'pedidos') throw new Error('A Planilha ainda está sincronizando. Aguarde alguns instantes e tente recarregar.');
      setListaPedidos(result.data || []);
    } catch (error) {
      setMensagemLista(error.message);
    } finally {
      setLoadingPedidos(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setPedidos({});
    setEnviados({});
    setMensagem(null);
  };

  const handleQuantidadeChange = (id, quantidadeNova) => {
    let qtd = parseInt(quantidadeNova) || 0;
    if (qtd < 0) qtd = 0;
    setPedidos(prev => ({ ...prev, [id]: qtd }));
  };

  const handleEnviadoChange = (id, quantidadeNova) => {
    let qtd = parseInt(quantidadeNova) || 0;
    if (qtd < 0) qtd = 0;
    setEnviados(prev => ({ ...prev, [id]: qtd }));
  };

  const processSubmit = async (isEditMode = false) => {
    setSubmitting(true);
    setMensagem(null);

    const materiaisSolicitados = estoque.filter(i => pedidos[i.id] > 0).map(i => ({ 
      nome: i.nome, 
      quantidade: pedidos[i.id],
      enviado: enviados[i.id] || 0
    }));

    const payload = {
      action: isEditMode ? 'edit_order' : 'new_order',
      row: formData.row,
      articulador: formData.articulador, 
      lideranca: formData.lideranca, 
      modoRecebimento: formData.modoRecebimento,
      regiaoDespacho: formData.modoRecebimento === 'Despacho' ? formData.regiaoDespacho : '',
      enderecoRecebimento: formData.enderecoRecebimento, 
      horarioRetirada: formData.modoRecebimento === 'Retirada no comitê' ? formData.horarioRetirada : '',
      dataAgendada: formData.dataAgendada,
      status: formData.status,
      observacoes: formData.observacoes,
      materiais: materiaisSolicitados
    };

    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      
      if (isEditMode) {
        setModalEditConfirm({ show: false, step: 1, changesSummary: [] });
        setActiveTab('dashboard'); 
        fetchPedidosData(); 
      } else {
        setMensagem({ tipo: 'sucesso', texto: 'Pedido registrado com sucesso na planilha!' });
        resetForm();
      }
    } catch (error) {
      if (isEditMode) alert(`Falha ao salvar edição: ${error.message}`);
      else setMensagem({ tipo: 'erro', texto: `Falha ao enviar: ${error.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!formData.articulador.nome.trim() || !formData.lideranca.nome.trim()) return setMensagem({ tipo: 'erro', texto: 'Nomes do Articulador e Liderança são obrigatórios.' });
    if (!formData.modoRecebimento) return setMensagem({ tipo: 'erro', texto: 'Selecione um Modo de Recebimento.' });
    
    if (formData.modoRecebimento === 'Despacho') {
      if (!formData.dataAgendada) return setMensagem({ tipo: 'erro', texto: 'O prazo de entrega é obrigatório.' });
      if (!formData.enderecoRecebimento.trim()) return setMensagem({ tipo: 'erro', texto: 'O endereço é obrigatório.' });
    }
    
    if (formData.modoRecebimento === 'Retirada no comitê') {
      if (!formData.dataAgendada) return setMensagem({ tipo: 'erro', texto: 'A data da retirada é obrigatória.' });
      if (!formData.horarioRetirada) return setMensagem({ tipo: 'erro', texto: 'Selecione o horário.' });
    }

    if (estoque.filter(i => pedidos[i.id] > 0).length === 0) return setMensagem({ tipo: 'erro', texto: 'Selecione ao menos um material.' });

    if (activeTab === 'editar_pedido') {
      const summary = [
        { label: 'Articulador', val: formData.articulador.nome },
        { label: 'Liderança', val: formData.lideranca.nome },
        { label: 'Modo', val: formData.modoRecebimento },
        { label: 'Destino', val: formData.enderecoRecebimento || 'Não Informado' },
        { label: 'Status', val: formData.status }
      ];
      setModalEditConfirm({ show: true, step: 1, changesSummary: summary });
    } else {
      processSubmit(false);
    }
  };

  const handleOpenEdit = (pedido) => {
    setFormData({
      row: pedido.row,
      articulador: { nome: pedido.articuladorNome, email: pedido.articuladorEmail, telefone: pedido.articuladorTelefone },
      lideranca: { nome: pedido.liderancaNome, email: pedido.liderancaEmail, telefone: pedido.liderancaTelefone },
      modoRecebimento: pedido.modoRecebimento,
      regiaoDespacho: 'Interior de Santa Catarina', 
      enderecoRecebimento: pedido.enderecoRecebimento,
      horarioRetirada: pedido.horarioRetirada,
      dataAgendada: pedido.dataAgendada,
      status: pedido.status,
      observacoes: pedido.observacoes
    });

    const parsedPedidos = {};
    const parsedEnviados = {};
    const mats = (pedido.materiais || '').split('\n');
    const qts = (pedido.quantidades || '').split('\n');
    const envs = (pedido.quantidadesEnviadas || '').split('\n');
    
    if (estoque.length > 0) {
      mats.forEach((m, idx) => {
        const item = estoque.find(e => e.nome.trim() === m.trim());
        if (item) {
          parsedPedidos[item.id] = parseInt(qts[idx], 10) || 0;
          parsedEnviados[item.id] = parseInt(envs[idx], 10) || 0;
        }
      });
      setPedidos(parsedPedidos);
      setEnviados(parsedEnviados);
    }
    setActiveTab('editar_pedido');
    window.scrollTo(0,0);
  };

  const handleCreateLeva = async () => {
    setUpdatingStatus(true);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const payload = { action: 'nova_leva', nomeLeva: modalLeva.nome, quantidadesLeva: modalLeva.itens };
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      
      setModalLeva({ show: false, step: 1, nome: '', itens: {} });
      fetchStockData();
    } catch (error) {
      alert("Erro ao criar leva: " + error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const confirmStatusChange = async () => {
    setUpdatingStatus(true);
    try {
      const url = import.meta.env.VITE_SHEETS_API_URL;
      const payload = { action: 'update_status', row: modalStatus.order.row, status: modalStatus.newStatus };
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
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

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) return { ...prev, [category]: current.filter(v => v !== value) };
      return { ...prev, [category]: [...current, value] };
    });
    setViewConfig(prev => ({...prev, page: 1}));
  };

  const handleSortToggle = (field) => {
    if (viewConfig.sort.startsWith(field)) {
      const newDir = viewConfig.sort.endsWith('asc') ? 'desc' : 'asc';
      setViewConfig({...viewConfig, sort: `${field}_${newDir}`});
    } else {
      setViewConfig({...viewConfig, sort: `${field}_asc`});
    }
  };

  const parseDateString = (dStr) => {
    if (!dStr) return 0;
    if (dStr.includes('-')) return new Date(dStr).getTime();
    const parts = dStr.split(/[ /:]/);
    if (parts.length >= 3) return new Date(parts[2], parts[1]-1, parts[0]).getTime();
    return 0;
  };
  
  const formatarDataBR = (dataString) => {
    if (!dataString) return '';
    if (dataString.includes('-')) {
      const [y, m, d] = dataString.split('-');
      return `${d}/${m}/${y}`;
    }
    return dataString;
  };

  const getFilteredAndSortedPedidos = () => {
    let filtered = [...listaPedidos];
    
    if (viewConfig.detailFilter) {
      filtered = filtered.filter(p => (p[viewConfig.detailFilter.type] || '').trim() === viewConfig.detailFilter.value);
    }
    if (filters.articulador.length > 0) filtered = filtered.filter(p => filters.articulador.includes((p.articuladorNome || '').trim()));
    if (filters.lideranca.length > 0) filtered = filtered.filter(p => filters.lideranca.includes((p.liderancaNome || '').trim()));
    if (filters.local.length > 0) filtered = filtered.filter(p => filters.local.includes((p.enderecoRecebimento || '').trim()));

    return filtered.sort((a, b) => {
      const isAsc = viewConfig.sort.endsWith('asc') ? 1 : -1;
      const field = viewConfig.sort.split('_')[0];
      if (field === 'data') return (parseDateString(a.data) - parseDateString(b.data)) * isAsc;
      if (field === 'agendamento') return (parseDateString(a.dataAgendada) - parseDateString(b.dataAgendada)) * isAsc;
      if (field === 'articulador') return String(a.articuladorNome).localeCompare(String(b.articuladorNome)) * isAsc;
      if (field === 'lideranca') return String(a.liderancaNome).localeCompare(String(b.liderancaNome)) * isAsc;
      if (field === 'local') return String(a.enderecoRecebimento).localeCompare(String(b.enderecoRecebimento)) * isAsc;
      if (field === 'status') return String(a.status).localeCompare(String(b.status)) * isAsc;
      return 0;
    });
  };

  const sortedPedidos = getFilteredAndSortedPedidos();
  const CARDS_PER_PAGE = 30;
  const totalPages = Math.ceil(sortedPedidos.length / CARDS_PER_PAGE);
  const displayedPedidos = viewConfig.mode === 'cards' 
    ? sortedPedidos.slice((viewConfig.page - 1) * CARDS_PER_PAGE, viewConfig.page * CARDS_PER_PAGE)
    : sortedPedidos; 

  const uniqueArticuladores = [...new Set(listaPedidos.map(p => (p.articuladorNome || '').trim()).filter(Boolean))].sort();
  const uniqueLiderancas = [...new Set(listaPedidos.map(p => (p.liderancaNome || '').trim()).filter(Boolean))].sort();
  const uniqueLocais = [...new Set(listaPedidos.map(p => (p.enderecoRecebimento || '').trim()).filter(Boolean))].sort();

  const aggregatedRequests = {};
  let globalTotalAdquirido = 0;
  let globalTotalDisponivel = 0;
  let globalTotalSolicitado = 0;

  estoque.forEach(item => {
    globalTotalAdquirido += item.totalAdquirido;
    globalTotalDisponivel += item.disponivel;
  });

  listaPedidos.forEach(pedido => {
    const mats = (pedido.materiais || '').split('\n');
    const qts = (pedido.quantidades || '').split('\n');
    mats.forEach((m, idx) => {
      const n = m.trim();
      if (n) {
        aggregatedRequests[n] = (aggregatedRequests[n] || 0) + (parseInt(qts[idx], 10) || 0);
        globalTotalSolicitado += (parseInt(qts[idx], 10) || 0);
      }
    });
  });

  const percentualGlobalEstoque = globalTotalAdquirido > 0 ? (globalTotalSolicitado / globalTotalAdquirido) * 100 : 0;
  
  const totalSolicitadoEdit = estoque.reduce((acc, item) => acc + (pedidos[item.id] || 0), 0);
  const totalEnviadoEdit = estoque.reduce((acc, item) => acc + (enviados[item.id] || 0), 0);
  const percentualEnviadoEdit = totalSolicitadoEdit > 0 ? Math.round((totalEnviadoEdit / totalSolicitadoEdit) * 100) : 0;

  const EntityLink = ({ type, label }) => {
    const trimmedLabel = (label || '').trim();
    if (!trimmedLabel || trimmedLabel === 'Não Informado') return <span>{label || 'Não Informado'}</span>;
    return (
      <span onClick={(e) => { e.stopPropagation(); setViewConfig({...viewConfig, detailFilter: { type, value: trimmedLabel }, page: 1}); window.scrollTo(0,0); }} 
            className="text-slate-900 font-bold border-b-2 border-transparent hover:border-[#20B2AA] hover:text-[#20B2AA] cursor-pointer transition-colors relative z-10">
        {trimmedLabel}
      </span>
    );
  };

  const StatusBadge = ({ pedido }) => {
    const isEnviado = String(pedido.status || '').toUpperCase() === 'ENVIADO';
    return (
      <button onClick={(e) => { e.stopPropagation(); setModalStatus({ show: true, step: 1, order: pedido, newStatus: isEnviado ? 'A ENVIAR' : 'ENVIADO' }); }}
              className={`relative z-10 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-transform hover:scale-105 ${isEnviado ? 'bg-[#20B2AA]/20 text-[#008080] border-[#20B2AA]' : 'bg-[#E5B80B]/20 text-[#B8860B] border-[#E5B80B]'}`}>
        {pedido.status || 'A ENVIAR'}
      </button>
    );
  };

  const SortHeader = ({ label, field }) => {
    const isSorted = viewConfig.sort.startsWith(field);
    const isAsc = viewConfig.sort.endsWith('asc');
    return (
      <th onClick={() => handleSortToggle(field)} className="p-4 font-black cursor-pointer hover:bg-slate-200 transition-colors select-none">
        <div className="flex items-center space-x-1">
          <span>{label}</span>
          {isSorted && <span className="text-[#20B2AA]">{isAsc ? '▲' : '▼'}</span>}
        </div>
      </th>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 font-sans text-slate-800 pb-20">
      
      {/* Datalists para Autocomplete */}
      <datalist id="list-articuladores">{uniqueArticuladores.map((a, i) => <option key={i} value={a} />)}</datalist>
      <datalist id="list-liderancas">{uniqueLiderancas.map((a, i) => <option key={i} value={a} />)}</datalist>
      <datalist id="list-locais">{uniqueLocais.map((a, i) => <option key={i} value={a} />)}</datalist>

      {/* Navegação de Abas e Cabeçalho */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 md:gap-5 mb-4 lg:mb-0">
          <img 
            src="https://raw.githubusercontent.com/killuixo/tabulum-gestcamp/refs/heads/main/icon-192.png" 
            alt="Tabulum Logo" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-xl shadow-sm border-2 border-slate-900"
          />
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase border-b-4 border-slate-900 inline-block pb-1 leading-tight">
            TABULUM <span className="hidden md:inline"> - </span> <span className="block md:inline text-lg md:text-2xl text-slate-600 font-bold border-none">Gestão de Material de Campanha</span>
          </h1>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-xl shadow-inner border-2 border-slate-300 flex-wrap justify-center gap-1">
          <button onClick={() => {resetForm(); setActiveTab('novo_pedido');}} className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'novo_pedido' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>Novo Pedido</button>
          <button onClick={() => {setActiveTab('dashboard');}} className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>Painel de Pedidos</button>
          <button onClick={() => {setActiveTab('estoque');}} className={`px-4 md:px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'estoque' ? 'bg-white text-slate-900 shadow-sm border border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>Estoque</button>
        </div>
      </div>

      {}
      {(activeTab === 'novo_pedido' || activeTab === 'editar_pedido') && (
        <form onSubmit={handleSubmitRequest} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-300">
          
          {activeTab === 'editar_pedido' && (
             <div className="md:col-span-12 bg-slate-900 text-white rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(229,184,11,1)] flex items-center justify-between">
               <div>
                 <span className="text-[#E5B80B] font-bold uppercase tracking-widest text-sm">Modo de Edição</span>
                 <h2 className="text-3xl font-black">Ficha do Pedido (L-{formData.row})</h2>
               </div>
               <button type="button" onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition">Voltar ao Painel</button>
             </div>
          )}

          {/* Seção Articulador */}
          <div className="md:col-span-5 bg-[#E5B80B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
            <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-800/30 pb-3">
              <IconUser />
              <h2 className="text-2xl font-bold text-slate-900">Articulador</h2>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">Nome Completo <span className="text-[#DC143C]">*</span></label>
              <input type="text" list="list-articuladores" required value={formData.articulador.nome} onChange={e => setFormData({...formData, articulador: {...formData.articulador, nome: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">E-mail</label>
              <input type="email" value={formData.articulador.email} onChange={e => setFormData({...formData, articulador: {...formData.articulador, email: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-800 mb-1">Telefone / WhatsApp</label>
              <input type="tel" value={formData.articulador.telefone} onChange={e => setFormData({...formData, articulador: {...formData.articulador, telefone: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
            </div>
          </div>

          {/* Seção Liderança */}
          <div className="md:col-span-7 bg-[#20B2AA] text-slate-900 rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
             <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-900/30 pb-3">
              <IconUsers />
              <h2 className="text-2xl font-bold">Liderança de Destino</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">Nome da Liderança <span className="text-[#DC143C]">*</span></label>
                <input type="text" list="list-liderancas" required value={formData.lideranca.nome} onChange={e => setFormData({...formData, lideranca: {...formData.lideranca, nome: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">E-mail</label>
                <input type="email" value={formData.lideranca.email} onChange={e => setFormData({...formData, lideranca: {...formData.lideranca, email: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-800 mb-1">Telefone</label>
                <input type="tel" value={formData.lideranca.telefone} onChange={e => setFormData({...formData, lideranca: {...formData.lideranca, telefone: e.target.value}})} className="w-full px-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900" />
              </div>
            </div>
          </div>

          {/* Modo de Recebimento */}
          <div className="md:col-span-12 bg-white rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
             <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-slate-200">
              <IconTruck />
              <h2 className="text-2xl font-bold text-slate-900">Modo de Recebimento <span className="text-[#DC143C] text-sm">*</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.modoRecebimento === 'Despacho' ? 'border-[#20B2AA] bg-[#20B2AA]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setFormData({...formData, modoRecebimento: 'Despacho'})}>
                <div className="flex items-center mb-3">
                  <input type="radio" checked={formData.modoRecebimento === 'Despacho'} readOnly className="w-5 h-5 mr-3 accent-[#20B2AA]" />
                  <h3 className="font-bold text-lg">Despacho</h3>
                </div>
                {formData.modoRecebimento === 'Despacho' && (
                  <div className="mt-4 space-y-4 pl-8" onClick={e => e.stopPropagation()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Região</label>
                        <select className="w-full p-2 border-2 border-slate-400 rounded-lg" value={formData.regiaoDespacho} onChange={(e) => setFormData({...formData, regiaoDespacho: e.target.value})}>
                          <option value="Interior de Santa Catarina">Interior de Santa Catarina</option>
                          <option value="Florianópolis">Florianópolis</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Prazo de Entrega <span className="text-[#DC143C]">*</span></label>
                        <input type="date" required value={formData.dataAgendada} onChange={e => setFormData({...formData, dataAgendada: e.target.value})} className="w-full p-2 border-2 border-slate-400 rounded-lg focus:border-[#20B2AA] focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">Município / Bairro <span className="text-[#DC143C]">*</span></label>
                      <input type="text" list="list-locais" value={formData.enderecoRecebimento} onChange={e => setFormData({...formData, enderecoRecebimento: e.target.value})} className="w-full p-2 border-2 border-slate-400 rounded-lg focus:border-[#20B2AA] focus:outline-none" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.modoRecebimento === 'Retirada no comitê' ? 'border-[#DC143C] bg-[#DC143C]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setFormData({...formData, modoRecebimento: 'Retirada no comitê'})}>
                <div className="flex items-center mb-3">
                  <input type="radio" checked={formData.modoRecebimento === 'Retirada no comitê'} readOnly className="w-5 h-5 mr-3 accent-[#DC143C]" />
                  <h3 className="font-bold text-lg">Retirada no comitê</h3>
                </div>
                {formData.modoRecebimento === 'Retirada no comitê' && (
                  <div className="mt-4 pl-8 space-y-4" onClick={e => e.stopPropagation()}>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Data da Retirada <span className="text-[#DC143C]">*</span></label>
                      <input type="date" required value={formData.dataAgendada} onChange={e => setFormData({...formData, dataAgendada: e.target.value})} className="w-full max-w-[200px] p-2 border-2 border-slate-400 rounded-lg focus:border-[#DC143C] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Horário da retirada <span className="text-[#DC143C]">*</span></label>
                      <div className="space-y-2">
                        {['10h - 12h', '12h - 16h', '16h - 19h'].map(hora => (
                          <label key={hora} className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" value={hora} checked={formData.horarioRetirada === hora} onChange={(e) => setFormData({...formData, horarioRetirada: e.target.value})} className="w-4 h-4 accent-[#DC143C]"/>
                            <span>{hora}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">Município / Bairro de Destino (Opcional)</label>
                      <input type="text" list="list-locais" value={formData.enderecoRecebimento} onChange={e => setFormData({...formData, enderecoRecebimento: e.target.value})} className="w-full p-2 border-2 border-slate-400 rounded-lg focus:border-[#DC143C] focus:outline-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seleção de Materiais */}
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
                  const quantidadeEscolhida = pedidos[item.id] || 0;
                  const quantidadeEnviada = enviados[item.id] || 0;

                  const infoEstoque = `Total Adquirido: ${item.totalAdquirido}`;

                  return (
                    <div key={item.id} className="p-4 bg-[#F9F6F0] border-2 border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 transition-colors">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{item.nome}</h3>
                        <div className="mt-3 mb-3 flex justify-between text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded">
                          <span>{infoEstoque} un.</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Solicitado:</span>
                        <div className="flex items-center space-x-2">
                          <button type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida - 1)} className="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-md font-bold hover:bg-slate-300">-</button>
                          <input type="number" min="0" value={quantidadeEscolhida || ''} onChange={(e) => handleQuantidadeChange(item.id, e.target.value)} className="w-20 text-center py-1 bg-white border-2 border-slate-300 rounded-md font-bold focus:border-[#DC143C] focus:outline-none"/>
                          <button type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida + 1)} className="w-8 h-8 flex justify-center items-center bg-slate-200 rounded-md font-bold hover:bg-slate-300">+</button>
                        </div>
                      </div>

                      {activeTab === 'editar_pedido' && quantidadeEscolhida > 0 && (
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                          <span className="text-sm font-bold text-[#20B2AA] uppercase tracking-wider">Enviado:</span>
                          <div className="flex items-center space-x-2">
                            <button type="button" onClick={() => handleEnviadoChange(item.id, quantidadeEnviada - 1)} className="w-8 h-8 flex justify-center items-center bg-[#20B2AA]/20 text-[#20B2AA] rounded-md font-bold hover:bg-[#20B2AA]/30">-</button>
                            <input type="number" min="0" value={quantidadeEnviada || ''} onChange={(e) => handleEnviadoChange(item.id, e.target.value)} className="w-20 text-center py-1 bg-[#20B2AA]/10 border-2 border-[#20B2AA] text-[#008080] rounded-md font-bold focus:outline-none"/>
                            <button type="button" onClick={() => handleEnviadoChange(item.id, quantidadeEnviada + 1)} className="w-8 h-8 flex justify-center items-center bg-[#20B2AA]/20 text-[#20B2AA] rounded-md font-bold hover:bg-[#20B2AA]/30">+</button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Campo de Observações Gerais e Status Manual (Apenas Visível na Edição) */}
          <div className="md:col-span-12 bg-[#F0F4F8] rounded-2xl p-6 border-2 border-slate-300 shadow-sm">
             <div className="flex items-center space-x-3 mb-4">
              <div className="text-slate-600"><IconMessage /></div>
              <h2 className="text-xl font-bold text-slate-900">Observações e Status</h2>
            </div>
            
            {activeTab === 'editar_pedido' && (
              <div className="mb-6 pb-6 border-b border-slate-300">
                <label className="block text-sm font-bold text-slate-800 mb-2">Status do Pedido</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer p-2 border-2 rounded-lg bg-white border-slate-200 hover:border-[#E5B80B]">
                    <input type="radio" value="A ENVIAR" checked={formData.status === 'A ENVIAR'} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-5 h-5 accent-[#E5B80B]"/>
                    <span className="font-bold text-[#B8860B]">A ENVIAR</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer p-2 border-2 rounded-lg bg-white border-slate-200 hover:border-[#20B2AA]">
                    <input type="radio" value="ENVIADO" checked={formData.status === 'ENVIADO'} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-5 h-5 accent-[#20B2AA]"/>
                    <span className="font-bold text-[#008080]">ENVIADO</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Anotações Gerais (Opcional)</label>
              <textarea 
                value={formData.observacoes} 
                onChange={e => setFormData({...formData, observacoes: e.target.value})} 
                className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl focus:border-slate-900 focus:outline-none min-h-[100px]"
                placeholder="Insira detalhes de entrega, referências, ou alertas sobre o pedido..."
              ></textarea>
            </div>
          </div>

          {/* Resumo do Pedido (Visível Apenas em Edição) */}
          {activeTab === 'editar_pedido' && (
            <div className="md:col-span-12 bg-slate-100 rounded-xl p-6 border-2 border-slate-300">
              <h3 className="font-bold text-lg mb-4 text-slate-700">Resumo de Atendimento do Pedido</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Solicitado</p>
                  <p className="text-2xl font-black text-slate-800">{totalSolicitadoEdit}</p>
                </div>
                <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center border-b-4 border-b-[#20B2AA]">
                  <p className="text-xs font-bold text-[#20B2AA] uppercase tracking-widest mb-1">Enviado</p>
                  <p className="text-2xl font-black text-[#20B2AA]">{totalEnviadoEdit}</p>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                    <span>Progresso de Envio</span>
                    <span>{percentualEnviadoEdit}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-[#20B2AA] h-3 rounded-full transition-all" style={{ width: `${Math.min(percentualEnviadoEdit, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-2xl p-6 mt-4 mb-20">
            <div className="flex-1 w-full mb-4 md:mb-0 pr-0 md:pr-4">
              {mensagem && (
                <div className={`p-4 rounded-lg flex items-center font-bold ${mensagem.tipo === 'sucesso' ? 'bg-[#20B2AA]/20 text-[#20B2AA]' : 'bg-[#DC143C]/20 text-[#DC143C]'}`}>
                  <div className="mr-3">{mensagem.tipo === 'sucesso' ? <IconCheck /> : <IconAlert />}</div>
                  <p>{mensagem.texto}</p>
                </div>
              )}
            </div>
            <button type="submit" disabled={submitting} className={`w-full md:w-auto flex justify-center items-center space-x-2 text-white font-black uppercase py-4 px-10 rounded-xl transition-all hover:scale-105 border-2 border-white disabled:opacity-70 ${activeTab === 'editar_pedido' ? 'bg-[#20B2AA] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]' : 'bg-[#DC143C] shadow-[4px_4px_0px_0px_rgba(229,184,11,1)]'}`}>
              {submitting ? <span>Salvando...</span> : <span>{activeTab === 'editar_pedido' ? 'Salvar Alterações' : 'Confirmar Pedido'}</span>}
            </button>
          </div>
        </form>
      )}

      {}
      {activeTab === 'dashboard' && (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
          
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

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-800 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3 flex justify-between">
                  Articuladores <span className="bg-slate-200 text-slate-600 px-2 rounded-full">{uniqueArticuladores.length}</span>
                </h3>
                <div className="max-h-32 overflow-y-auto space-y-2 custom-scrollbar">
                  {uniqueArticuladores.map(nome => (
                    <label key={nome} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" checked={filters.articulador.includes(nome)} onChange={() => toggleFilter('articulador', nome)} className="w-4 h-4 rounded text-[#20B2AA] focus:ring-[#20B2AA]" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate" title={nome}>{nome}</span>
                    </label>
                  ))}
                  {uniqueArticuladores.length === 0 && <span className="text-xs text-slate-400 italic">Vazio</span>}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3 flex justify-between">
                  Lideranças <span className="bg-slate-200 text-slate-600 px-2 rounded-full">{uniqueLiderancas.length}</span>
                </h3>
                <div className="max-h-32 overflow-y-auto space-y-2 custom-scrollbar">
                  {uniqueLiderancas.map(nome => (
                    <label key={nome} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" checked={filters.lideranca.includes(nome)} onChange={() => toggleFilter('lideranca', nome)} className="w-4 h-4 rounded text-[#E5B80B] focus:ring-[#E5B80B]" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate" title={nome}>{nome}</span>
                    </label>
                  ))}
                  {uniqueLiderancas.length === 0 && <span className="text-xs text-slate-400 italic">Vazio</span>}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3 flex justify-between">
                  Destinos <span className="bg-slate-200 text-slate-600 px-2 rounded-full">{uniqueLocais.length}</span>
                </h3>
                <div className="max-h-32 overflow-y-auto space-y-2 custom-scrollbar">
                  {uniqueLocais.map(nome => (
                    <label key={nome} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" checked={filters.local.includes(nome)} onChange={() => toggleFilter('local', nome)} className="w-4 h-4 rounded text-[#DC143C] focus:ring-[#DC143C]" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate" title={nome}>{nome}</span>
                    </label>
                  ))}
                  {uniqueLocais.length === 0 && <span className="text-xs text-slate-400 italic">Vazio</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t-2 border-slate-100 gap-4">
              <div className="font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-lg">
                Exibindo: <span className="text-slate-900">{sortedPedidos.length}</span> resultados
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setViewConfig({...viewConfig, mode: 'list'})} className={`p-2 rounded-lg border-2 ${viewConfig.mode === 'list' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}><IconList /></button>
                <button onClick={() => setViewConfig({...viewConfig, mode: 'cards', page: 1})} className={`p-2 rounded-lg border-2 ${viewConfig.mode === 'cards' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}><IconGrid /></button>
              </div>
            </div>
          </div>

          {loadingPedidos ? (
            <div className="text-center py-20 font-bold text-slate-500 flex flex-col items-center">
              <div className="animate-spin text-[#20B2AA] mb-4"><IconPackage /></div>
              Buscando Pedidos da Planilha...
            </div>
          ) : (
            <>
              {viewConfig.mode === 'cards' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedPedidos.length === 0 ? (
                      <div className="col-span-full py-12 text-center text-slate-500 font-bold text-lg bg-white rounded-2xl border-2 border-slate-200 border-dashed">
                        Nenhum pedido encontrado.
                      </div>
                    ) : (
                      displayedPedidos.map(pedido => (
                        <div key={pedido.row} onClick={() => handleOpenEdit(pedido)} className="bg-white rounded-2xl border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] flex flex-col h-full hover:shadow-[6px_6px_0px_0px_rgba(229,184,11,1)] cursor-pointer transition-all transform hover:-translate-y-1">
                          <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-3">
                            <StatusBadge pedido={pedido} />
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">L-{pedido.row}</span>
                          </div>
                          
                          <div className="flex-1 space-y-3 text-sm">
                            <div><span className="text-slate-500 text-xs font-bold uppercase">Liderança</span><br/><EntityLink type="liderancaNome" label={pedido.liderancaNome || 'Não Informado'} /></div>
                            <div><span className="text-slate-500 text-xs font-bold uppercase">Articulador</span><br/><EntityLink type="articuladorNome" label={pedido.articuladorNome || 'Não Informado'} /></div>
                            <div><span className="text-slate-500 text-xs font-bold uppercase">Modo de Recebimento</span><br/><span className="font-bold text-slate-800">{pedido.modoRecebimento || 'Não Informado'}</span></div>
                            <div><span className="text-slate-500 text-xs font-bold uppercase">Destino (Endereço)</span><br/><EntityLink type="enderecoRecebimento" label={pedido.enderecoRecebimento || 'Não Informado'} /></div>
                            <div><span className="text-slate-500 text-xs font-bold uppercase">Agendamento</span><br/><span className="font-bold text-slate-800">{pedido.dataAgendada ? formatarDataBR(pedido.dataAgendada) : '-'} {pedido.horarioRetirada ? `às ${pedido.horarioRetirada}` : ''}</span></div>
                            
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4 relative">
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
                    <div className="flex justify-center space-x-2 pt-6 pb-10">
                      {Array.from({length: totalPages}, (_, i) => (
                        <button key={i+1} onClick={() => setViewConfig({...viewConfig, page: i+1})} className={`w-10 h-10 rounded-full font-bold border-2 ${viewConfig.page === i+1 ? 'bg-[#DC143C] text-white border-[#DC143C]' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}>
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {viewConfig.mode === 'list' && (
                 <div className="overflow-x-auto bg-white rounded-2xl border-2 border-slate-800 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] mb-20">
                   <table className="w-full text-left text-sm border-collapse min-w-[1050px]">
                     <thead>
                       <tr className="bg-slate-100 border-b-2 border-slate-800 text-slate-600 uppercase text-xs">
                         <SortHeader label="Inclusão" field="data" />
                         <SortHeader label="Liderança" field="lideranca" />
                         <SortHeader label="Articulador" field="articulador" />
                         <th className="p-4 font-black">Modo</th>
                         <SortHeader label="Destino (Endereço)" field="local" />
                         <SortHeader label="Agendamento" field="agendamento" />
                         <th className="p-4 font-black text-slate-400 cursor-not-allowed">Materiais (S/ Filtro)</th>
                         <SortHeader label="Status" field="status" />
                       </tr>
                     </thead>
                     <tbody>
                       {displayedPedidos.map(pedido => (
                         <tr key={pedido.row} onClick={() => handleOpenEdit(pedido)} className="border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group">
                           <td className="p-4 font-bold text-slate-700">{String(pedido.data || '').split(' ')[0] || '-'}</td>
                           <td className="p-4"><EntityLink type="liderancaNome" label={pedido.liderancaNome || '-'} /></td>
                           <td className="p-4"><EntityLink type="articuladorNome" label={pedido.articuladorNome || '-'} /></td>
                           <td className="p-4 text-xs font-bold text-slate-700">{pedido.modoRecebimento || '-'}</td>
                           <td className="p-4"><EntityLink type="enderecoRecebimento" label={pedido.enderecoRecebimento || '-'} /></td>
                           <td className="p-4 text-xs font-bold text-slate-700">{pedido.dataAgendada ? formatarDataBR(pedido.dataAgendada) : '-'} {pedido.horarioRetirada ? `(${pedido.horarioRetirada})` : ''}</td>
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
            </>
          )}

        </div>
      )}

      {}
      {activeTab === 'estoque' && (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 pb-20">
          
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(229,184,11,1)] text-white">
            <div className="flex justify-between items-start border-b border-slate-700 pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#E5B80B] flex items-center gap-2"><IconTrendingUp/> Visão Geral do Estoque</h2>
                <p className="text-slate-400 text-sm mt-1">Análise geral baseada em todos os pedidos e total adquirido.</p>
              </div>
              <button onClick={() => setModalLeva({ show: true, step: 1, nome: '', itens: {} })} className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-sm">
                <IconPlus /> Nova Leva
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Comprado (Adquirido)</p>
                <p className="text-3xl font-black text-white">{globalTotalAdquirido}</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Solicitado (Pedidos)</p>
                <p className="text-3xl font-black text-[#E5B80B]">{globalTotalSolicitado}</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo Total Disponível</p>
                <p className="text-3xl font-black text-[#20B2AA]">{globalTotalDisponivel}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                <span>Pressão sobre Compras (Solicitado vs Comprado)</span>
                <span className={percentualGlobalEstoque > 100 ? 'text-[#DC143C]' : 'text-white'}>{percentualGlobalEstoque.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden relative">
                <div className={`h-4 rounded-full transition-all ${percentualGlobalEstoque > 100 ? 'bg-[#DC143C]' : 'bg-[#E5B80B]'}`} style={{ width: `${Math.min(percentualGlobalEstoque, 100)}%` }}></div>
                {percentualGlobalEstoque > 100 && (
                   <div className="absolute top-0 right-0 h-full bg-[#DC143C]/50 w-full animate-pulse"></div>
                )}
              </div>
              {percentualGlobalEstoque > 100 && <p className="text-xs text-[#DC143C] font-bold mt-2 text-right">Demanda ultrapassou as compras totais.</p>}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
              <h3 className="font-bold text-sm uppercase text-slate-400 mb-4">Principais Destinos Atendidos</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueLocais.length > 0 ? uniqueLocais.map(loc => (
                  <span key={loc} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-bold border border-slate-700">{loc}</span>
                )) : <span className="text-slate-500 text-sm">Nenhum local registrado ainda.</span>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mb-4">
             <button onClick={() => setEstoqueViewConfig({mode: 'list'})} className={`p-2 rounded-lg border-2 ${estoqueViewConfig.mode === 'list' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}><IconList /></button>
             <button onClick={() => setEstoqueViewConfig({mode: 'cards'})} className={`p-2 rounded-lg border-2 ${estoqueViewConfig.mode === 'cards' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}><IconGrid /></button>
          </div>

          {loadingEstoque ? (
            <div className="text-center py-20 font-bold text-slate-500"><div className="animate-spin text-[#20B2AA] mb-4 flex justify-center"><IconPackage /></div>Buscando Estoque...</div>
          ) : estoqueViewConfig.mode === 'list' ? (
            <div className="overflow-x-auto bg-white rounded-2xl border-2 border-slate-800 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)]">
               <table className="w-full text-left text-sm border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-slate-100 border-b-2 border-slate-800 text-slate-600 uppercase text-xs">
                     <th className="p-4 font-black">Material</th>
                     <th className="p-4 font-black text-center border-x border-slate-200 bg-[#E5B80B]/10 text-[#B8860B]">Total Adquirido</th>
                     {levasHeaders.map(l => (
                       <th key={l} className="p-4 font-bold text-center border-r border-slate-200 text-slate-500">{l}</th>
                     ))}
                     <th className="p-4 font-black text-center bg-[#20B2AA]/10 text-[#008080]">Saldo Atual</th>
                   </tr>
                 </thead>
                 <tbody>
                   {estoque.map(item => {
                     const demandaIt = aggregatedRequests[item.nome] || 0;
                     const pctIt = item.totalAdquirido > 0 ? (demandaIt / item.totalAdquirido) * 100 : 0;
                     return (
                       <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                         <td className="p-4">
                           <p className="font-bold text-slate-800">{item.nome}</p>
                           <p className="text-xs text-slate-500 mt-1">Demanda: {demandaIt} un. ({pctIt.toFixed(0)}%)</p>
                           <div className="w-24 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                             <div className={`h-1.5 rounded-full ${pctIt > 100 ? 'bg-[#DC143C]' : 'bg-[#E5B80B]'}`} style={{ width: `${Math.min(pctIt, 100)}%` }}></div>
                           </div>
                         </td>
                         <td className="p-4 text-center font-black text-slate-800 border-x border-slate-100 bg-slate-50">{item.totalAdquirido}</td>
                         {levasHeaders.map(l => (
                           <td key={l} className="p-4 text-center text-slate-600 font-medium border-r border-slate-100">{item.levas[l] || '-'}</td>
                         ))}
                         <td className="p-4 text-center font-black text-[#20B2AA] bg-[#20B2AA]/5">{item.disponivel}</td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {estoque.map(item => {
                 const demandaIt = aggregatedRequests[item.nome] || 0;
                 return (
                   <div key={item.id} className="bg-white rounded-2xl border-2 border-slate-800 p-5 shadow-[4px_4px_0px_0px_rgba(20,184,166,1)]">
                     <h3 className="font-bold text-slate-800 text-lg leading-tight mb-4 pb-3 border-b border-slate-200">{item.nome}</h3>
                     <div className="grid grid-cols-2 gap-4 mb-4">
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Adquirido</p>
                         <p className="text-xl font-black text-slate-800">{item.totalAdquirido}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Atual</p>
                         <p className="text-xl font-black text-[#20B2AA]">{item.disponivel}</p>
                       </div>
                     </div>
                     <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                       <p className="text-xs font-bold text-slate-500 uppercase mb-2">Entradas (Levas)</p>
                       <div className="space-y-1">
                         {levasHeaders.length === 0 ? <p className="text-xs text-slate-400 italic">Nenhuma leva inserida.</p> : levasHeaders.map(l => (
                           <div key={l} className="flex justify-between text-xs">
                             <span className="text-slate-600 truncate">{l}</span>
                             <span className="font-bold text-slate-800">{item.levas[l] || 0}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 );
               })}
            </div>
          )}
        </div>
      )}

      {}
      {/* MODAL STATUS RÁPIDO */}
      {modalStatus.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_0px_rgba(32,178,170,1)] animate-in fade-in zoom-in-95 duration-200">
            {modalStatus.step === 1 ? (
              <>
                <div className="w-16 h-16 bg-[#E5B80B]/20 text-[#E5B80B] rounded-full flex items-center justify-center mb-6 mx-auto"><IconAlert /></div>
                <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Confirmar Ação</h3>
                <p className="text-center text-slate-600 font-medium mb-8">Você está prestes a alterar o status deste pedido para <strong className="text-slate-900">{modalStatus.newStatus}</strong>. Deseja continuar?</p>
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

      {/* MODAL CONFIRMAÇÃO EDIÇÃO COMPLETA */}
      {modalEditConfirm.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-4 border-slate-900 max-w-md w-full p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] animate-in fade-in zoom-in-95 duration-200">
            {modalEditConfirm.step === 1 ? (
              <>
                <div className="w-16 h-16 bg-[#20B2AA]/20 text-[#20B2AA] rounded-full flex items-center justify-center mb-6 mx-auto"><IconCheck /></div>
                <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Salvar Edição?</h3>
                <p className="text-center text-slate-600 font-medium mb-8">Você está prestes a reescrever todas as informações do pedido da linha <strong className="text-slate-900">L-{formData.row}</strong> na planilha.</p>
                <div className="flex gap-4">
                  <button onClick={() => setModalEditConfirm({show: false})} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50">Voltar</button>
                  <button onClick={() => setModalEditConfirm({...modalEditConfirm, step: 2})} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(20,184,166,1)] hover:bg-slate-800">Sim, Continuar</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Resumo da Edição</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 mb-6 space-y-3 text-sm">
                  {modalEditConfirm.changesSummary.map((item, idx) => (
                    <p key={idx}><span className="font-bold text-slate-500">{item.label}:</span><br/><span className="font-bold text-slate-800">{item.val}</span></p>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setModalEditConfirm({show: false})} disabled={submitting} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50">Cancelar</button>
                  <button onClick={() => processSubmit(true)} disabled={submitting} className="flex-1 flex justify-center items-center py-3 bg-[#20B2AA] text-white font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] hover:bg-[#1c9c95] border-2 border-[#20B2AA] disabled:opacity-70">
                    {submitting ? "Salvando..." : "Confirmar e Salvar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL NOVA LEVA */}
      {modalLeva.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-4 border-slate-900 max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-[8px_8px_0px_0px_rgba(229,184,11,1)] animate-in fade-in zoom-in-95 duration-200">
            {modalLeva.step === 1 ? (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-2 border-b-2 border-slate-200 pb-4">Registrar Nova Leva</h3>
                <div className="mb-4 mt-2">
                  <label className="block text-sm font-bold text-slate-800 mb-1">Nome de Referência da Leva <span className="text-[#DC143C]">*</span></label>
                  <input type="text" placeholder="Ex: Remessa Gráfica 15/Ago" value={modalLeva.nome} onChange={e => setModalLeva({...modalLeva, nome: e.target.value})} className="w-full px-3 py-2 border-2 border-slate-400 rounded-lg focus:border-slate-900 focus:outline-none font-bold text-slate-700" />
                </div>
                <div className="flex-1 overflow-y-auto mb-4 border border-slate-200 rounded-xl bg-slate-50 p-2 custom-scrollbar">
                  <p className="text-xs font-bold text-slate-500 uppercase text-center mb-2 mt-1">Quantidades Recebidas por Item</p>
                  {estoque.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-slate-100 rounded-lg border-b border-slate-200 last:border-0">
                      <span className="text-sm font-bold text-slate-700 truncate pr-2" title={item.nome}>{item.nome}</span>
                      <input type="number" min="0" value={modalLeva.itens[item.nome] || ''} onChange={e => setModalLeva({...modalLeva, itens: {...modalLeva.itens, [item.nome]: parseInt(e.target.value) || 0}})} placeholder="0" className="w-20 text-center py-1 border-2 border-slate-300 rounded-md font-bold focus:border-[#20B2AA] focus:outline-none"/>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <button onClick={() => setModalLeva({show: false, step: 1, nome: '', itens: {}})} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50">Cancelar</button>
                  <button onClick={() => { if(!modalLeva.nome.trim()) { alert('Dê um nome para a leva.'); return; } setModalLeva({...modalLeva, step: 2}); }} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] hover:bg-slate-800">Avançar</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Resumo da Leva</h3>
                <div className="flex-1 overflow-y-auto mb-4 border border-slate-200 rounded-xl bg-slate-50 p-4">
                  <p><span className="font-bold text-slate-500">Nome da Leva:</span><br/><span className="text-lg font-black text-slate-800">{modalLeva.nome}</span></p>
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                     <p className="text-xs font-bold text-slate-500 uppercase mb-2">Itens Registrados</p>
                     {Object.entries(modalLeva.itens).filter(([k,v]) => v > 0).length === 0 ? <p className="text-sm italic text-slate-500">Nenhuma quantidade superior a zero.</p> : 
                      Object.entries(modalLeva.itens).filter(([k,v]) => v > 0).map(([k,v]) => (
                        <div key={k} className="flex justify-between text-sm"><span className="font-bold text-slate-600">{k}</span><span className="font-black text-[#20B2AA]">+{v}</span></div>
                      ))
                     }
                  </div>
                </div>
                <p className="mb-6 text-center text-slate-700 font-bold text-sm">Esta ação criará uma nova coluna no Estoque. Deseja prosseguir?</p>
                <div className="flex gap-4">
                  <button onClick={() => setModalLeva({...modalLeva, step: 1})} disabled={updatingStatus} className="flex-1 py-3 bg-white text-slate-700 font-bold border-2 border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50">Voltar</button>
                  <button onClick={handleCreateLeva} disabled={updatingStatus} className="flex-1 flex justify-center items-center py-3 bg-[#E5B80B] text-slate-900 font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] hover:bg-[#d4aa0a] border-2 border-[#E5B80B] disabled:opacity-70">
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
