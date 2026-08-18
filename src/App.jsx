import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Users, Package, AlertCircle, CheckCircle2, Loader2, ChevronRight, Info } from 'lucide-react';

// COLE SUA URL DO GOOGLE APPS SCRIPT AQUI (Substitua a URL abaixo)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SUA_URL_AQUI/exec';

// Dados simulados baseados na sua planilha caso a URL acima falhe (Fallback)
const FALLBACK_STOCK = [
  { id: 1, nome: "Santinhos", total: 100000, disponivel: 56000 },
  { id: 2, nome: "Panfletos - Santão", total: 18000, disponivel: 1570 },
  { id: 3, nome: "Adesivo Praguinha (Marquito)", total: 10000, disponivel: 804 },
  { id: 4, nome: "Adesivo Praguinha (Marquito) 02", total: 1000, disponivel: 804 },
  { id: 5, nome: "Retangular (Para-choque e bike)", total: 500, disponivel: 50 },
  { id: 6, nome: "Furadinho (bola) 01", total: 100, disponivel: 10 },
  { id: 7, nome: "Furadinho (retangular)", total: 100, disponivel: 24 },
  { id: 8, nome: "Faixas Comitê", total: 2, disponivel: 1 },
];

export default function App() {
  const [articulador, setArticulador] = useState({ nome: '', email: '', telefone: '' });
  const [lideranca, setLideranca] = useState({ nome: '', email: '', telefone: '' });
  const [estoque, setEstoque] = useState([]);
  const [pedidos, setPedidos] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState(null); // { tipo: 'sucesso' | 'erro', texto: '' }

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      if(GOOGLE_APPS_SCRIPT_URL.includes('SUA_URL_AQUI')) {
        // Se a URL não foi configurada, usa o fallback para demonstração
        setTimeout(() => {
          setEstoque(FALLBACK_STOCK);
          setLoading(false);
        }, 800);
        return;
      }

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setEstoque(data);
      } else {
        setEstoque(FALLBACK_STOCK); // Fallback se a planilha estiver vazia ou com erro
      }
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
      setEstoque(FALLBACK_STOCK);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantidadeChange = (id, quantidadeNova) => {
    const material = estoque.find(m => m.id === id);
    let qtd = parseInt(quantidadeNova) || 0;
    
    // Impede de pedir mais do que tem disponível ou números negativos
    if (qtd > material.disponivel) qtd = material.disponivel;
    if (qtd < 0) qtd = 0;

    setPedidos(prev => ({
      ...prev,
      [id]: qtd
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMensagem(null);

    // Formata os dados para enviar para a planilha
    const materiaisSolicitados = estoque
      .filter(item => pedidos[item.id] > 0)
      .map(item => ({
        nome: item.nome,
        quantidade: pedidos[item.id]
      }));

    if (materiaisSolicitados.length === 0) {
      setMensagem({ tipo: 'erro', texto: 'Selecione pelo menos um material antes de enviar.' });
      setSubmitting(false);
      return;
    }

    const payload = {
      articulador,
      lideranca,
      materiais: materiaisSolicitados
    };

    try {
      // Como o GAS aceita melhor text/plain para contornar CORS em POST, enviamos como string
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMensagem({ tipo: 'sucesso', texto: 'Pedido registrado com sucesso na planilha!' });
        // Limpa o formulário
        setArticulador({ nome: '', email: '', telefone: '' });
        setLideranca({ nome: '', email: '', telefone: '' });
        setPedidos({});
      } else {
        throw new Error(result.message || 'Erro desconhecido');
      }
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível enviar o pedido. Verifique se configurou a URL do Google Apps Script corretamente.' });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const InputGroup = ({ icon: Icon, label, value, onChange, placeholder, type = "text", required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-800 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <Icon size={18} />
        </div>
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 bg-white/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#20B2AA]" size={48} />
        <p className="text-slate-600 font-medium">Sincronizando com o estoque...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] p-4 md:p-8 font-sans text-slate-800">
      
      {/* Cabeçalho */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase border-b-4 border-slate-900 inline-block pb-1 pr-8">
          Pedido de Materiais
        </h1>
        <p className="mt-2 text-slate-600 font-medium flex items-center">
          <Info size={18} className="mr-2 text-[#008080]" />
          Campanha 2026 - Controle de Distribuição
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {}
        <div className="md:col-span-5 bg-[#E5B80B] rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800 transition-transform hover:-translate-y-1">
          <div className="flex items-center space-x-3 mb-6 border-b-2 border-slate-800/30 pb-3">
            <User className="text-slate-900" size={28} />
            <h2 className="text-2xl font-bold text-slate-900">Articulador</h2>
          </div>
          
          <InputGroup 
            icon={User} label="Nome Completo" placeholder="Quem está registrando o pedido?" 
            value={articulador.nome} onChange={e => setArticulador({...articulador, nome: e.target.value})} 
          />
          <InputGroup 
            icon={Mail} label="E-mail" type="email" placeholder="email@exemplo.com" 
            value={articulador.email} onChange={e => setArticulador({...articulador, email: e.target.value})} 
          />
          <InputGroup 
            icon={Phone} label="Telefone / WhatsApp" type="tel" placeholder="(00) 00000-0000" 
            value={articulador.telefone} onChange={e => setArticulador({...articulador, telefone: e.target.value})} 
          />
        </div>

        {}
        <div className="md:col-span-7 bg-[#20B2AA] text-white rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] border-2 border-slate-800 transition-transform hover:-translate-y-1">
           <div className="flex items-center space-x-3 mb-6 border-b-2 border-white/30 pb-3">
            <Users className="text-white" size={28} />
            <h2 className="text-2xl font-bold">Liderança de Destino</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="md:col-span-2">
              <InputGroup 
                icon={User} label="Nome da Liderança" placeholder="Quem vai receber e distribuir?" 
                value={lideranca.nome} onChange={e => setLideranca({...lideranca, nome: e.target.value})} 
              />
            </div>
            <InputGroup 
              icon={Mail} label="E-mail da Liderança" type="email" placeholder="Opcional" required={false}
              value={lideranca.email} onChange={e => setLideranca({...lideranca, email: e.target.value})} 
            />
            <InputGroup 
              icon={Phone} label="Telefone da Liderança" type="tel" placeholder="(00) 00000-0000" 
              value={lideranca.telefone} onChange={e => setLideranca({...lideranca, telefone: e.target.value})} 
            />
          </div>
        </div>

        {}
        <div className="md:col-span-12 bg-white rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(220,20,60,1)] border-4 border-[#DC143C]">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-slate-200">
            <Package className="text-[#DC143C]" size={28} />
            <h2 className="text-2xl font-bold text-slate-900">Seleção de Materiais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estoque.map((item) => {
              const porcentagem = item.total > 0 ? ((item.disponivel / item.total) * 100).toFixed(1) : 0;
              const quantidadeEscolhida = pedidos[item.id] || 0;
              
              // Define a cor da barra baseada na porcentagem
              let barColor = 'bg-[#20B2AA]'; // Verde (Teal)
              if (porcentagem < 25) barColor = 'bg-[#DC143C]'; // Vermelho (Crimson)
              else if (porcentagem < 50) barColor = 'bg-[#E5B80B]'; // Amarelo (Mostarda)

              return (
                <div key={item.id} className="p-4 bg-[#F9F6F0] border-2 border-slate-200 rounded-xl hover:border-slate-400 transition-colors flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{item.nome}</h3>
                    
                    {/* Barra de Progresso / Estoque */}
                    <div className="mt-3 mb-4">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                        <span>Restam: {item.disponivel} un.</span>
                        <span>{porcentagem}% do total ({item.total})</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${barColor} transition-all duration-500`} 
                          style={{ width: `${Math.min(100, Math.max(0, porcentagem))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Controle de Quantidade */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Quantidade:</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        type="button"
                        onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-md hover:bg-slate-300"
                      >-</button>
                      
                      <input 
                        type="number"
                        min="0"
                        max={item.disponivel}
                        value={quantidadeEscolhida || ''}
                        onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                        placeholder="0"
                        className="w-20 text-center py-1 bg-white border-2 border-slate-300 rounded-md font-bold focus:border-[#DC143C] focus:outline-none"
                      />
                      
                      <button 
                        type="button"
                        onClick={() => handleQuantidadeChange(item.id, quantidadeEscolhida + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-md hover:bg-slate-300"
                        disabled={quantidadeEscolhida >= item.disponivel}
                      >+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded-2xl p-6 mt-4">
          
          <div className="flex-1 w-full mb-4 md:mb-0 pr-0 md:pr-4">
            {mensagem && (
              <div className={`p-4 rounded-lg flex items-center ${mensagem.tipo === 'sucesso' ? 'bg-[#20B2AA]/20 text-[#20B2AA]' : 'bg-[#DC143C]/20 text-[#DC143C]'}`}>
                {mensagem.tipo === 'sucesso' ? <CheckCircle2 className="mr-3" /> : <AlertCircle className="mr-3" />}
                <p className="font-bold">{mensagem.texto}</p>
              </div>
            )}
            {!mensagem && (
              <p className="text-slate-400 text-sm font-medium">
                Revise as quantidades antes de confirmar. Os dados serão abatidos do estoque na planilha de controle.
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full md:w-auto flex items-center justify-center space-x-2 bg-[#DC143C] hover:bg-[#b01030] text-white font-black uppercase tracking-wider py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-[4px_4px_0px_0px_rgba(229,184,11,1)] border-2 border-white"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>Enviar Pedido</span>
                <ChevronRight size={24} />
              </>
            )}
          </button>

        </div>
      </form>
    </div>
  );
}
