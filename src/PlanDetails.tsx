import { useParams, Link } from 'react-router-dom';
import { proposals } from './data.tsx';
import { ArrowLeft, Cpu, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlanDetails() {
  const { id } = useParams();
  const plan = proposals.find(p => p.id === id);

  if (!plan) return <div className="text-white p-10">Plano não encontrado.</div>;

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Botão Voltar */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para Planos
        </Link>

        {/* Header do Plano */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <div className={`inline-block p-3 rounded-2xl bg-${plan.color}-500/10 mb-4`}>
            {plan.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{plan.title}</h1>
          <p className="text-xl text-gray-400">{plan.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Coluna 1: Stack Tecnológica */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Cpu className={`text-${plan.color}-400`} />
              O que roda "baixo do capô"?
            </h2>
            <div className="space-y-6">
              <div className="bg-surface p-5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Servidor & Processamento</p>
                <p className="font-mono text-lg text-white">{plan.infrastructure.server}</p>
              </div>
              <div className="bg-surface p-5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Conexão WhatsApp</p>
                <p className="font-mono text-lg text-white">{plan.infrastructure.whatsapp}</p>
              </div>
              <div className="bg-surface p-5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Inteligência Artificial</p>
                <p className="font-mono text-lg text-white">{plan.infrastructure.ai}</p>
              </div>
            </div>
          </motion.div>

          {/* Coluna 2: Breakdown de Custos */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className={`text-${plan.color}-400`} />
              Para onde vai o dinheiro?
            </h2>
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="p-4 font-medium">Serviço / Custo</th>
                    <th className="p-4 font-medium text-right">Valor Estimado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {plan.costs.map((cost, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <span className="block text-white font-medium">{cost.item}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          cost.type === 'fixo' ? 'bg-blue-500/10 text-blue-400' : 
                          cost.type === 'variável' ? 'bg-orange-500/10 text-orange-400' : 
                          'bg-gray-500/10 text-gray-400'
                        }`}>
                          Custo {cost.type}
                        </span>
                      </td>
                      <td className="p-4 text-right text-gray-300 font-mono">
                        {cost.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-white/5 text-sm text-gray-400 text-center border-t border-white/5">
                * Valores baseados na cotação do dólar e tabelas oficiais de 2026.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}