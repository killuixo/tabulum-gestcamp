import React, { useState, useEffect } from 'react';

const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const IconUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconPackage = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>;
const IconAlert = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconCheck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconTruck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;

// Lendo URL via Vercel Environment Variables de forma compatível
const GOOGLE_APPS_SCRIPT_URL = (typeof process !== 'undefined' && process.env && process.env.VITE_SHEETS_API_URL) ? process.env.VITE_SHEETS_API_URL : '';

export default function App() {
  const [articulador, setArticulador] = useState({ nome: '', email: '', telefone: '' });
  const [lideranca, setLideranca] = useState({ nome: '', email: '', telefone: '' });
  
  // Novos campos de recebimento
  const [modoRecebimento, setModoRecebimento] = useState(''); // 'Despacho' ou 'Retirada no comitê'
  const [regiaoDespacho, setRegiaoDespacho] = useState('Interior de Santa Catarina');
  const [enderecoRecebimento, setEnderecoRecebimento] = useState('');
  const [horarioRetirada, setHorarioRetirada] = useState('');

  const [estoque, setEstoque] = useState([]);
  const [pedidos, setPedidos] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState(null); 

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      if(!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('SUA_URL_AQUI')) {
        // Fallback visual temporário caso ainda não tenha configurado a Vercel env variable
        setTimeout(() => {
          setEstoque([
            { id: 1, nome: "Santinhos", total: 100000, disponivel: 56000 },
            { id: 2, nome: "Panfletos - Santão", total: 18000, disponivel: 1570 },
            { id: 3, nome: "Adesivo Praguinha", total: 10000, disponivel: 804 }
          ]);
          setLoading(false);
        }, 800);
        return;
      }

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setEstoque(data);
      }
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
    } finally {
      setLoading(false);
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

    // Validações Manuais
    if (!modoRecebimento) {
      setMensagem({ tipo: 'erro', texto: 'Selecione um Modo de Recebimento (Despacho ou Retirada).' });
      setSubmitting(false); return;
    }

    if (modoRecebimento === 'Despacho') {
      if (!enderecoRecebimento.trim()) {
        setMensagem({ tipo: 'erro', texto: 'O endereço de recebimento é obrigatório para Despacho.' });
        setSubmitting(false); return;
      }
      if (regiaoDespacho === 'Florianópolis' && enderecoRecebimento.trim().length < 8) {
        setMensagem({ tipo: 'erro', texto: 'Para Florianópolis, informe detalhadamente no mínimo o nome do bairro.' });
        setSubmitting(false); return;
      }
    }

    if (modoRecebimento === 'Retirada no comitê' && !horarioRetirada) {
      setMensagem({ tipo: 'erro', texto: 'Selecione o horário para retirada no comitê.' });
      setSubmitting(false); return;
    }

    const materiaisSolicitados = estoque
      .filter(item => pedidos[item.id] > 0)
      .map(item => ({ nome: item.nome, quantidade: pedidos[item.id] }));

    if (materiaisSolicitados.length === 0) {
      setMensagem({ tipo: 'erro', texto: 'Selecione a quantidade de pelo menos um material antes de enviar.' });
      setSubmitting(false); return;
    }

    const payload = {
      articulador,
      lideranca,
      modoRecebimento,
      regiaoDespacho: modoRecebimento === 'Despacho' ? regiaoDespacho : '',
      enderecoRecebimento: modoRecebimento === 'Despacho' ? enderecoRecebimento : 'Comitê',
      horarioRetirada: modoRecebimento === 'Retirada no comitê' ? horarioRetirada : '',
      materiais: materiaisSolicitados
    };

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMensagem({ tipo: 'sucesso', texto: 'Pedido registrado com sucesso!' });
        // Limpar form
        setArticulador({ nome: '', email: '', telefone: '' });
        setLideranca({ nome: '', email: '', telefone: '' });
        setPedidos({});
        setModoRecebimento('');
        setEnderecoRecebimento('');
        setHorarioRetirada('');
      } else {
        throw new Error(result.message || 'Erro desconhecido');
      }
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: 'Falha ao enviar. Verifique VITE_SHEETS_API_URL.' });
    } finally {
      setSubmitting(false);
    }
  };

  const InputGroup = ({ icon: Icon, label, value, onChange, placeholder, type = "text", required = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-slate-800 mb-1">
        {label} {required && <span className="text-[#DC143C]">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <Icon />
        </div>
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin text-[#20B2AA]"><IconPackage /></div>
        <p className="text-slate-600 font-bold">Sincronizando com o estoque...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 font-sans text-slate-800">
      
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase border-b-4 border-slate-900 inline-block pb-1 pr-8">
          Pedido de Materiais
        </h1>
        <p className="mt-2 text-slate-600 font-bold flex items-center">
          Campanha 2026 - Controle de Distribuição
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Articulador */}
        <div className="md:col-span-5 bg-[#E5B80B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
          <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-800/30 pb-3">
            <IconUser />
            <h2 className="text-2xl font-bold text-slate-900">Articulador</h2>
          </div>
          <InputGroup 
            icon={IconUser} label="Nome Completo" placeholder="Quem está registrando?" 
            value={articulador.nome} onChange={e => setArticulador({...articulador, nome: e.target.value})} required={true}
          />
          <InputGroup 
            icon={IconMail} label="E-mail" type="email" placeholder="Opcional" 
            value={articulador.email} onChange={e => setArticulador({...articulador, email: e.target.value})} 
          />
          <InputGroup 
            icon={IconPhone} label="Telefone / WhatsApp" type="tel" placeholder="Opcional" 
            value={articulador.telefone} onChange={e => setArticulador({...articulador, telefone: e.target.value})} 
          />
        </div>

        {/* Liderança */}
        <div className="md:col-span-7 bg-[#20B2AA] text-slate-900 rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
           <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-900/30 pb-3">
            <IconUsers />
            <h2 className="text-2xl font-bold">Liderança de Destino</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="md:col-span-2">
              <InputGroup 
                icon={IconUser} label="Nome da Liderança" placeholder="Quem vai receber e distribuir?" 
                value={lideranca.nome} onChange={e => setLideranca({...lideranca, nome: e.target.value})} required={true}
              />
            </div>
            <InputGroup 
              icon={IconMail} label="E-mail" type="email" placeholder="Opcional" 
              value={lideranca.email} onChange={e => setLideranca({...lideranca, email: e.target.value})} 
            />
            <InputGroup 
              icon={IconPhone} label="Telefone" type="tel" placeholder="Opcional" 
              value={lideranca.telefone} onChange={e => setLideranca({...lideranca, telefone: e.target.value})} 
            />
          </div>
        </div>

        {/* Modo de Recebimento */}
        <div className="md:col-span-12 bg-white rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800">
           <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-slate-200">
            <IconTruck />
            <h2 className="text-2xl font-bold text-slate-900">Modo de Recebimento <span className="text-[#DC143C] text-sm">*</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opção 1: Despacho */}
            <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${modoRecebimento === 'Despacho' ? 'border-[#20B2AA] bg-[#20B2AA]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setModoRecebimento('Despacho')}>
              <div className="flex items-center mb-3">
                <input type="radio" checked={modoRecebimento === 'Despacho'} readOnly className="w-5 h-5 mr-3 accent-[#20B2AA]" />
                <h3 className="font-bold text-lg">Despacho</h3>
              </div>
              
              {modoRecebimento === 'Despacho' && (
                <div className="mt-4 space-y-4 pl-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">Região</label>
                    <select 
                      className="w-full p-2 border-2 border-slate-400 rounded-lg bg-white"
                      value={regiaoDespacho} onChange={(e) => setRegiaoDespacho(e.target.value)}
                    >
                      <option value="Interior de Santa Catarina">Interior de Santa Catarina</option>
                      <option value="Florianópolis">Florianópolis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1">
                      Endereço de recebimento <span className="text-[#DC143C]">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder={regiaoDespacho === 'Florianópolis' ? 'Ex: Rua X, Bairro Y...' : 'Ex: Município - SC'}
                      value={enderecoRecebimento} 
                      onChange={e => setEnderecoRecebimento(e.target.value)}
                      className="w-full p-2 border-2 border-slate-400 rounded-lg bg-white focus:border-[#20B2AA] focus:outline-none"
                    />
                    {regiaoDespacho === 'Florianópolis' && <p className="text-xs text-[#DC143C] mt-1 font-bold">Obrigatório informar o bairro para envios em Florianópolis.</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Opção 2: Retirada */}
            <div className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${modoRecebimento === 'Retirada no comitê' ? 'border-[#DC143C] bg-[#DC143C]/10' : 'border-slate-300 hover:border-slate-400'}`} onClick={() => setModoRecebimento('Retirada no comitê')}>
              <div className="flex items-center mb-3">
                <input type="radio" checked={modoRecebimento === 'Retirada no comitê'} readOnly className="w-5 h-5 mr-3 accent-[#DC143C]" />
                <h3 className="font-bold text-lg">Retirada no comitê</h3>
              </div>
              
              {modoRecebimento === 'Retirada no comitê' && (
                <div className="mt-4 pl-8">
                  <div className="p-3 bg-white border-2 border-slate-300 rounded-lg mb-4 text-sm font-bold text-slate-700">
                    Rua Tiradentes, 55 - Centro, Florianópolis - SC.
                  </div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Horário da retirada <span className="text-[#DC143C]">*</span>
                  </label>
                  <div className="space-y-2">
                    {['10h - 12h', '12h - 16h', '16h - 19h'].map(hora => (
                      <label key={hora} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" name="horario" value={hora} 
                          checked={horarioRetirada === hora} onChange={(e) => setHorarioRetirada(e.target.value)}
                          className="w-4 h-4 accent-[#DC143C]"
                        />
                        <span>{hora}</span>
                      </label>
                    ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estoque.map((item) => {
              const porcentagem = item.total > 0 ? ((item.disponivel / item.total) * 100).toFixed(1) : 0;
              const quantidadeEscolhida = pedidos[item.id] || 0;
              
              let barColor = 'bg-[#20B2AA]'; 
              if (porcentagem < 25) barColor = 'bg-[#DC143C]'; 
              else if (porcentagem < 50) barColor = 'bg-[#E5B80B]'; 

              return (
                <div key={item.id} className="p-4 bg-[#F9F6F0] border-2 border-slate-200 rounded-xl hover:border-slate-400 transition-colors flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{item.nome}</h3>
                    <div className="mt-3 mb-4">
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>Restam: {item.disponivel} un.</span>
                        <span>{porcentagem}% em estoque</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, porcentagem))}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Quantidade:</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-md hover:bg-slate-300"
                      >-</button>
                      <input 
                        type="number" min="0" max={item.disponivel}
                        value={quantidadeEscolhida || ''} onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                        placeholder="0"
                        className="w-20 text-center py-1 bg-white border-2 border-slate-300 rounded-md font-bold focus:border-[#DC143C] focus:outline-none"
                      />
                      <button 
                        type="button" onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida + 1)} disabled={quantidadeEscolhida >= item.disponivel}
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-md hover:bg-slate-300 disabled:opacity-50"
                      >+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé e Submit */}
        <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-2xl p-6 mt-4">
          <div className="flex-1 w-full mb-4 md:mb-0 pr-0 md:pr-4">
            {mensagem && (
              <div className={`p-4 rounded-lg flex items-center font-bold ${mensagem.tipo === 'sucesso' ? 'bg-[#20B2AA]/20 text-[#20B2AA]' : 'bg-[#DC143C]/20 text-[#DC143C]'}`}>
                <div className="mr-3">{mensagem.tipo === 'sucesso' ? <IconCheck /> : <IconAlert />}</div>
                <p>{mensagem.texto}</p>
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={submitting}
            className="w-full md:w-auto flex items-center justify-center space-x-2 bg-[#DC143C] hover:bg-[#b01030] text-white font-black uppercase tracking-wider py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] border-2 border-white"
          >
            {submitting ? <span>Enviando...</span> : <span>Confirmar Pedido</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
