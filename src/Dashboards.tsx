import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Loader2, DollarSign, Users } from 'lucide-react';
import { fetchMarketOverview, fetchCompetitors, type MarketData, type Competitor } from './api/marketApi';

// --- COMPONENTE DE LOADING ---
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-violet-400">
    <Loader2 className="w-10 h-10 animate-spin mb-4" />
    <p>Consultando API de Mercado (Base 2026)...</p>
  </div>
);

// --- DASHBOARD 1: VISÃO MACRO (GRÁFICOS) ---
export const MarketDashboard = () => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketOverview().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-background p-6"><LoadingState /></div>;

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8"><ArrowLeft className="w-4 h-4"/> Voltar</Link>
        
        <h1 className="text-3xl font-bold mb-2">Raio-X do Mercado <span className="text-violet-500">2026</span></h1>
        <p className="text-gray-400 mb-10">Comparativo do Ticket Médio de academias por região.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
           {data.map((item, idx) => (
             <div key={idx} className="bg-surface p-6 rounded-2xl border border-white/5">
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">{item.region}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">R$</span>
                  <span className="text-4xl font-bold text-white">{item.averageTicket.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded-full w-fit">
                   <TrendingDown className="w-4 h-4" /> 
                   Churn: {item.churnRate}%
                </div>
             </div>
           ))}
        </div>

        <div className="bg-surface p-8 rounded-3xl border border-white/5">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="text-emerald-400" /> Comparativo Visual
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="region" stroke="#888" tickLine={false} axisLine={false} />
              <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F1115', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="averageTicket" name="Ticket Médio" radius={[4, 4, 0, 0]}>
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 1 ? '#8b5cf6' : '#3f3f46'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD 2: ESPIÃO DE PREÇOS (TABELA) ---
export const CompetitorDashboard = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitors().then(res => {
      setCompetitors(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-background p-6"><LoadingState /></div>;

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8"><ArrowLeft className="w-4 h-4"/> Voltar</Link>
        
        <h1 className="text-3xl font-bold mb-2">Monitor de <span className="text-emerald-500">Concorrência</span></h1>
        <p className="text-gray-400 mb-10">Planos e preços praticados pelas grandes redes hoje.</p>

        <div className="bg-surface rounded-2xl overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-6 font-medium">Academia / Rede</th>
                <th className="p-6 font-medium">Nome do Plano</th>
                <th className="p-6 font-medium">Preço 2026</th>
                <th className="p-6 font-medium text-center">Tendência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {competitors.map((comp) => (
                <tr key={comp.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 font-medium text-white text-lg">{comp.name}</td>
                  <td className="p-6">
                    <span className="bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full text-xs font-bold border border-violet-500/20">
                      {comp.planName}
                    </span>
                  </td>
                  <td className="p-6 font-mono text-gray-300">R$ {comp.price.toFixed(2)}</td>
                  <td className="p-6 flex justify-center">
                    {comp.trend === 'up' && <TrendingUp className="text-emerald-400 w-5 h-5" />}
                    {comp.trend === 'down' && <TrendingDown className="text-red-400 w-5 h-5" />}
                    {comp.trend === 'stable' && <Minus className="text-gray-500 w-5 h-5" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-linear-to-r from-violet-900/20 to-transparent border border-violet-500/20 rounded-2xl flex items-start gap-4">
           <div className="bg-violet-500/20 p-2 rounded-lg">
             <Users className="text-violet-400 w-6 h-6" />
           </div>
           <div>
             <h3 className="text-violet-200 font-bold mb-1">Insight Estratégico</h3>
             <p className="text-sm text-gray-400">
               A média de preço das grandes redes subiu para <strong className="text-white">R$ 149,90</strong>. 
               Se sua academia cobra menos que isso e não tem automação, você está deixando dinheiro na mesa. 
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};