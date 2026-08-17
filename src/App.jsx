import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Search, Filter, Moon, Sun, LayoutDashboard, List, Map, LayoutGrid, 
  ChevronLeft, ChevronRight, User, MapPin, Package, Calendar, Phone, Mail, AlertCircle, ArrowUpRight
} from 'lucide-react';

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

// Dados baseados nas mensagens de WhatsApp e estrutura solicitada
const mockData = [
  { id: 1, articulador: 'Laura', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Juventude', lideranca: 'Comitê Central', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Santinhos', quantidadeSolicitada: 5000, quantidadeEntregue: 3000, situacao: 'ENTREGUE PARCIAL', endereco: 'Rua Central, 10', telefone: '4891277845', email: 'laura@campanha.com', observacao: 'Falta entregar o restante', fase: 'Fase 1', dataPrazo: '2026-08-20', prioridade: 'Alta' },
  { id: 2, articulador: 'Laura', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Juventude', lideranca: 'Comitê Central', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Furadinhos Bola', quantidadeSolicitada: 50, quantidadeEntregue: 20, situacao: 'ENTREGUE PARCIAL', endereco: 'Rua Central, 10', telefone: '4891277845', email: 'laura@campanha.com', observacao: '', fase: 'Fase 1', dataPrazo: '2026-08-20', prioridade: 'Alta' },
  { id: 3, articulador: 'Laura', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Juventude', lideranca: 'Comitê Central', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Furadinhos Retangular', quantidadeSolicitada: 10, quantidadeEntregue: 10, situacao: 'ENTREGUE', endereco: 'Rua Central, 10', telefone: '4891277845', email: 'laura@campanha.com', observacao: '', fase: 'Fase 1', dataPrazo: '2026-08-20', prioridade: 'Baixa' },
  { id: 4, articulador: 'Laura', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Juventude', lideranca: 'Comitê Central', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Santão', quantidadeSolicitada: 3000, quantidadeEntregue: 2198, situacao: 'ENTREGUE PARCIAL', endereco: 'Rua Central, 10', telefone: '4891277845', email: 'laura@campanha.com', observacao: '', fase: 'Fase 1', dataPrazo: '2026-08-20', prioridade: 'Alta' },
  { id: 5, articulador: 'Liandra', temCarro: 'Não', regiaoArticulador: 'Norte da Ilha', tema: 'Mulheres', lideranca: 'Associação Bairro', municipio: 'Florianópolis', bairro: 'Canasvieiras', regiaoFloripa: 'Norte', distrito: 'Canasvieiras', associacao: 'GRANFPOLIS', material: 'Santão', quantidadeSolicitada: 2, quantidadeEntregue: 2, situacao: 'ENTREGUE', endereco: 'Av. das Nações', telefone: '4899999999', email: 'liandra@email.com', observacao: '', fase: 'Fase 1', dataPrazo: '2026-08-22', prioridade: 'Média' },
  { id: 6, articulador: 'Liandra', temCarro: 'Não', regiaoArticulador: 'Norte da Ilha', tema: 'Mulheres', lideranca: 'Associação Bairro', municipio: 'Florianópolis', bairro: 'Canasvieiras', regiaoFloripa: 'Norte', distrito: 'Canasvieiras', associacao: 'GRANFPOLIS', material: 'Santinhos', quantidadeSolicitada: 6, quantidadeEntregue: 6, situacao: 'ENTREGUE', endereco: 'Av. das Nações', telefone: '4899999999', email: '', observacao: '', fase: 'Fase 1', dataPrazo: '2026-08-22', prioridade: 'Média' },
  { id: 7, articulador: 'Carlos Aguiar', temCarro: 'Sim', regiaoArticulador: 'Continente', tema: 'Logística', lideranca: 'Toninho', municipio: 'Florianópolis', bairro: 'Coqueiros', regiaoFloripa: 'Continente', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Furadinhos Retangular', quantidadeSolicitada: 20, quantidadeEntregue: 20, situacao: 'ENTREGUE', endereco: 'Praça Coqueiros', telefone: '4896334007', email: '', observacao: 'Levado pelo Toninho no Adesivaço', fase: 'Adesivaço 16/08', dataPrazo: '2026-08-16', prioridade: 'Alta' },
  { id: 8, articulador: 'Maíra', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Eventos', lideranca: 'Estandes', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Santão', quantidadeSolicitada: 632, quantidadeEntregue: 632, situacao: 'ENTREGUE', endereco: 'Largo da Alfândega', telefone: '', email: '', observacao: '2 caixas fechadas + 4 unidades avulsas', fase: 'Estandes', dataPrazo: '2026-08-17', prioridade: 'Alta' },
  { id: 9, articulador: 'Maíra', temCarro: 'Sim', regiaoArticulador: 'Grande Florianópolis', tema: 'Eventos', lideranca: 'Estandes', municipio: 'Florianópolis', bairro: 'Centro', regiaoFloripa: 'Centro', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Santinhos', quantidadeSolicitada: 12000, quantidadeEntregue: 12000, situacao: 'ENTREGUE', endereco: 'Largo da Alfândega', telefone: '', email: '', observacao: '12 maços', fase: 'Estandes', dataPrazo: '2026-08-17', prioridade: 'Alta' },
  { id: 10, articulador: 'João', temCarro: 'Sim', regiaoArticulador: 'Foz do Itajaí', tema: 'Geral', lideranca: 'Sindicato', municipio: 'Itajaí', bairro: '', regiaoFloripa: '', distrito: '', associacao: 'AMFRI', material: 'Praguinha', quantidadeSolicitada: 1000, quantidadeEntregue: 0, situacao: 'A ENTREGAR', endereco: 'Rua do Porto', telefone: '4799999999', email: '', observacao: '', fase: 'Fase 2', dataPrazo: '2026-08-25', prioridade: 'Média' },
  { id: 11, articulador: 'Fernando', temCarro: 'Sim', regiaoArticulador: 'Continente', tema: 'Logística', lideranca: 'Estoque Móvel', municipio: 'Florianópolis', bairro: 'Estreito', regiaoFloripa: 'Continente', distrito: 'Sede', associacao: 'GRANFPOLIS', material: 'Furadinhos Retangular', quantidadeSolicitada: 26, quantidadeEntregue: 26, situacao: 'ENTREGUE', endereco: 'Carro do Fernando', telefone: '', email: '', observacao: 'Sobras do adesivaço', fase: 'Adesivaço 16/08', dataPrazo: '2026-08-16', prioridade: 'Baixa' }
];

// Componente de Ficha Detalhada
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
    return false;
  });

  const totalSolicitado = dadosFiltrados.reduce((acc, curr) => acc + curr.quantidadeSolicitada, 0);
  const totalEntregue = dadosFiltrados.reduce((acc, curr) => acc + curr.quantidadeEntregue, 0);

  return (
    <div className={`p-6 rounded-xl shadow-xl ${bgColor} ${textColor} border-l-8`} style={{ borderColor: COLORS.teal }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Ficha Completa: {tipo}</h2>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.mustard }}>{valor}</h1>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <ChevronLeft size={24} /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <Package size={24} color={COLORS.teal} />
          <div>
            <p className="text-sm opacity-70">Total Solicitado</p>
            <p className="text-xl font-bold">{totalSolicitado}</p>
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <MapPin size={24} color={COLORS.crimson} />
          <div>
            <p className="text-sm opacity-70">Total Entregue</p>
            <p className="text-xl font-bold">{totalEntregue}</p>
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${borderColor} flex items-center gap-3`}>
          <AlertCircle size={24} color={COLORS.mustard} />
          <div>
            <p className="text-sm opacity-70">Pendentes</p>
            <p className="text-xl font-bold">{totalSolicitado - totalEntregue}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLORS.crimson }}>Entregas Relacionadas</h3>
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
                <td className="p-3">{new Date(item.dataPrazo).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [viewMode, setViewMode] = useState('dashboard'); // dashboard, list, cards, detail
  const [data, setData] = useState(mockData);
  const [activeDetail, setActiveDetail] = useState(null); // { tipo: 'articulador', valor: 'Laura' }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortConfig, setSortConfig] = useState({ key: 'dataPrazo', direction: 'asc' });

  const [filters, setFilters] = useState({
    articulador: [],
    municipio: [],
    associacao: [],
    regiaoArticulador: [],
    situacao: [],
    bairro: [],
    regiaoFloripa: [],
    distrito: [],
    fase: []
  });

  // Toggle Theme
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? COLORS.darkBg : COLORS.lightBg;
    document.body.style.color = theme === 'dark' ? COLORS.textDark : COLORS.textLight;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Lógica de Filtros
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

  // Filtragem e Ordenação de Dados
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, selectedValues]) => {
        if (selectedValues.length === 0) return true;
        if (!item[key]) return false; // Ignora se o item não tem essa propriedade
        return selectedValues.includes(item[key]);
      });
    }).sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, filters, sortConfig]);

  // Extração de opções únicas para os filtros e cálculo de badges (Entregue/Solicitado)
  const getFilterOptions = (category) => {
    const options = {};
    data.forEach(item => {
      // Ignora bairros/regioes se não for Floripa, exceto se Floripa estiver selecionado
      if (['bairro', 'regiaoFloripa', 'distrito'].includes(category)) {
        if (item.municipio !== 'Florianópolis') return;
      }

      const val = item[category];
      if (val) {
        if (!options[val]) options[val] = { entregue: 0, total: 0 };
        options[val].entregue += item.quantidadeEntregue;
        options[val].total += item.quantidadeSolicitada;
      }
    });
    return Object.entries(options).map(([name, stats]) => ({ name, ...stats })).sort((a, b) => a.name.localeCompare(b.name));
  };

  // Paginação para Cards
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleDetailClick = (tipo, valor) => {
    setActiveDetail({ tipo, valor });
    setViewMode('detail');
  };

  const bgClass = theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-[#F4F1EA]';
  const cardClass = theme === 'dark' ? 'bg-[#2C2C2C] border-gray-700' : 'bg-white border-gray-200';
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${bgClass} ${textClass}`}>
      
      {/* Sidebar de Filtros */}
      <aside className={`w-full md:w-80 p-6 border-r flex-shrink-0 overflow-y-auto max-h-screen ${theme === 'dark' ? 'border-gray-800 bg-[#1A1A1A]' : 'border-gray-300 bg-[#EFEBE1]'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black tracking-tighter" style={{ color: COLORS.crimson }}>LOGÍSTICA <br/><span style={{ color: COLORS.teal }}>MARQUITO 2026</span></h1>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold flex items-center gap-2"><Filter size={18} /> Filtros</h2>
            <button onClick={clearFilters} className="text-xs underline text-gray-500 hover:text-red-500">Limpar</button>
          </div>

          {/* Renderização Dinâmica de Filtros */}
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
              <div className="space-y-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
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

          {/* Filtros Específicos Florianópolis */}
          {(filters.municipio.includes('Florianópolis') || filters.municipio.length === 0) && (
            <div className="mt-6 p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-dashed border-gray-400">
              <h3 className="font-bold text-sm mb-4 text-center">📍 Filtros Florianópolis</h3>
              {['regiaoFloripa', 'distrito', 'bairro'].map(filterId => (
                <div key={filterId} className="mb-4 last:mb-0">
                  <h4 className="text-xs font-bold uppercase mb-1 opacity-70">{filterId.replace('Floripa', '')}</h4>
                  <select 
                    className={`w-full p-2 text-sm rounded border ${theme === 'dark' ? 'bg-[#333] border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    onChange={(e) => {
                      if(e.target.value) handleFilterChange(filterId, e.target.value);
                    }}
                    value=""
                  >
                    <option value="">Adicionar {filterId}...</option>
                    {getFilterOptions(filterId).filter(opt => !filters[filterId].includes(opt.name)).map(opt => (
                      <option key={opt.name} value={opt.name}>{opt.name} ({opt.entregue}/{opt.total})</option>
                    ))}
                  </select>
                  {/* Badges dos selecionados */}
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

      {/* Área Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        
        {/* Navegação Superior */}
        <div className="flex flex-wrap gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 justify-between items-center">
          <div className="flex gap-2">
            <button onClick={() => { setViewMode('dashboard'); setActiveDetail(null); }} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'dashboard' ? 'bg-[#2A9D8F] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <LayoutDashboard size={18} /> Resumo
            </button>
            <button onClick={() => { setViewMode('list'); setActiveDetail(null); }} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-[#D93846] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <List size={18} /> Lista
            </button>
            <button onClick={() => { setViewMode('cards'); setActiveDetail(null); }} className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${viewMode === 'cards' ? 'bg-[#E5B13A] text-white shadow-md' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
              <LayoutGrid size={18} /> Cards
            </button>
          </div>
          
          <div className="text-sm font-medium bg-black/10 dark:bg-white/10 px-4 py-2 rounded-full">
            Mostrando {filteredData.length} registros
          </div>
        </div>

        {/* Content View Routing */}
        {viewMode === 'detail' && activeDetail && (
          <FichaDetalhada 
            tipo={activeDetail.tipo} 
            valor={activeDetail.valor} 
            data={data} 
            theme={theme}
            onClose={() => setViewMode('dashboard')}
            onFilterClick={handleDetailClick}
          />
        )}

        {}
        {viewMode === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Solicitado', value: filteredData.reduce((acc, curr) => acc + curr.quantidadeSolicitada, 0), color: COLORS.mustard, icon: Package },
                { label: 'Total Entregue', value: filteredData.reduce((acc, curr) => acc + curr.quantidadeEntregue, 0), color: COLORS.teal, icon: MapPin },
                { label: 'Entregas Pendentes', value: filteredData.filter(d => d.situacao !== 'ENTREGUE').length, color: COLORS.crimson, icon: AlertCircle },
                { label: 'Articuladores Ativos', value: new Set(filteredData.map(d => d.articulador)).size, color: '#4A90E2', icon: User },
              ].map((kpi, i) => (
                <div key={i} className={`p-6 rounded-xl border-t-4 shadow-sm ${cardClass}`} style={{ borderColor: kpi.color }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold opacity-60 uppercase">{kpi.label}</p>
                      <h3 className="text-3xl font-black mt-2">{kpi.value.toLocaleString()}</h3>
                    </div>
                    <kpi.icon size={24} color={kpi.color} opacity={0.8} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart - Materiais por Região */}
              <div className={`p-6 rounded-xl shadow-sm border ${cardClass}`}>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Map size={20} color={COLORS.mustard}/> Entregas por Região</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getFilterOptions('regiaoArticulador')}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" tick={{fill: textClass, fontSize: 12}} />
                      <YAxis tick={{fill: textClass, fontSize: 12}} />
                      <RechartsTooltip contentStyle={{backgroundColor: theme === 'dark' ? '#333' : '#fff', borderRadius: '8px', border: 'none'}} />
                      <Legend />
                      <Bar dataKey="entregue" name="Entregue" fill={COLORS.teal} stackId="a" radius={[0, 0, 4, 4]} cursor="pointer" onClick={(data) => handleDetailClick('regiao', data.name)} />
                      <Bar dataKey="total" name="Total Solicitado" fill={COLORS.mustard} stackId="a" radius={[4, 4, 0, 0]} cursor="pointer" onClick={(data) => handleDetailClick('regiao', data.name)}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart - Top Articuladores */}
              <div className={`p-6 rounded-xl shadow-sm border ${cardClass}`}>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><User size={20} color={COLORS.crimson}/> Top Articuladores (Volumétrico)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={getFilterOptions('articulador').sort((a,b) => b.total - a.total).slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" tick={{fill: textClass, fontSize: 12}} />
                      <YAxis dataKey="name" type="category" width={100} tick={{fill: textClass, fontSize: 12}} />
                      <RechartsTooltip contentStyle={{backgroundColor: theme === 'dark' ? '#333' : '#fff', borderRadius: '8px', border: 'none'}} />
                      <Bar dataKey="total" name="Solicitado" fill={COLORS.crimson} radius={[0, 4, 4, 0]} cursor="pointer" onClick={(data) => handleDetailClick('articulador', data.name)} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {viewMode === 'list' && (
          <div className={`rounded-xl shadow-sm border overflow-hidden animate-in fade-in ${cardClass}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className={`bg-black/5 dark:bg-white/5 border-b ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                  <tr>
                    {['Articulador', 'Liderança', 'Município/Bairro', 'Material', 'Qtd', 'Situação', 'Prazo'].map((col, i) => {
                      const keys = ['articulador', 'lideranca', 'municipio', 'material', 'quantidadeSolicitada', 'situacao', 'dataPrazo'];
                      return (
                        <th key={col} className="p-4 font-bold text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={() => handleSort(keys[i])}>
                          {col} {sortConfig.key === keys[i] && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id} className={`border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${theme==='dark'?'border-gray-800':'border-gray-100'}`}>
                      <td className="p-4 cursor-pointer font-medium hover:text-teal-500" onClick={() => handleDetailClick('articulador', row.articulador)}>{row.articulador}</td>
                      <td className="p-4 cursor-pointer hover:text-teal-500" onClick={() => handleDetailClick('lideranca', row.lideranca)}>{row.lideranca}</td>
                      <td className="p-4 cursor-pointer hover:text-teal-500" onClick={() => handleDetailClick('municipio', row.municipio)}>
                        {row.municipio} {row.bairro && <span className="text-xs opacity-60 block">{row.bairro}</span>}
                      </td>
                      <td className="p-4">{row.material}</td>
                      <td className="p-4 font-mono text-sm">{row.quantidadeEntregue}/{row.quantidadeSolicitada}</td>
                      <td className="p-4 cursor-pointer" onClick={() => handleDetailClick('situacao', row.situacao)}>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          row.situacao === 'ENTREGUE' ? 'bg-green-100 text-green-800' :
                          row.situacao === 'ENTREGUE PARCIAL' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {row.situacao}
                        </span>
                      </td>
                      <td className="p-4 text-sm flex items-center gap-2">
                        {new Date(row.dataPrazo).toLocaleDateString('pt-BR')}
                        {row.prioridade === 'Alta' && <AlertCircle size={14} color={COLORS.crimson} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="p-8 text-center opacity-50">Nenhum dado encontrado com os filtros atuais.</div>
            )}
          </div>
        )}

        {}
        {viewMode === 'cards' && (
          <div className="animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedData.map((card) => (
                <div key={card.id} className={`p-6 rounded-xl border shadow-sm relative overflow-hidden group ${cardClass} hover:shadow-md transition-shadow`} style={{ borderTopWidth: '4px', borderTopColor: card.situacao === 'ENTREGUE' ? COLORS.teal : card.situacao === 'A ENTREGAR' ? COLORS.crimson : COLORS.mustard }}>
                  
                  {/* Prioridade Badge */}
                  {card.prioridade === 'Alta' && (
                    <div className="absolute top-4 right-4 text-red-500 animate-pulse" title="Prioridade Alta">
                      <AlertCircle size={20} />
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1 block">{card.fase}</span>
                    <h3 className="text-xl font-black mb-1 cursor-pointer hover:underline" onClick={() => handleDetailClick('lideranca', card.lideranca)}>
                      Lid: {card.lideranca}
                    </h3>
                    <p className="text-sm opacity-80 cursor-pointer hover:underline flex items-center gap-1" onClick={() => handleDetailClick('articulador', card.articulador)}>
                      <User size={14}/> Artic: {card.articulador} {card.temCarro === 'Sim' && '(🚗)'}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg mb-4 text-sm ${theme === 'dark' ? 'bg-black/30' : 'bg-gray-50'}`}>
                    <p className="font-bold flex items-center justify-between mb-1">
                      <span>{card.material}</span>
                      <span className="font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">{card.quantidadeEntregue}/{card.quantidadeSolicitada}</span>
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                      <div className="h-1.5 rounded-full transition-all" style={{ 
                        width: `${Math.min(100, (card.quantidadeEntregue / card.quantidadeSolicitada) * 100)}%`,
                        backgroundColor: card.situacao === 'ENTREGUE' ? COLORS.teal : COLORS.mustard
                      }}></div>
                    </div>
                  </div>

                  <div className="text-sm space-y-2 opacity-80 mb-6">
                    <p className="flex items-center gap-2"><MapPin size={14} /> {card.municipio} {card.bairro ? `- ${card.bairro}` : ''}</p>
                    <p className="flex items-center gap-2"><Calendar size={14} /> Prazo: {new Date(card.dataPrazo).toLocaleDateString('pt-BR')}</p>
                    {card.telefone && <p className="flex items-center gap-2"><Phone size={14} /> {card.telefone}</p>}
                  </div>

                  <button className={`w-full py-2 rounded-lg font-bold text-sm transition-colors border ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-100 text-black'}`}>
                    Ver Endereço Completo
                  </button>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-bold text-sm">Página {currentPage} de {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            {filteredData.length === 0 && (
              <div className="p-8 text-center opacity-50">Nenhum card encontrado com os filtros atuais.</div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
