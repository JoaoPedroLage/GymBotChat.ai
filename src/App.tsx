import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// ADICIONADO: BarChart3 e Search para os novos botões
import { Menu, Check, X, Server, CloudLightning, ShieldCheck, ChevronRight, ChevronLeft, Bot, Info, BarChart3, Search } from 'lucide-react';
import logo from '../public/logo.png';

// --- TIPOS ---
type ProposalColor = 'blue' | 'violet' | 'emerald';

type Proposal = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  icon: ReactNode;
  color: ProposalColor;
  techStack: string[];
  features: string[];
  missingFeatures: string[];
  cons: string[];
  idealFor: string;
  recommended?: boolean;
};

// --- DADOS REVISADOS PARA O CLIENTE (CENÁRIO 2026) ---
const proposals: Proposal[] = [
  {
    id: 'budget',
    title: "Start",
    subtitle: "Para começar barato",
    price: "R$ 150",
    period: "/mês",
    icon: <Server className="w-8 h-8 text-blue-400" />,
    color: "blue",
    techStack: ["VPS Simples", "Chip Físico", "Robô de Scripts"],
    features: [
      "Atendimento 24h básico",
      "Responde preços e horários",
      "Agendamento via link simples"
    ],
    missingFeatures: [
      "Segurança contra bloqueio (Chip)",
      "Inteligência Artificial Real",
      "Vendas Ativas (Recuperação)"
    ],
    cons: [
      "Risco alto de perder o número",
      "Você precisa manter o celular ligado"
    ],
    idealFor: "Quem quer testar sem gastar muito."
  },
  {
    id: 'cost-benefit',
    title: "Growth",
    subtitle: "O Vendedor Automático",
    price: "R$ 450",
    period: "/mês + consumo",
    icon: <CloudLightning className="w-8 h-8 text-violet-400" />,
    color: "violet",
    recommended: true,
    techStack: ["API Oficial (Meta)", "IA Generativa", "Nuvem Segura"],
    features: [
      "Tudo do plano Start, mais:",
      "ZERO risco de bloqueio (Oficial)",
      "IA que negocia e quebra objeções",
      "Lembra o nome e treino do aluno",
      "Envio de promoções em massa"
    ],
    missingFeatures: [
      "Consultoria de Vendas dedicada",
      "Treinamento personalizado da IA (RAG)"
    ],
    cons: [
      "Custo variável por mensagem (Meta)"
    ],
    idealFor: "Academias que querem vender pelo Zap."
  },
  {
    id: 'stable',
    title: "Enterprise",
    subtitle: "A Recepção Digital",
    price: "R$ 1.200",
    period: "/mês fixo",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    color: "emerald",
    techStack: ["AWS High-End", "RAG (Base Própria)", "Gerente Dedicado"],
    features: [
      "Tudo do plano Growth, mais:",
      "IA treinada com SEU manual (RAG)",
      "Auditoria das conversas",
      "Suporte Prioritário 24/7",
      "Garantia de funcionamento (SLA)"
    ],
    missingFeatures: [],
    cons: [
      "Investimento inicial maior"
    ],
    idealFor: "Redes ou academias Premium."
  }
];

// --- COMPONENTES UI ---

const Badge = ({ children, color }: { children: ReactNode; color: ProposalColor }) => {
  const colorClasses: Record<ProposalColor, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${colorClasses[color] || colorClasses.violet}`}>
      {children}
    </span>
  );
};

const TechItem = ({ tech }: { tech: string }) => (
  <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
    {tech}
  </div>
);

const ProposalCard = ({ data }: { data: Proposal }) => {
  const isRec = data.recommended;
  const navigate = useNavigate();

  return (
    <div className={`relative flex flex-col h-full w-full max-w-md bg-surface rounded-3xl overflow-hidden border transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] ${isRec ? 'border-violet-500 shadow-[0_0_50px_-10px_rgba(139,92,246,0.25)] transform md:-translate-y-4' : 'border-gray-800'}`}>
      {isRec && (
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${data.color === 'blue' ? 'bg-blue-500/10' :
            data.color === 'violet' ? 'bg-violet-500/10' :
              'bg-emerald-500/10'
            }`}>
            {data.icon}
          </div>
          {isRec && <Badge color="violet">Melhor Custo Benefício</Badge>}
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-1">{data.subtitle}</h3>
        <h2 className="text-3xl font-bold text-white mb-4">{data.title}</h2>

        <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/5">
          <span className="text-4xl font-bold text-white">{data.price}</span>
          <span className="text-gray-500 text-sm">{data.period}</span>
        </div>

        {/* Lista de Vantagens (Positivas) */}
        <div className="space-y-4 mb-6 flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Check className="w-3 h-3" /> O que está incluso
          </p>
          {data.features.map((feat: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${data.color === 'blue' ? 'bg-blue-400' :
                data.color === 'violet' ? 'bg-violet-400' :
                  'bg-emerald-400'
                }`} />
              <span className="text-sm text-gray-200 font-medium">{feat}</span>
            </div>
          ))}
        </div>

        {/* Lista de Ausências (O que perde por não pagar mais) */}
        {data.missingFeatures.length > 0 && (
          <div className="space-y-3 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Não incluso neste plano</p>
            {data.missingFeatures.map((missing: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span className="text-sm text-gray-500 line-through decoration-gray-700">{missing}</span>
              </div>
            ))}
          </div>
        )}

        {/* Área Técnica (Discreta) */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-4">
            {data.techStack.map((tech: string, idx: number) => (
              <TechItem key={idx} tech={tech} />
            ))}
          </div>

          <button
            onClick={() => navigate(`/details/${data.id}`)}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group ${isRec
              ? 'bg-violet-600 hover:bg-blue-600 text-white shadow-lg shadow-violet-900/20'
              : 'bg-white text-black hover:bg-blue-600 hover:text-white'
              }`}>
            Mostrar detalhes do Plano
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${!isRec && 'text-black'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

function Home() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); // Hook para navegação no Header

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % proposals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + proposals.length) % proposals.length);
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-violet-500/30">
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4">

          {/* --- VERSÃO MOBILE (Flex: Logo + Hamburger) --- */}
          <div className="flex md:hidden justify-between items-center h-16">
            {/* Identidade Visual Mobile */}
            <div className="flex items-center gap-3">
              <img src={logo} className="w-10 h-10 rounded-full" alt="Logo" />
              <span className="font-bold text-lg tracking-tight">GymBot<span className="text-violet-500">.ai</span></span>
            </div>

            {/* Botão Menu Hamburger */}
            <button
              className="p-2 text-gray-300 hover:text-white active:scale-90 transition-transform rounded-lg hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* --- VERSÃO DESKTOP (Sua configuração de Grid 3 Colunas) --- */}
          <div className="hidden md:grid grid-cols-3 items-center">

            {/* Coluna Esquerda: Texto BrandaoGymBotChat */}
            <div className="flex items-center gap-5 font-bold text-xl tracking-tight">
              <Bot className="text-violet-500" />
              <span>BrandaoGymBotChat<span className="text-violet-500">.ai</span></span>
            </div>

            {/* Coluna Centro: Logo centralizada */}
            <div className="flex justify-center">
              <img src={logo} width={'80px'} height={'80px'} className="rounded-full" alt="Logo" />
            </div>

            {/* Coluna Direita: Botões de Dashboard */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => navigate('/market-data')}
                className="flex items-center gap-2 text-sm bg-violet-600 text-white hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-violet-800 border border-transparent hover:border-white/10"
              >
                <BarChart3 className="w-4 h-4" />
                Raio-X do Mercado
              </button>

              <button
                onClick={() => navigate('/competitors')}
                className="flex items-center gap-2 text-sm font-medium bg-violet-600 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-violet-900/20"
              >
                <Search className="w-4 h-4" />
                Espião de Preços
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* BLOCO DO MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-28 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Ferramentas</p>

              <button
                onClick={() => { navigate('/market-data'); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-surface border border-white/5 active:bg-violet-600/20 transition-colors"
              >
                <span className="flex items-center gap-3 font-medium text-lg">
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    <BarChart3 className="text-violet-400 w-5 h-5" />
                  </div>
                  Raio-X do Mercado
                </span>
                <ChevronRight className="text-gray-600" />
              </button>

              <button
                onClick={() => { navigate('/competitors'); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-surface border border-white/5 active:bg-violet-600/20 transition-colors"
              >
                <span className="flex items-center gap-3 font-medium text-lg">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Search className="text-emerald-400 w-5 h-5" />
                  </div>
                  Espião de Preços
                </span>
                <ChevronRight className="text-gray-600" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 mb-6 font-medium">
            <Info className="w-3 h-3" />
            Planos atualizados para a Tecnologia 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Quanto custa automatizar<br /> sua academia?
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Do atendimento básico à inteligência artificial que vende sozinha.
            Compare as opções e veja qual se encaixa no seu momento.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto">

          {/* Mobile Controls */}
          <div className="flex justify-center gap-4 mb-8 md:hidden">
            <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all">
              <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all">
              <ChevronRight />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
            {proposals.map((plan) => (
              <ProposalCard key={plan.id} data={plan} />
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden overflow-hidden">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <ProposalCard data={proposals[currentIndex]} />
              </motion.div>
            </AnimatePresence>

            {/* Indicadores de Slide Mobile */}
            <div className="flex justify-center gap-2 mt-6">
              {proposals.map((_: Proposal, idx: number) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-violet-500' : 'w-1.5 bg-gray-700'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function App() {
  return <Home />;
}