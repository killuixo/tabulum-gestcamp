import React, { useState, useMemo, useEffect } from 'react';// Constantes de Cores (Estilo Mondrian Suave)const COLORS = {mustard: '#E5B13A',crimson: '#D93846',teal: '#2A9D8F',darkBg: '#1E1E1E',lightBg: '#F4F1EA',darkCard: '#2C2C2C',lightCard: '#FFFFFF',textDark: '#F4F1EA',textLight: '#2C2C2C'};// Ícones SVG Nativosconst Icons = {Dashboard: () => ,List: () => ,Grid: () => ,Map: () => ,Moon: () => ,Sun: () => ,Filter: () => ,Package: () => ,MapPin: () => ,Alert: () => ,User: () => ,ChevronLeft: () => ,ChevronRight: () => ,Phone: () => ,Calendar: () => ,Edit: () => ,Save: () => ,X: () => ,Check: () => ,Loader: () => ()};const METADATA = {situacoes: ['A ENTREGAR', 'ENTREGUE PARCIAL', 'ENTREGUE'],materiais: ['Santinhos', 'Santão', 'Furadinhos Bola', 'Furadinhos Retangular', 'Praguinha', 'Adesivo de Carro', 'Bandeira']};const FichaDetalhada = ({ tipo, valor, data, onClose, theme, onFilterClick }) => {const bgColor = theme === 'dark' ? 'bg-[#2C2C2C]' : 'bg-white';const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';const dadosFiltrados = data.filter(item => {if (tipo === 'articulador') return item.articulador === valor;if (tipo === 'lideranca') return item.lideranca === valor;if (tipo === 'municipio') return item.municipio === valor;if (tipo === 'situacao') return item.situacao === valor;if (tipo === 'regiao') return item.regiaoArticulador === valor || item.regiaoFloripa === valor;if (tipo === 'bairro') return item.bairro === valor;return false;});const totalSolicitado = dadosFiltrados.reduce((acc, curr) => acc + (Number(curr.quantidadeSolicitada) || 0), 0);const totalEntregue = dadosFiltrados.reduce((acc, curr) => acc + (Number(curr.quantidadeEntregue) || 0), 0);return (<div className={p-6 rounded-xl shadow-xl ${bgColor} ${textColor} border-l-8} style={{ borderColor: COLORS.teal }}>Ficha Completa: {tipo}<h1 className="text-3xl font-bold" style={{ color: COLORS.mustard }}>{valor}<Icons.ChevronLeft /> Voltar  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
);};export default function App() {// Estados Globaisconst [theme, setTheme] = useState('light');const [dataStatus, setDataStatus] = useState('loading');const [data, setData] = useState([]);const [estoque, setEstoque] = useState([]); // Guardamos o estoque caso precise no futuroconst [viewMode, setViewMode] = useState('dashboard');const [activeDetail, setActiveDetail] = useState(null);const [currentPage, setCurrentPage] = useState(1);const itemsPerPage = 6;const [sortConfig, setSortConfig] = useState({ key: 'dataPrazo', direction: 'asc' });// Estados de Ediçãoconst [editingItem, setEditingItem] = useState(null);const [draftItem, setDraftItem] = useState(null);const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);const [pendingNavigation, setPendingNavigation] = useState(null);const [showConfirmModal, setShowConfirmModal] = useState(false);const [showUnsavedModal, setShowUnsavedModal] = useState(false);const [toastMessage, setToastMessage] = useState('');const [filters, setFilters] = useState({articulador: [], municipio: [], associacao: [], regiaoArticulador: [],situacao: [], bairro: [], regiaoFloripa: [], distrito: [], fase: []});useEffect(() => {const fetchData = async () => {setDataStatus('loading');try {const apiUrl = import.meta.env?.VITE_SHEETS_API_URL;    if (!apiUrl) {
      throw new Error("URL da planilha não configurada no ambiente.");
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Falha na comunicação com a planilha.");
    }
    
    const result = await response.json();
    
    // CORREÇÃO AQUI: O Apps Script agora retorna um objeto { entregas: [], estoque: [] }
    if (result && result.entregas && Array.isArray(result.entregas)) {
      setData(result.entregas);
      setEstoque(result.estoque || []);
      setDataStatus('success');
    } else if (Array.isArray(result)) {
       // Fallback de segurança se voltar ao script antigo
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
}, []);useEffect(() => {document.body.style.backgroundColor = theme === 'dark' ? COLORS.darkBg : COLORS.lightBg;document.body.style.color = theme === 'dark' ? COLORS.textDark : COLORS.textLight;}, [theme]);const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');const handleNavigate = (newView, detail = null) => {if (hasUnsavedChanges) {setPendingNavigation({ view: newView, detail });setShowUnsavedModal(true);} else {executeNavigation(newView, detail);}};const executeNavigation = (newView, detail) => {setViewMode(newView);setActiveDetail(detail);setEditingItem(null);setDraftItem(null);setHasUnsavedChanges(false);setPendingNavigation(null);};const startEditing = (item) => {setEditingItem(item);setDraftItem({ ...item });setHasUnsavedChanges(false);setViewMode('edit');};const handleDraftChange = (field, value) => {setDraftItem(prev => ({ ...prev, [field]: value }));setHasUnsavedChanges(true);};const attemptSave = () => {setShowUnsavedModal(false);setShowConfirmModal(true);};const discardChangesAndNavigate = () => {setShowUnsavedModal(false);if (pendingNavigation) {executeNavigation(pendingNavigation.view, pendingNavigation.detail);} else {setEditingItem(null);setDraftItem(null);setHasUnsavedChanges(false);setViewMode('list');}};const confirmSave = async () => {try {const apiUrl = import.meta.env?.VITE_SHEETS_API_URL;if (!apiUrl) throw new Error("URL da planilha não configurada.");  setData(prev => prev.map(item => item.id === draftItem.id ? draftItem : item));
  setShowConfirmModal(false);
  setHasUnsavedChanges(false);
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(draftItem)
  });

  if (!response.ok) throw new Error("Erro ao salvar na planilha");

  setToastMessage('Alterações salvas com sucesso!');
  setTimeout(() => setToastMessage(''), 3000);

  if (pendingNavigation) {
    executeNavigation(pendingNavigation.view, pendingNavigation.detail);
  } else {
    executeNavigation('list', null);
  }

} catch (error) {
  console.error("Erro no salvamento:", error);
  alert("Houve um erro ao tentar salvar as alterações na planilha.");
}
};const handleFilterChange = (category, value) => {setFilters(prev => {const isSelected = prev[category].includes(value);return {...prev,[category]: isSelected? prev[category].filter(item => item !== value): [...prev[category], value]};});setCurrentPage(1);};const clearFilters = () => {setFilters({ articulador: [], municipio: [], associacao: [], regiaoArticulador: [], situacao: [], bairro: [], regiaoFloripa: [], distrito: [], fase: [] });};const filteredData = useMemo(() => {return data.filter(item => {return Object.entries(filters).every(([key, selectedValues]) => {if (selectedValues.length === 0) return true;if (!item[key]) return false;return selectedValues.includes(item[key]);});}).sort((a, b) => {if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;return 0;});}, [data, filters, sortConfig]);const getFilterOptions = (category) => {const options = {};data.forEach(item => {if (['bairro', 'regiaoFloripa', 'distrito'].includes(category)) {if (item.municipio !== 'Florianópolis') return;}const val = item[category];if (val) {if (!options[val]) options[val] = { entregue: 0, total: 0 };options[val].entregue += Number(item.quantidadeEntregue) || 0;options[val].total += Number(item.quantidadeSolicitada) || 0;}});return Object.entries(options).map(([name, stats]) => ({ name, ...stats })).sort((a, b) => a.name.localeCompare(b.name));};const handleSort = (key) => {let direction = 'asc';if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';setSortConfig({ key, direction });};const formatDateForInput = (isoString) => {if (!isoString) return '';try {return new Date(isoString).toISOString().split('T')[0];} catch {return isoString.split('T')[0];}};const bgClass = theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-[#F4F1EA]';const cardClass = theme === 'dark' ? 'bg-[#2C2C2C] border-gray-700' : 'bg-white border-gray-200';const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';const inputClass = w-full p-2.5 text-sm rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-[#333] border-gray-600 focus:border-teal-500' : 'bg-white border-gray-300 focus:border-teal-500'};const labelClass = "block text-[10px] font-bold uppercase opacity-70 mb-1 tracking-wider";const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);const totalPages = Math.ceil(filteredData.length / itemsPerPage);const getMapQuery = () => {if (filters.bairro.length > 0) return ${filters.bairro[0]}, Florianópolis, SC, Brasil;if (filters.municipio.length > 0) return ${filters.municipio[0]}, SC, Brasil;return 'Santa Catarina, Brasil';};const renderModals = () => {return (<>{showUnsavedModal && (<div className={p-6 rounded-xl shadow-2xl max-w-sm w-full ${cardClass} animate-in fade-in zoom-in-95}><Icons.Alert /> Atenção!Você fez alterações neste registro que ainda não foram salvas. O que deseja fazer?<Icons.Save /> Revisar e Salvar<Icons.X /> Descartar Alterações<button onClick={() => setShowUnsavedModal(false)} className="w-full py-2 text-sm opacity-60 hover:opacity-100 transition-opacity">Cancelar e continuar editando)}    {showConfirmModal && draftItem && editingItem && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
        <div className={`p-6 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${cardClass} animate-in fade-in zoom-in-95`}>
          <h3 className="text-xl font-black mb-4 border-b pb-2" style={{ borderColor: COLORS.mustard }}>Confirmar Alterações</h3>
          <p className="mb-4 text-sm opacity-80">Por favor, revise as alterações que você está prestes a salvar.</p>
          
          <div className="space-y-3 mb-6 bg-black/5 dark:bg-white/5 p-4 rounded-lg">
            {Object.keys(draftItem).filter(k => draftItem[k] !== editingItem[k]).map(key => (
              <div key={key} className="flex flex-col text-sm border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                <span className="font-bold uppercase text-[10px] opacity-50">{key}</span>
                <div className="flex items-center gap-2 mt-1 break-all">
                  <span className="line-through text-red-500 opacity-70">{editingItem[key] || '(vazio)'}</span>
                  <Icons.ChevronRight />
                  <span className="font-bold text-green-600 dark:text-green-400">{draftItem[key] || '(vazio)'}</span>
                </div>
              </div>
            ))}
            {Object.keys(draftItem).filter(k => draftItem[k] !== editingItem[k]).length === 0 && (
              <p className="text-center opacity-50 text-sm py-4">Nenhuma alteração detectada.</p>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={confirmSave} 
              disabled={Object.keys(draftItem).filter(k => draftItem[k] !== editingItem[k]).length === 0}
              className="flex-1 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
            >
              <Icons.Check /> Confirmar Salvar
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
};return (<div className={min-h-screen flex flex-col md:flex-row font-sans ${bgClass} ${textClass}}>{renderModals()}  <aside className={`w-full md:w-80 p-6 border-r flex-shrink-0 overflow-y-auto h-screen sticky top-0 ${theme === 'dark' ? 'border-gray-800 bg-[#1A1A1A]' : 'border-gray-300 bg-[#EFEBE1]'}`}>
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

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold flex items-center gap-2"><Icons.Filter /> Filtros Globais</h2>
        <button onClick={clearFilters} className="text-xs underline text-gray-500 hover:text-red-500">Limpar Tudo</button>
      </div>

      {[
        { id: 'situacao', label: 'Situação', color: COLORS.mustard },
        { id: 'fase', label: 'Fase/Prazo', color: COLORS.teal },
        { id: 'articulador', label: 'Articulador', color: COLORS.crimson },
        { id: 'municipio', label: 'Município', color: COLORS.mustard },
        { id: 'associacao', label: 'Assoc. de Municípios', color: COLORS.teal },
        { id: 'regiaoArticulador', label: 'Região Geral', color: COLORS.crimson }
      ].map(filterGroup => (
        <div key={filterGroup.id} className="border-l-4 pl-3" style={{ borderColor: filterGroup.color }}>
          <h3 className="font-bold text-sm mb-2 uppercase opacity-80">{filterGroup.label}</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {getFilterOptions(filterGroup.id).map(opt => (
              <label key={opt.name} className="flex items-center justify-between group cursor-pointer text-sm">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters[filterGroup.id].includes(opt.name)}
                    onChange={() => handleFilterChange(filterGroup.id, opt.name)}
                    className="rounded border-gray-400 text-teal-600 focus:ring-teal-500 bg-transparent"
                  />
                  <span className="group-hover:text-teal-500 transition-colors">{opt.name}</span>
                </div>
                <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-md font-mono">
                  {opt.entregue}/{opt.total}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {(filters.municipio.includes('Florianópolis') || filters.municipio.length === 0) && (
        <div className="mt-6 p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-dashed border-gray-400">
          <h3 className="font-bold text-sm mb-4 text-center">📍 Filtros Locais - Floripa</h3>
          {['regiaoFloripa', 'distrito', 'bairro'].map(filterId => (
            <div key={filterId} className="mb-4 last:mb-0">
              <h4 className="text-xs font-bold uppercase mb-1 opacity-70">{filterId.replace('Floripa', '')}</h4>
              <select 
                className={`w-full p-2 text-sm rounded border outline-none ${theme === 'dark' ? 'bg-[#333] border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                onChange={(e) => {
                  if(e.target.value) handleFilterChange(filterId, e.target.value);
                }}
                value=""
              >
                <option value="">Filtrar {filterId}...</option>
                {getFilterOptions(filterId).filter(opt => !filters[filterId].includes(opt.name)).map(opt => (
                  <option key={opt.name} value={opt.name}>{opt.name} ({opt.entregue}/{opt.total})</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-1 mt-2">
                {filters[filterId].map(val => (
                  <span key={val} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                    {val} <button onClick={() => handleFilterChange(filterId, val)}>×</button>
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
    
    <div className="flex flex-wrap gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 justify-between items-center">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => handleNavigate('dashboard')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'dashboard' ? 'bg-[#2A9D8F] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
          <Icons.Dashboard /> Resumo
        </button>
        <button onClick={() => handleNavigate('map')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'map' ? 'bg-[#E5B13A] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
          <Icons.Map /> Mapa
        </button>
        <button onClick={() => handleNavigate('list')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-[#D93846] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
          <Icons.List /> Lista Completa
        </button>
        <button onClick={() => handleNavigate('cards')} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'cards' ? 'bg-[#1E1E1E] text-white shadow-md border border-gray-600' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
          <Icons.Grid /> Cards
        </button>
      </div>
      <div className="text-sm font-medium bg-black/10 dark:bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
         Mostrando {filteredData.length} registros
      </div>
    </div>

    {dataStatus === 'loading' && (
      <div className="flex flex-col items-center justify-center h-64 opacity-80 animate-in fade-in">
        <div className="mb-4 text-teal-500 scale-150"><Icons.Loader /></div>
        <h2 className="text-xl font-bold mb-2">Sincronizando...</h2>
        <p>Baixando informações da Planilha Google.</p>
      </div>
    )}

    {dataStatus === 'error' && (
      <div className={`p-6 rounded-xl border-l-4 border-red-500 shadow-md ${cardClass} flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95`}>
        <div className="text-red-500 mb-4 scale-150"><Icons.Alert /></div>
        <h2 className="text-2xl font-black mb-2" style={{ color: COLORS.crimson }}>Planilha Não Carregada</h2>
        <p className="opacity-70 max-w-md mb-8">Não foi possível sincronizar os dados. A integração com o Google Sheets ainda não foi configurada no Vercel ou ocorreu um problema de conexão.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-lg font-bold bg-[#2A9D8F] text-white hover:bg-[#21867a] transition-colors flex items-center gap-2 shadow-lg">
          <Icons.Loader /> Tentar Sincronizar Novamente
        </button>
      </div>
    )}

    {dataStatus === 'success' && (
      <>
        {/* NOVO FORMULÁRIO COM TODOS OS CAMPOS DA PLANILHA */}
        {viewMode === 'edit' && draftItem && (
          <div className={`p-6 md:p-8 rounded-xl shadow-xl ${cardClass} animate-in fade-in`}>
            <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Icons.Edit /> Editando Registro: <span className="text-teal-500">#{draftItem.id}</span>
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
                <input type="text" value={draftItem.fase || ''} onChange={(e) => handleDraftChange('fase', e.target.value)} className={inputClass} placeholder="Ex: Etapa 2" />
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
                <select value={draftItem.material || ''} onChange={(e) => handleDraftChange('material', e.target.value)} className={inputClass}>
                   <option value="">Selecione o material...</option>
                  {METADATA.materiais.map(m => <option key={m} value={m}>{m}</option>)}
                  {/* Permite que materiais que não estão na lista padrão também apareçam */}
                  {draftItem.material && !METADATA.materiais.includes(draftItem.material) && (
                    <option value={draftItem.material}>{draftItem.material} (Customizado)</option>
                  )}
                </select>
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
                  <label className={labelClass}>Data do Pedido</label>
                  <input type="date" value={formatDateForInput(draftItem.dataPedido)} onChange={(e) => handleDraftChange('dataPedido', e.target.value)} className={inputClass} />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Data de Prazo</label>
                  <input type="date" value={formatDateForInput(draftItem.dataPrazo)} onChange={(e) => handleDraftChange('dataPrazo', e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* Bloco: Equipe & Contato */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 border-b border-dashed dark:border-gray-700 pb-2 mt-4 mb-2">
                <h3 className="font-bold text-lg" style={{color: COLORS.teal}}>Equipe & Contato</h3>
              </div>

              <div>
                <label className={labelClass}>Articulador</label>
                <input type="text" value={draftItem.articulador || ''} onChange={(e) => handleDraftChange('articulador', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Liderança Responsável</label>
                <input type="text" value={draftItem.lideranca || ''} onChange={(e) => handleDraftChange('lideranca', e.target.value)} className={inputClass} />
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
                <input type="text" value={draftItem.municipio || ''} onChange={(e) => handleDraftChange('municipio', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Associação de Municípios</label>
                <input type="text" value={draftItem.associacao || ''} onChange={(e) => handleDraftChange('associacao', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Região do Articulador (Geral)</label>
                <input type="text" value={draftItem.regiaoArticulador || ''} onChange={(e) => handleDraftChange('regiaoArticulador', e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Região Floripa</label>
                <input type="text" value={draftItem.regiaoFloripa || ''} onChange={(e) => handleDraftChange('regiaoFloripa', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Distrito</label>
                <input type="text" value={draftItem.distrito || ''} onChange={(e) => handleDraftChange('distrito', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bairro</label>
                <input type="text" value={draftItem.bairro || ''} onChange={(e) => handleDraftChange('bairro', e.target.value)} className={inputClass} />
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
                <Icons.Save /> Salvar Alterações na Planilha
              </button>
            </div>
          </div>
        )}

        {/* View: Ficha Detalhada */}
        {viewMode === 'detail' && activeDetail && (
          <FichaDetalhada 
            tipo={activeDetail.tipo} valor={activeDetail.valor} 
            data={data} theme={theme}
            onClose={() => handleNavigate('dashboard')}
            onFilterClick={(t, v) => handleNavigate('detail', { tipo: t, valor: v })}
          />
        )}

        {/* View: Dashboard */}
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

        {/* View: Mapa (Google Maps Embed) */}
        {viewMode === 'map' && (
          <div className={`rounded-xl shadow-sm border p-4 flex flex-col h-[70vh] ${cardClass} animate-in fade-in`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icons.Map /> Mapa da Região Selecionada
            </h3>
            <div className="flex-1 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 relative">
              <iframe 
                title="Mapa"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(getMapQuery())}&t=&z=12&ie=UTF8&iwloc=&output=embed`}>
              </iframe>
            </div>
          </div>
        )}

        {/* View: Lista */}
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
                  {filteredData.map((row) => (
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
                      <td className="p-4 font-mono text-sm">{row.quantidadeEntregue}/{row.quantidadeSolicitada}</td>
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
            {filteredData.length === 0 && <div className="p-8 text-center opacity-50">Nenhum dado encontrado.</div>}
          </div>
        )}

        {/* View: Cards */}
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
                      <span className="font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">{card.quantidadeEntregue}/{card.quantidadeSolicitada}</span>
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                      <div className="h-1.5 rounded-full" style={{ 
                        width: `${Math.min(100, (card.quantidadeEntregue / Math.max(1, card.quantidadeSolicitada)) * 100)}%`,
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
      </>
    )}
  </main>
</div>
);}
