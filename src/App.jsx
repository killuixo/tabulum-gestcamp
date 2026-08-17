import React, { useState, useMemo, useEffect } from 'react';

// Constantes de Cores (Estilo Mondrian Suave)
const COLORS = {
  mustard: '#E5B13A',
  crimson: '#D93846',
  teal: '#2A9D8F',
  darkBg: '#1E1E1E',
  lightBg: '#F4F1EA',
  darkCard: '#2C2C2C',
  lightCard: '#FFFFFF',
  textDark: '#F4F1EA',
  textLight: '#2C2C2C'
};

// Ícones SVG Nativos
const Icons = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  List: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Grid: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Map: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  Moon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Filter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Package: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Alert: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Save: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Link: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Loader: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-spin">
      <defs>
        <linearGradient id="gestcamp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5B13A" />
          <stop offset="50%" stopColor="#D93846" />
          <stop offset="100%" stopColor="#2A9D8F" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#gestcamp-grad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="45 18" />
    </svg>
  )
};

const METADATA = {
  situacoes: ['A ENTREGAR', 'ENTREGUE PARCIAL', 'ENTREGUE'],
  materiais: ['Santinhos', 'Santão', 'Furadinhos Bola', 'Furadinhos Retangular', 'Praguinha', 'Adesivo de Carro', 'Bandeira']
};

const FichaDetalhada = ({ tipo, valor, data, onClose, theme, onFilterClick }) => {
  const bgColor = theme === 'dark' ? 'bg-[#2C2C2C]' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const dadosFiltrados = data.filter(item => {
    if (tipo === 'articulador') return item.articulador === valor;
    if (tipo === 'lideranca') return item.lideranca === valor;
    if (tipo === 'municipio') return item.municipio === valor;
    if (tipo === 'situacao') return item.situacao === valor;
    if (tipo === 'regiao') return item.regiaoArticulador === valor || item.regiaoFloripa === valor;
    if (tipo === 'bairro') return item.bairro === valor;
    return false;
  });

  const totalSolicitado = dadosFiltrados.reduce((acc, curr) => acc + (Number(curr.quantidadeSolicitada) || 0), 0);
  const totalEntregue = dadosFiltrados.reduce((acc, curr) => acc + (Number(curr.quantidadeEntregue) || 0), 0);

  return (
    <div className={`p-6 rounded-xl shadow-xl ${bgColor} ${textColor} border-l-8`} style={{ borderColor: COLORS.teal }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Ficha Completa: {tipo}</h2>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.mustard }}>{valor}</h1>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
          <Icons.ChevronLeft /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <div className="text-teal-500"><Icons.Package /></div>
          <div>
            <p className="text-sm opacity-70">Total Solicitado</p>
            <p className="text-xl font-bold">{totalSolicitado}</p>
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <div className="text-red-500"><Icons.MapPin /></div>
          <div>
            <p className="text-sm opacity-70">Total Entregue</p>
            <p className="text-xl font-bold">{totalEntregue}</p>
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <div className="text-yellow-500"><Icons.Alert /></div>
          <div>
            <p className="text-sm opacity-70">Pendentes</p>
            <p className="text-xl font-bold">{totalSolicitado - totalEntregue}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLORS.crimson }}>Registros Vinculados</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: COLORS.mustard }}>
              <th className="p-3">Material</th>
              <th className="p-3">Qtd</th>
              <th className="p-3">Situação</th>
              <th className="p-3">Liderança</th>
              <th className="p-3">Prazo</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map(item => (
              <tr key={item.id} className={`border-b ${borderColor} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}>
                <td className="p-3 font-medium">{item.material}</td>
                <td className="p-3">{item.quantidadeEntregue}/{item.quantidadeSolicitada}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.situacao === 'ENTREGUE' ? 'bg-green-100 text-green-800' :
                    item.situacao === 'ENTREGUE PARCIAL' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.situacao}
                  </span>
                </td>
                <td className="p-3 cursor-pointer hover:underline text-blue-500" onClick={() => onFilterClick('lideranca', item.lideranca)}>
                  {item.lideranca}
                </td>
                <td className="p-3">{item.dataPrazo ? new Date(item.dataPrazo).toLocaleDateString('pt-BR') : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  // Estados Globais
  const [theme, setTheme] = useState('light');
  const [dataStatus, setDataStatus] = useState('loading');
  const [data, setData] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // Default = list
  const [activeDetail, setActiveDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortConfig, setSortConfig] = useState({ key: 'dataPrazo', direction: 'asc' });

  // Controles de Filtro
  const [floripaMode, setFloripaMode] = useState('all'); // 'all', 'except', 'only'
  const [openFilterGroup, setOpenFilterGroup] = useState('situacao'); // Filtro Sanfonado

  // Estados de Edição
  const [editingItem, setEditingItem] = useState(null);
  const [draftItem, setDraftItem] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [filters, setFilters] = useState({
    articulador: [], municipio: [], associacao: [], regiaoArticulador: [], 
    situacao: [], bairro: [], regiaoFloripa: [], distrito: [], fase: []
  });

  // Busca inicial da Planilha
  useEffect(() => {
    const fetchData = async () => {
      setDataStatus('loading');
      try {
        const apiUrl = import.meta.env?.VITE_SHEETS_API_URL;
        if (!apiUrl) throw new Error("URL da planilha não configurada no ambiente.");

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Falha na comunicação com a planilha.");
        
        const result = await response.json();
        
        if (result && result.entregas && Array.isArray(result.entregas)) {
          setData(result.entregas);
          setEstoque(result.estoque || []);
          setDataStatus('success');
        } else if (Array.isArray(result)) {
           setData(result);
           setDataStatus('success');
        } else {
          throw new Error("Planilha vazia ou em formato incorreto.");
        }
      } catch (error) {
        console.error("Erro ao sincronizar dados:", error);
        setDataStatus('error');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? COLORS.darkBg : COLORS.lightBg;
    document.body.style.color = theme === 'dark' ? COLORS.textDark : COLORS.textLight;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleNavigate = (newView, detail = null) => {
    if (hasUnsavedChanges) {
      setPendingNavigation({ view: newView, detail });
      setShowUnsavedModal(true);
    } else {
      executeNavigation(newView, detail);
    }
  };

  const executeNavigation = (newView, detail) => {
    setViewMode(newView);
    setActiveDetail(detail);
    setEditingItem(null);
    setDraftItem(null);
    setHasUnsavedChanges(false);
    setPendingNavigation(null);
  };

  // Funções de Edição: TABULUM
  const startEditing = (item) => {
    setEditingItem(item);
    setDraftItem({ ...item, __sheet: 'TABULUM' });
    setHasUnsavedChanges(false);
    setViewMode('edit');
  };

  const addNewEntrega = () => {
    const newItem = { id: crypto.randomUUID(), __sheet: 'TABULUM' };
    setEditingItem({});
    setDraftItem(newItem);
    setHasUnsavedChanges(true);
    setViewMode('edit');
  };

  // Funções de Edição: ESTOQUE
  const startEditingEstoque = (item) => {
    setEditingItem(item);
    
    // Parse Qtd and Unit
    let rawQtd = item['Quantidade Total'] || '';
    let parsedQtd = rawQtd;
    let parsedUnit = '';
    const match = rawQtd.toString().match(/^([\d.,]+)\s*(.*)$/);
    if (match) {
        parsedQtd = match[1];
        parsedUnit = match[2];
    }
    
    setDraftItem({ 
        ...item, 
        __sheet: 'ESTOQUE',
        _qtdNumber: parsedQtd,
        _qtdUnit: parsedUnit
    });
    setHasUnsavedChanges(false);
    setViewMode('editEstoque');
  };

  const addNewEstoque = () => {
    const newItem = { __sheet: 'ESTOQUE', __rowIndex: -1, _qtdNumber: '', _qtdUnit: '' };
    setEditingItem({});
    setDraftItem(newItem);
    setHasUnsavedChanges(true);
    setViewMode('editEstoque');
  };

  const handleDraftChange = (field, value) => {
    setDraftItem(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const attemptSave = () => {
    setShowUnsavedModal(false);
    setShowConfirmModal(true);
  };

  const discardChangesAndNavigate = () => {
    setShowUnsavedModal(false);
    if (pendingNavigation) {
      executeNavigation(pendingNavigation.view, pendingNavigation.detail);
    } else {
      setEditingItem(null);
      setDraftItem(null);
      setHasUnsavedChanges(false);
      setViewMode(draftItem?.__sheet === 'ESTOQUE' ? 'estoque' : 'list');
    }
  };

  const confirmSave = async () => {
    try {
      const apiUrl = import.meta.env?.VITE_SHEETS_API_URL;
      if (!apiUrl) throw new Error("URL da planilha não configurada.");

      let payload = { ...draftItem };

      // Se for estoque, remonta a "Quantidade Total"
      if (payload.__sheet === 'ESTOQUE') {
          payload['Quantidade Total'] = `${payload._qtdNumber || ''} ${payload._qtdUnit || ''}`.trim();
          delete payload._qtdNumber;
          delete payload._qtdUnit;

          // Atualização Otimista UI Estoque
          if (payload.__rowIndex === -1) {
              // Simula adição rápida no frontend para UX
              setEstoque(prev => [...prev, payload]);
          } else {
              setEstoque(prev => prev.map(item => item.__rowIndex === payload.__rowIndex ? payload : item));
          }
      } else {
          // Atualização Otimista UI Tabulum
          if (!editingItem.id) { // Novo
              setData(prev => [...prev, payload]);
          } else {
              setData(prev => prev.map(item => item.id === payload.id ? payload : item));
          }
      }

      setShowConfirmModal(false);
      setHasUnsavedChanges(false);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao salvar na planilha");

      setToastMessage('Salvo com sucesso!');
      setTimeout(() => setToastMessage(''), 3000);

      if (pendingNavigation) {
        executeNavigation(pendingNavigation.view, pendingNavigation.detail);
      } else {
        executeNavigation(payload.__sheet === 'ESTOQUE' ? 'estoque' : 'list', null);
      }

    } catch (error) {
      console.error("Erro no salvamento:", error);
      alert("Houve um erro ao tentar salvar as alterações na planilha.");
    }
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected 
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ articulador: [], municipio: [], associacao: [], regiaoArticulador: [], situacao: [], bairro: [], regiaoFloripa: [], distrito: [], fase: [] });
  };

  // Filtragem Inteligente com Floripa Mode
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const isFloripa = item.municipio === 'Florianópolis';
      
      if (floripaMode === 'only' && !isFloripa) return false;
      if (floripaMode === 'except' && isFloripa) return false;

      return Object.entries(filters).every(([key, selectedValues]) => {
        if (selectedValues.length === 0) return true;
        if (!item[key]) return false; 
        return selectedValues.includes(item[key]);
      });
    }).sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, filters, sortConfig, floripaMode]);

  const getFilterOptions = (category) => {
    const options = {};
    data.forEach(item => {
      if (['bairro', 'regiaoFloripa', 'distrito'].includes(category)) {
        if (item.municipio !== 'Florianópolis') return;
      }
      const val = item[category];
      if (val) {
        if (!options[val]) options[val] = { entregue: 0, total: 0 };
        options[val].entregue += Number(item.quantidadeEntregue) || 0;
        options[val].total += Number(item.quantidadeSolicitada) || 0;
      }
    });
    return Object.entries(options).map(([name, stats]) => ({ name, ...stats })).sort((a, b) => a.name.localeCompare(b.name));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const formatDateForInput = (isoString) => {
    if (!isoString) return '';
    try { return new Date(isoString).toISOString().split('T')[0]; } 
    catch { return isoString.split('T')[0]; }
  };

  // Geradores de Autocomplete Inteligente (Extração Única)
  const autoCompletes = useMemo(() => ({
      articuladores: [...new Set(data.map(d => d.articulador).filter(Boolean))],
      liderancas: [...new Set(data.map(d => d.lideranca).filter(Boolean))],
      municipios: [...new Set(data.map(d => d.municipio).filter(Boolean))],
      associacoes: [...new Set(data.map(d => d.associacao).filter(Boolean))],
      regioesArtic: [...new Set(data.map(d => d.regiaoArticulador).filter(Boolean))],
      regioesFloripa: [...new Set(data.map(d => d.regiaoFloripa).filter(Boolean))],
      distritos: [...new Set(data.map(d => d.distrito).filter(Boolean))],
      bairros: [...new Set(data.map(d => d.bairro).filter(Boolean))],
      fases: [...new Set(data.map(d => d.fase).filter(Boolean))],
      
      // Estoque Autocompletes
      estCategorias: [...new Set(estoque.map(e => e['Categoria']).filter(Boolean))],
      estFormatos: [...new Set(estoque.map(e => e['Formato']).filter(Boolean))],
  }), [data, estoque]);

  // Estilos Comuns
  const bgClass = theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-[#F4F1EA]';
  const cardClass = theme === 'dark' ? 'bg-[#2C2C2C] border-gray-700' : 'bg-white border-gray-200';
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const inputClass = `w-full p-2.5 text-sm rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-[#333] border-gray-600 focus:border-teal-500 text-white' : 'bg-white border-gray-300 focus:border-teal-500 text-black'}`;
  const labelClass = "block text-[10px] font-bold uppercase opacity-70 mb-1 tracking-wider";

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Lógica do Mapa Otimizada com Floripa Mode
  const getMapQuery = () => {
    if (floripaMode === 'only') {
        if (filters.bairro.length > 0) return `${filters.bairro[0]}, Florianópolis, SC, Brasil`;
        if (filters.distrito.length > 0) return `${filters.distrito[0]}, Florianópolis, SC, Brasil`;
        if (filters.regiaoFloripa.length > 0) return `${filters.regiaoFloripa[0]}, Florianópolis, SC, Brasil`;
        return `Florianópolis, SC, Brasil`;
    }
    if (filters.municipio.length > 0) return `${filters.municipio[0]}, SC, Brasil`;
    return 'Santa Catarina, Brasil';
  };

  const renderModals = () => {
    // Calculo do diff dinâmico ignorando chaves internas como __sheet
    const diffKeys = draftItem && editingItem ? Object.keys(draftItem).filter(k => !k.startsWith('_') && draftItem[k] !== editingItem[k]) : [];

    return (
      <>
        {/* Renderiza as Datalists Ocultas globalmente para usar nos forms */}
        <datalist id="dl-articuladores">{autoCompletes.articuladores.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-liderancas">{autoCompletes.liderancas.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-municipios">{autoCompletes.municipios.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-associacoes">{autoCompletes.associacoes.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-regioesArtic">{autoCompletes.regioesArtic.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-regioesFloripa">{autoCompletes.regioesFloripa.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-distritos">{autoCompletes.distritos.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-bairros">{autoCompletes.bairros.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-fases">{autoCompletes.fases.map(x => <option key={x} value={x} />)}</datalist>
        
        <datalist id="dl-estCategorias">{autoCompletes.estCategorias.map(x => <option key={x} value={x} />)}</datalist>
        <datalist id="dl-estFormatos">{autoCompletes.estFormatos.map(x => <option key={x} value={x} />)}</datalist>
        
        <datalist id="dl-unidades">
            <option value="unidades" />
            <option value="caixas" />
            <option value="maços" />
            <option value="pacotes" />
            <option value="kits" />
        </datalist>

        {showUnsavedModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
            <div className={`p-6 rounded-xl shadow-2xl max-w-sm w-full ${cardClass} animate-in fade-in zoom-in-95`}>
              <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2"><Icons.Alert /> Atenção!</h3>
              <p className="mb-6 opacity-80">Você fez alterações que ainda não foram salvas. O que deseja fazer?</p>
              <div className="flex flex-col gap-3">
                <button onClick={attemptSave} className="w-full py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] transition-colors flex justify-center items-center gap-2">
                  <Icons.Save /> Revisar e Salvar
                </button>
                <button onClick={discardChangesAndNavigate} className="w-full py-3 rounded-lg font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors flex justify-center items-center gap-2">
                  <Icons.X /> Descartar Alterações
                </button>
                <button onClick={() => setShowUnsavedModal(false)} className="w-full py-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                  Cancelar e continuar editando
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && draftItem && editingItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
            <div className={`p-6 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${cardClass} animate-in fade-in zoom-in-95`}>
              <h3 className="text-xl font-black mb-4 border-b pb-2" style={{ borderColor: COLORS.mustard }}>Confirmar Alterações</h3>
              
              <div className="space-y-3 mb-6 bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                {diffKeys.map(key => (
                  <div key={key} className="flex flex-col text-sm border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                    <span className="font-bold uppercase text-[10px] opacity-50">{key}</span>
                    <div className="flex items-center gap-2 mt-1 break-all">
                      <span className="line-through text-red-500 opacity-70">{editingItem[key] || '(vazio)'}</span>
                      <Icons.ChevronRight />
                      <span className="font-bold text-green-600 dark:text-green-400">{draftItem[key] || '(vazio)'}</span>
                    </div>
                  </div>
                ))}
                
                {/* Diferenças Especiais (Estoque Qtd) */}
                {draftItem.__sheet === 'ESTOQUE' && (draftItem._qtdNumber !== editingItem._qtdNumber || draftItem._qtdUnit !== editingItem._qtdUnit) && (
                   <div className="flex flex-col text-sm border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                     <span className="font-bold uppercase text-[10px] opacity-50">Quantidade Total</span>
                     <div className="flex items-center gap-2 mt-1 break-all">
                       <span className="font-bold text-green-600 dark:text-green-400">{draftItem._qtdNumber} {draftItem._qtdUnit}</span>
                     </div>
                   </div>
                )}

                {diffKeys.length === 0 && !(draftItem.__sheet === 'ESTOQUE' && (draftItem._qtdNumber || draftItem._qtdUnit)) && (
                  <p className="text-center opacity-50 text-sm py-4">Nenhuma alteração detectada.</p>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={confirmSave} 
                  className="flex-1 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] transition-colors flex justify-center items-center gap-2"
                >
                  <Icons.Check /> Salvar
                </button>
                <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 rounded-lg font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors flex justify-center items-center gap-2">
                  Voltar
                </button>
              </div>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 z-50">
            <Icons.Check /> {toastMessage}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${bgClass} ${textClass}`}>
      {renderModals()}
      
      {/* Sidebar de Filtros Limpa e Organizada */}
      <aside className={`w-full md:w-80 p-6 border-r flex-shrink-0 overflow-y-auto h-screen sticky top-0 ${theme === 'dark' ? 'border-gray-800 bg-[#1A1A1A]' : 'border-gray-300 bg-[#EFEBE1]'}`}>
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <img src="https://raw.githubusercontent.com/killuixo/tabulum-gestcamp/refs/heads/main/icon-192.png" alt="Tabulum Logo" className="w-12 h-12 rounded-lg shadow-md object-cover" />
            <h1 className="text-xl font-black tracking-tighter leading-tight">
              <span style={{ color: COLORS.crimson }}>TABULUM</span><br/>
              <span style={{ color: COLORS.teal }}>Gestão de Campanha</span>
            </h1>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0">
            {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold flex items-center gap-2"><Icons.Filter /> Filtros Inteligentes</h2>
            <button onClick={clearFilters} className="text-xs underline text-gray-500 hover:text-red-500">Limpar</button>
          </div>

          {/* Toggle Floripa */}
          <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1 mb-6">
            <button onClick={() => setFloripaMode('all')} className={`flex-1 text-[10px] font-bold uppercase py-2 rounded transition-colors ${floripaMode==='all'?'bg-white dark:bg-[#333] shadow text-teal-600 dark:text-teal-400':''}`}>Todos</button>
            <button onClick={() => setFloripaMode('except')} className={`flex-1 text-[10px] font-bold uppercase py-2 rounded transition-colors ${floripaMode==='except'?'bg-white dark:bg-[#333] shadow text-teal-600 dark:text-teal-400':''}`}>S/ Floripa</button>
            <button onClick={() => setFloripaMode('only')} className={`flex-1 text-[10px] font-bold uppercase py-2 rounded transition-colors ${floripaMode==='only'?'bg-white dark:bg-[#333] shadow text-teal-600 dark:text-teal-400':''}`}>Só Floripa</button>
          </div>

          {/* Accordions de Filtros Globais */}
          {[
            { id: 'situacao', label: 'Situação', color: COLORS.mustard },
            { id: 'fase', label: 'Fase/Prazo', color: COLORS.teal },
            { id: 'articulador', label: 'Articulador', color: COLORS.crimson },
            { id: 'municipio', label: 'Município', color: COLORS.mustard, hide: floripaMode === 'only' },
            { id: 'associacao', label: 'Assoc. de Municípios', color: COLORS.teal, hide: floripaMode === 'only' },
            { id: 'regiaoArticulador', label: 'Região Geral', color: COLORS.crimson, hide: floripaMode === 'only' }
          ].filter(g => !g.hide).map(filterGroup => (
            <div key={filterGroup.id} className="border-l-4 pl-3 py-1 transition-all" style={{ borderColor: filterGroup.color }}>
              <button onClick={() => setOpenFilterGroup(openFilterGroup === filterGroup.id ? '' : filterGroup.id)} className="flex justify-between w-full font-bold text-sm uppercase opacity-80 hover:opacity-100 outline-none">
                {filterGroup.label} <span className="font-mono text-lg leading-none">{openFilterGroup === filterGroup.id ? '-' : '+'}</span>
              </button>
              
              {openFilterGroup === filterGroup.id && (
                <div className="mt-3 space-y-1 max-h-40 overflow-y-auto pr-2 animate-in slide-in-from-top-2">
                  {getFilterOptions(filterGroup.id).map(opt => (
                    <label key={opt.name} className="flex items-center justify-between group cursor-pointer text-sm">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={filters[filterGroup.id].includes(opt.name)} onChange={() => handleFilterChange(filterGroup.id, opt.name)} className="rounded border-gray-400 text-teal-600 focus:ring-teal-500 bg-transparent" />
                        <span className="group-hover:text-teal-500 transition-colors truncate max-w-[150px]" title={opt.name}>{opt.name}</span>
                      </div>
                      <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md font-mono shrink-0">
                        {opt.entregue}/{opt.total}
                      </span>
                    </label>
                  ))}
                  {getFilterOptions(filterGroup.id).length === 0 && <span className="text-xs opacity-50">Sem dados.</span>}
                </div>
              )}
            </div>
          ))}

          {/* Filtros Específicos Florianópolis (Só aparecem se Apenas Floripa estiver marcado) */}
          {floripaMode === 'only' && (
            <div className="mt-8 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/30">
              <h3 className="font-bold text-sm mb-4 text-center text-teal-700 dark:text-teal-400">📍 Filtros Locais - Floripa</h3>
              {['regiaoFloripa', 'distrito', 'bairro'].map(filterId => (
                <div key={filterId} className="mb-4 last:mb-0">
                  <h4 className="text-xs font-bold uppercase mb-1 opacity-70">{filterId.replace('Floripa', ' da Ilha')}</h4>
                  <select 
                    className={`w-full p-2 text-sm rounded-lg border outline-none ${theme === 'dark' ? 'bg-[#333] border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    onChange={(e) => { if(e.target.value) handleFilterChange(filterId, e.target.value); }}
                    value=""
                  >
                    <option value="">Filtrar {filterId}...</option>
                    {getFilterOptions(filterId).filter(opt => !filters[filterId].includes(opt.name)).map(opt => (
                      <option key={opt.name} value={opt.name}>{opt.name} ({opt.entregue}/{opt.total})</option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters[filterId].map(val => (
                      <span key={val} className="text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                        {val} <button onClick={() => handleFilterChange(filterId, val)} className="hover:text-red-500 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen relative">
        
        {/* Navegação Superior - Nova Ordem e Adicionar Registro */}
        <div className="flex flex-wrap gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 justify-between items-center sticky top-0 bg-opacity-90 backdrop-blur-sm z-10" style={{ backgroundColor: theme==='dark'?'rgba(30,30,30,0.8)':'rgba(244,241,234,0.8)' }}>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => handleNavigate('list')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-[#D93846] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <Icons.List /> Lista 
            </button>
            <button onClick={() => handleNavigate('cards')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${viewMode === 'cards' ? 'bg-[#1E1E1E] text-white shadow-md border border-gray-600' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <Icons.Grid /> Cards
            </button>
            <button onClick={() => handleNavigate('map')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${viewMode === 'map' ? 'bg-[#E5B13A] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <Icons.Map /> Mapa
            </button>
            <button onClick={() => handleNavigate('estoque')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${viewMode === 'estoque' ? 'bg-[#2A9D8F] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <Icons.Package /> Estoque
            </button>
            <button onClick={() => handleNavigate('dashboard')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${viewMode === 'dashboard' ? 'bg-[#2A9D8F] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <Icons.Dashboard /> Resumo
            </button>
          </div>
          
          <div className="flex gap-3 items-center">
            {viewMode === 'estoque' ? (
                <button onClick={addNewEstoque} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold flex items-center gap-2 shadow hover:bg-teal-700 transition-colors">
                    <Icons.Plus /> Novo Estoque
                </button>
            ) : viewMode !== 'edit' && viewMode !== 'editEstoque' && viewMode !== 'detail' ? (
                <button onClick={addNewEntrega} className="px-4 py-2 bg-[#D93846] text-white rounded-lg font-bold flex items-center gap-2 shadow hover:bg-red-700 transition-colors">
                    <Icons.Plus /> Nova Entrega
                </button>
            ) : null}

            {viewMode !== 'estoque' && viewMode !== 'edit' && viewMode !== 'editEstoque' && viewMode !== 'detail' && (
                <div className="text-xs font-medium bg-black/10 dark:bg-white/10 px-3 py-2 rounded-full flex items-center gap-1">
                   {filteredData.length} reg.
                </div>
            )}
          </div>
        </div>

        {dataStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center h-64 opacity-80 animate-in fade-in">
            <div className="mb-4 text-teal-500 scale-150"><Icons.Loader /></div>
            <h2 className="text-xl font-bold mb-2">Sincronizando...</h2>
            <p>Conectando ao Google Sheets.</p>
          </div>
        )}

        {dataStatus === 'error' && (
          <div className={`p-6 rounded-xl border-l-4 border-red-500 shadow-md ${cardClass} flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95`}>
            <div className="text-red-500 mb-4 scale-150"><Icons.Alert /></div>
            <h2 className="text-2xl font-black mb-2" style={{ color: COLORS.crimson }}>Planilha Não Carregada</h2>
            <p className="opacity-70 max-w-md mb-8">Não foi possível sincronizar os dados. Verifique a integração ou a internet.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] transition-colors flex items-center gap-2 shadow-lg">
              <Icons.Loader /> Tentar Sincronizar Novamente
            </button>
          </div>
        )}

        {dataStatus === 'success' && (
          <>
            {/* View: Editor / Formulário TABULUM com Autocomplete */}
            {viewMode === 'edit' && draftItem && (
              <div className={`p-6 md:p-8 rounded-xl shadow-xl ${cardClass} animate-in fade-in`}>
                <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    {draftItem.id ? <><Icons.Edit /> Editando Registro: <span className="text-teal-500">#{draftItem.id}</span></> : <><Icons.Plus /> Criando Novo Registro de Entrega</>}
                  </h2>
                  <button onClick={() => handleNavigate('list')} className="text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
                    <Icons.X /> Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-8">
                  
                  {/* Bloco: Status & Material */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 border-b border-dashed dark:border-gray-700 pb-2 mb-2">
                    <h3 className="font-bold text-lg" style={{color: COLORS.crimson}}>Status & Material</h3>
                  </div>
                  
                  <div>
                    <label className={labelClass}>Situação</label>
                    <select value={draftItem.situacao || ''} onChange={(e) => handleDraftChange('situacao', e.target.value)} className={inputClass}>
                      <option value="">Selecione...</option>
                      {METADATA.situacoes.map(sit => <option key={sit} value={sit}>{sit}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Fase / Etapa</label>
                    <input type="text" list="dl-fases" value={draftItem.fase || ''} onChange={(e) => handleDraftChange('fase', e.target.value)} className={inputClass} placeholder="Ex: Etapa 2" />
                  </div>
                  <div>
                    <label className={labelClass}>Prioridade</label>
                    <select value={draftItem.prioridade || ''} onChange={(e) => handleDraftChange('prioridade', e.target.value)} className={inputClass}>
                      <option value="">Normal</option>
                      <option value="Alta">Alta</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={labelClass}>Material</label>
                    <input type="text" list="dl-estCategorias" value={draftItem.material || ''} onChange={(e) => handleDraftChange('material', e.target.value)} className={inputClass} placeholder="Nome do Material..." />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className={labelClass}>Qtd Solicitada</label>
                      <input type="number" value={draftItem.quantidadeSolicitada || 0} onChange={(e) => handleDraftChange('quantidadeSolicitada', Number(e.target.value))} className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Qtd Entregue</label>
                      <input type="number" value={draftItem.quantidadeEntregue || 0} onChange={(e) => handleDraftChange('quantidadeEntregue', Number(e.target.value))} className={inputClass} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className={labelClass}>Data Pedido</label>
                      <input type="date" value={formatDateForInput(draftItem.dataPedido)} onChange={(e) => handleDraftChange('dataPedido', e.target.value)} className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Prazo Final</label>
                      <input type="date" value={formatDateForInput(draftItem.dataPrazo)} onChange={(e) => handleDraftChange('dataPrazo', e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {/* Bloco: Equipe & Contato */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 border-b border-dashed dark:border-gray-700 pb-2 mt-4 mb-2">
                    <h3 className="font-bold text-lg" style={{color: COLORS.teal}}>Equipe & Contato</h3>
                  </div>

                  <div>
                    <label className={labelClass}>Articulador</label>
                    <input type="text" list="dl-articuladores" value={draftItem.articulador || ''} onChange={(e) => handleDraftChange('articulador', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Liderança Responsável</label>
                    <input type="text" list="dl-liderancas" value={draftItem.lideranca || ''} onChange={(e) => handleDraftChange('lideranca', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Articulador Tem Carro?</label>
                    <select value={draftItem.temCarro || ''} onChange={(e) => handleDraftChange('temCarro', e.target.value)} className={inputClass}>
                      <option value="">Não Informado</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Telefone / WhatsApp</label>
                    <input type="text" value={draftItem.telefone || ''} onChange={(e) => handleDraftChange('telefone', e.target.value)} className={inputClass} placeholder="(48) 99999-9999" />
                  </div>

                  {/* Bloco: Localização */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 border-b border-dashed dark:border-gray-700 pb-2 mt-4 mb-2">
                    <h3 className="font-bold text-lg" style={{color: COLORS.mustard}}>Localização</h3>
                  </div>

                  <div>
                    <label className={labelClass}>Município</label>
                    <input type="text" list="dl-municipios" value={draftItem.municipio || ''} onChange={(e) => handleDraftChange('municipio', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Associação de Municípios</label>
                    <input type="text" list="dl-associacoes" value={draftItem.associacao || ''} onChange={(e) => handleDraftChange('associacao', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Região do Articulador</label>
                    <input type="text" list="dl-regioesArtic" value={draftItem.regiaoArticulador || ''} onChange={(e) => handleDraftChange('regiaoArticulador', e.target.value)} className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Região Floripa</label>
                    <input type="text" list="dl-regioesFloripa" value={draftItem.regiaoFloripa || ''} onChange={(e) => handleDraftChange('regiaoFloripa', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Distrito</label>
                    <input type="text" list="dl-distritos" value={draftItem.distrito || ''} onChange={(e) => handleDraftChange('distrito', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Bairro</label>
                    <input type="text" list="dl-bairros" value={draftItem.bairro || ''} onChange={(e) => handleDraftChange('bairro', e.target.value)} className={inputClass} />
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <label className={labelClass}>Endereço Completo</label>
                    <input type="text" value={draftItem.endereco || ''} onChange={(e) => handleDraftChange('endereco', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Link (Google Maps/Drive)</label>
                    <input type="url" value={draftItem.link || ''} onChange={(e) => handleDraftChange('link', e.target.value)} className={inputClass} placeholder="https://..." />
                  </div>

                  {/* Bloco: Observações */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
                    <label className={labelClass}>Observações</label>
                    <textarea rows="3" value={draftItem.observacao || ''} onChange={(e) => handleDraftChange('observacao', e.target.value)} className={`${inputClass} resize-y`} placeholder="Detalhes adicionais da entrega..." />
                  </div>

                </div>

                <div className="flex justify-end gap-4 border-t pt-6 dark:border-gray-700 bg-gray-50/50 dark:bg-black/10 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 rounded-b-xl">
                  <button onClick={attemptSave} disabled={!hasUnsavedChanges} className="px-8 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg w-full md:w-auto justify-center">
                    <Icons.Save /> Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {/* View: Editor / Formulário ESTOQUE */}
            {viewMode === 'editEstoque' && draftItem && (
               <div className={`p-6 md:p-8 rounded-xl shadow-xl ${cardClass} animate-in fade-in`}>
                 <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
                   <h2 className="text-2xl font-black flex items-center gap-3">
                     <Icons.Package /> {draftItem.__rowIndex !== -1 ? 'Editando Item do Estoque' : 'Novo Item de Estoque'}
                   </h2>
                   <button onClick={() => handleNavigate('estoque')} className="text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
                     <Icons.X /> Cancelar
                   </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className={labelClass}>Categoria do Material</label>
                        <input type="text" list="dl-estCategorias" value={draftItem['Categoria'] || ''} onChange={(e) => handleDraftChange('Categoria', e.target.value)} className={inputClass} placeholder="Ex: Panfletos, Adesivos..." />
                    </div>
                    <div>
                        <label className={labelClass}>Formato / Tipo</label>
                        <input type="text" list="dl-estFormatos" value={draftItem['Formato'] || ''} onChange={(e) => handleDraftChange('Formato', e.target.value)} className={inputClass} placeholder="Ex: A5, Praguinha..." />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Link do Material Finalizado (Drive/Pasta)</label>
                        <input type="url" value={draftItem['Link do material finalizado'] || ''} onChange={(e) => handleDraftChange('Link do material finalizado', e.target.value)} className={inputClass} placeholder="https://..." />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Descrição / Especificações</label>
                        <textarea rows="2" value={draftItem['Descrição / Especificações'] || ''} onChange={(e) => handleDraftChange('Descrição / Especificações', e.target.value)} className={`${inputClass} resize-y`} placeholder="Detalhes do material..." />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Observações / Acabamento</label>
                        <input type="text" value={draftItem['Observações / Acabamento'] || ''} onChange={(e) => handleDraftChange('Observações / Acabamento', e.target.value)} className={inputClass} placeholder="Ex: Verniz localizado, couché..." />
                    </div>

                    <div>
                        <label className={labelClass}>Quantidade (Número)</label>
                        <input type="number" value={draftItem._qtdNumber || ''} onChange={(e) => handleDraftChange('_qtdNumber', e.target.value)} className={inputClass} placeholder="Ex: 5000" />
                    </div>
                    <div>
                        <label className={labelClass}>Unidade de Medida</label>
                        <input type="text" list="dl-unidades" value={draftItem._qtdUnit || ''} onChange={(e) => handleDraftChange('_qtdUnit', e.target.value)} className={inputClass} placeholder="unidades, caixas, pacotes..." />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Observação Geral do Estoque</label>
                        <textarea rows="2" value={draftItem['Observação'] || ''} onChange={(e) => handleDraftChange('Observação', e.target.value)} className={`${inputClass} resize-y`} placeholder="..." />
                    </div>
                 </div>

                 <div className="flex justify-end gap-4 border-t pt-6 dark:border-gray-700 bg-gray-50/50 dark:bg-black/10 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 rounded-b-xl">
                  <button onClick={attemptSave} disabled={!hasUnsavedChanges} className="px-8 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg w-full md:w-auto justify-center">
                    <Icons.Save /> Salvar Estoque
                  </button>
                </div>
               </div>
            )}

            {/* View: Lista TABULUM */}
            {viewMode === 'list' && (
              <div className={`rounded-xl shadow-sm border overflow-hidden animate-in fade-in ${cardClass}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className={`bg-black/5 dark:bg-white/5 border-b ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <tr>
                        {['Ações', 'Articulador', 'Liderança', 'Local', 'Material', 'Qtd', 'Situação'].map((col, i) => {
                          const keys = ['acoes', 'articulador', 'lideranca', 'municipio', 'material', 'quantidadeSolicitada', 'situacao'];
                          return (
                            <th key={col} className={`p-4 font-bold text-sm ${keys[i] !== 'acoes' ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors' : ''}`} onClick={() => keys[i] !== 'acoes' && handleSort(keys[i])}>
                              {col} {sortConfig.key === keys[i] && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((row) => (
                        <tr key={row.id} className={`border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${theme==='dark'?'border-gray-800':'border-gray-100'}`}>
                          <td className="p-4">
                             <button onClick={() => startEditing(row)} className="p-2 rounded hover:bg-blue-100 text-blue-600 dark:hover:bg-blue-900 dark:text-blue-300 transition-colors tooltip" title="Editar Registro">
                               <Icons.Edit />
                             </button>
                          </td>
                          <td className="p-4 cursor-pointer font-medium hover:text-teal-500" onClick={() => handleNavigate('detail', { tipo: 'articulador', valor: row.articulador })}>{row.articulador}</td>
                          <td className="p-4 cursor-pointer hover:text-teal-500" onClick={() => handleNavigate('detail', { tipo: 'lideranca', valor: row.lideranca })}>{row.lideranca}</td>
                          <td className="p-4 cursor-pointer hover:text-teal-500" onClick={() => handleNavigate('detail', { tipo: 'bairro', valor: row.bairro || row.municipio })}>
                            {row.municipio} {row.bairro && <span className="text-xs opacity-60 block">{row.bairro}</span>}
                          </td>
                          <td className="p-4">{row.material}</td>
                          <td className="p-4 font-mono text-sm">{row.quantidadeEntregue || 0}/{row.quantidadeSolicitada || 0}</td>
                          <td className="p-4 cursor-pointer" onClick={() => handleNavigate('detail', { tipo: 'situacao', valor: row.situacao })}>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              row.situacao === 'ENTREGUE' ? 'bg-green-100 text-green-800' :
                              row.situacao === 'ENTREGUE PARCIAL' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {row.situacao}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center p-4 gap-4 bg-black/5 dark:bg-white/5">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30">
                      <Icons.ChevronLeft />
                    </button>
                    <span className="font-bold text-sm">Pág. {currentPage} de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30">
                      <Icons.ChevronRight />
                    </button>
                  </div>
                )}
                {filteredData.length === 0 && <div className="p-8 text-center opacity-50">Nenhum dado encontrado.</div>}
              </div>
            )}

            {/* View: Cards TABULUM */}
            {viewMode === 'cards' && (
              <div className="animate-in fade-in">
                <div className="flex justify-end mb-4">
                  <select onChange={(e) => handleSort(e.target.value)} className={`p-2 text-sm rounded border outline-none ${cardClass}`}>
                    <option value="dataPrazo">Ordenar por: Prazo</option>
                    <option value="lideranca">Ordenar por: Liderança</option>
                    <option value="municipio">Ordenar por: Município</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {paginatedData.map((card) => (
                    <div key={card.id} className={`p-6 rounded-xl border shadow-sm relative group ${cardClass}`} style={{ borderTopWidth: '4px', borderTopColor: card.situacao === 'ENTREGUE' ? COLORS.teal : card.situacao === 'A ENTREGAR' ? COLORS.crimson : COLORS.mustard }}>
                      
                      <div className="absolute top-4 right-4 flex gap-2">
                        {card.prioridade === 'Alta' && <span className="text-red-500 animate-pulse mt-2" title="Prioridade Alta"><Icons.Alert /></span>}
                        <button onClick={() => startEditing(card)} className="p-2 rounded bg-black/5 hover:bg-blue-100 text-blue-600 dark:bg-white/5 dark:hover:bg-blue-900 transition-colors">
                          <Icons.Edit />
                        </button>
                      </div>

                      <div className="mb-4 pr-16">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1 block">{card.fase}</span>
                        <h3 className="text-xl font-black mb-1 cursor-pointer hover:underline text-blue-500" onClick={() => handleNavigate('detail', { tipo: 'lideranca', valor: card.lideranca })}>
                          Lid: {card.lideranca}
                        </h3>
                        <p className="text-sm opacity-80 cursor-pointer hover:underline flex items-center gap-1" onClick={() => handleNavigate('detail', { tipo: 'articulador', valor: card.articulador })}>
                          <Icons.User /> Artic: {card.articulador} {card.temCarro === 'Sim' && '(🚗)'}
                        </p>
                      </div>

                      <div className={`p-3 rounded-lg mb-4 text-sm ${theme === 'dark' ? 'bg-black/30' : 'bg-gray-50'}`}>
                        <p className="font-bold flex items-center justify-between mb-1">
                          <span>{card.material}</span>
                          <span className="font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">{card.quantidadeEntregue || 0}/{card.quantidadeSolicitada || 0}</span>
                        </p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div className="h-1.5 rounded-full" style={{ 
                            width: `${Math.min(100, ((card.quantidadeEntregue||0) / Math.max(1, card.quantidadeSolicitada||1)) * 100)}%`,
                            backgroundColor: card.situacao === 'ENTREGUE' ? COLORS.teal : COLORS.mustard
                          }}></div>
                        </div>
                      </div>

                      <div className="text-sm space-y-2 opacity-80">
                        <p className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => handleNavigate('detail', { tipo: 'bairro', valor: card.bairro || card.municipio })}>
                          <Icons.MapPin /> {card.municipio} {card.bairro ? `- ${card.bairro}` : ''}
                        </p>
                        <p className="flex items-center gap-2">
                          <Icons.Calendar /> Prazo: {card.dataPrazo ? new Date(card.dataPrazo).toLocaleDateString('pt-BR') : 'Não definido'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 gap-4">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 disabled:opacity-30">
                      <Icons.ChevronLeft />
                    </button>
                    <span className="font-bold text-sm">Página {currentPage} de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 disabled:opacity-30">
                      <Icons.ChevronRight />
                    </button>
                  </div>
                )}
                {filteredData.length === 0 && <div className="p-8 text-center opacity-50">Nenhum card encontrado.</div>}
              </div>
            )}

            {/* View: Mapa (Google Maps Embed) */}
            {viewMode === 'map' && (
              <div className={`rounded-xl shadow-sm border p-4 flex flex-col h-[70vh] ${cardClass} animate-in fade-in`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icons.Map /> Mapa Estratégico {floripaMode === 'only' ? '(Florianópolis)' : ''}
                </h3>
                <div className="flex-1 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 relative">
                  <iframe 
                    title="Mapa"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(getMapQuery())}&t=&z=${floripaMode === 'only'?13:9}&ie=UTF8&iwloc=&output=embed`}>
                  </iframe>
                </div>
              </div>
            )}

            {/* View: ESTOQUE */}
            {viewMode === 'estoque' && (
              <div className={`rounded-xl shadow-sm border overflow-hidden animate-in fade-in ${cardClass}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className={`bg-teal-50 dark:bg-teal-900/20 border-b ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <tr>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Ações</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Categoria</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Formato</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Qtd Total</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Descrição</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Acabamento</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Observação</th>
                        <th className="p-4 font-bold text-sm text-teal-700 dark:text-teal-400">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estoque.map((item, i) => (
                        <tr key={item.__rowIndex || i} className={`border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${theme==='dark'?'border-gray-800':'border-gray-100'}`}>
                          <td className="p-4">
                             <button onClick={() => startEditingEstoque(item)} className="p-2 rounded hover:bg-teal-100 text-teal-600 dark:hover:bg-teal-900 dark:text-teal-300 transition-colors tooltip" title="Editar Estoque">
                               <Icons.Edit />
                             </button>
                          </td>
                          <td className="p-4 font-bold">{item['Categoria'] || '-'}</td>
                          <td className="p-4">{item['Formato'] || '-'}</td>
                          <td className="p-4 font-mono font-bold bg-teal-50/50 dark:bg-teal-900/10 text-teal-800 dark:text-teal-200">{item['Quantidade Total'] || 0}</td>
                          <td className="p-4 text-sm opacity-80 whitespace-normal min-w-[200px]">{item['Descrição / Especificações'] || '-'}</td>
                          <td className="p-4 text-sm opacity-80 whitespace-normal min-w-[150px]">{item['Observações / Acabamento'] || '-'}</td>
                          <td className="p-4 text-sm opacity-80 whitespace-normal min-w-[150px]">{item['Observação'] || '-'}</td>
                          <td className="p-4 text-sm">
                              {item['Link do material finalizado'] ? 
                                <a href={item['Link do material finalizado']} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline"><Icons.Link /> Abrir</a> 
                                : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {estoque.length === 0 && <div className="p-8 text-center opacity-50">Nenhum dado de estoque encontrado.</div>}
              </div>
            )}

            {/* View: Ficha Detalhada */}
            {viewMode === 'detail' && activeDetail && (
              <FichaDetalhada 
                tipo={activeDetail.tipo} valor={activeDetail.valor} 
                data={data} theme={theme}
                onClose={() => handleNavigate('list')}
                onFilterClick={(t, v) => handleNavigate('detail', { tipo: t, valor: v })}
              />
            )}

            {/* View: Dashboard (Resumo) */}
            {viewMode === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Solicitado', value: filteredData.reduce((acc, curr) => acc + (Number(curr.quantidadeSolicitada) || 0), 0), color: COLORS.mustard, icon: Icons.Package },
                    { label: 'Total Entregue', value: filteredData.reduce((acc, curr) => acc + (Number(curr.quantidadeEntregue) || 0), 0), color: COLORS.teal, icon: Icons.MapPin },
                    { label: 'Pendentes', value: filteredData.filter(d => d.situacao !== 'ENTREGUE').length, color: COLORS.crimson, icon: Icons.Alert },
                    { label: 'Articuladores', value: new Set(filteredData.map(d => d.articulador)).size, color: '#4A90E2', icon: Icons.User },
                  ].map((kpi, i) => (
                    <div key={i} className={`p-6 rounded-xl border-t-4 shadow-sm ${cardClass}`} style={{ borderColor: kpi.color }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold opacity-60 uppercase">{kpi.label}</p>
                          <h3 className="text-3xl font-black mt-2">{kpi.value.toLocaleString()}</h3>
                        </div>
                        <div style={{ color: kpi.color }}><kpi.icon /></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`p-6 rounded-xl shadow-sm border ${cardClass}`}>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">📍 Visão Geral de Entregas por Local</h3>
                  <div className="space-y-4">
                    {getFilterOptions('municipio').map(mun => {
                      const percent = mun.total > 0 ? (mun.entregue / mun.total) * 100 : 0;
                      return (
                        <div key={mun.name} className="flex flex-col gap-1">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="cursor-pointer hover:underline text-blue-500" onClick={() => handleNavigate('detail', { tipo: 'municipio', valor: mun.name })}>{mun.name}</span>
                            <span>{mun.entregue} / {mun.total} entregues</span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, percent)}%`, backgroundColor: percent === 100 ? COLORS.teal : COLORS.mustard }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
