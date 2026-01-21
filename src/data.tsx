import { type ReactNode } from 'react';
import { Server, CloudLightning, ShieldCheck } from 'lucide-react';

// Definindo a "forma" dos dados para o TypeScript entender
export interface CostItem {
  item: string;
  cost: string;
  type: 'fixo' | 'variável' | 'estimado' | 'anual' | 'serviço';
}

export interface Proposal {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  color: 'blue' | 'violet' | 'emerald'; // Limitando as cores permitidas
  icon: ReactNode;
  description: string;
  infrastructure: {
    server: string;
    whatsapp: string;
    database: string;
    ai: string;
  };
  costs: CostItem[];
}

export const proposals: Proposal[] = [
  {
    id: 'budget',
    title: "Start",
    subtitle: "Para começar barato",
    price: "R$ 150",
    color: "blue",
    icon: <Server className="w-8 h-8 text-blue-400" />,
    description: "Ideal para validação de ideia com baixo volume.",
    infrastructure: {
      server: "VPS DigitalOcean (1vCPU, 1GB RAM)",
      whatsapp: "Evolution API (Self-hosted/Unofficial)",
      database: "SQLite (Arquivo local)",
      ai: "Gemini Flash 2.0 (Free Tier)"
    },
    costs: [
      { item: "Servidor VPS", cost: "R$ 35,00 (aprox. $6 USD)", type: "fixo" },
      { item: "Domínio .com.br", cost: "R$ 40,00 /ano", type: "anual" },
      { item: "Chip/SIM Card", cost: "R$ 20,00 /mês", type: "fixo" },
      { item: "Manutenção Humana", cost: "Seu tempo (Alto)", type: "variável" }
    ]
  },
  {
    id: 'cost-benefit',
    title: "Growth",
    subtitle: "O Vendedor Automático",
    price: "R$ 450",
    color: "violet",
    icon: <CloudLightning className="w-8 h-8 text-violet-400" />,
    description: "A arquitetura serverless moderna usada por startups.",
    infrastructure: {
      server: "Cloudflare Workers (Global CDN)",
      whatsapp: "Meta Cloud API (Oficial)",
      database: "Supabase (PostgreSQL managed)",
      ai: "OpenAI GPT-5o Mini"
    },
    costs: [
      { item: "Cloudflare Workers", cost: "$5 USD (mínimo)", type: "fixo" },
      { item: "WhatsApp (Marketing)", cost: "$0.06 USD / conversa iniciada", type: "variável" },
      { item: "WhatsApp (Serviço)", cost: "$0.03 USD / conversa iniciada", type: "variável" },
      { item: "OpenAI Tokens", cost: "~R$ 50,00 /mês (média de uso)", type: "estimado" }
    ]
  },
  {
    id: 'stable',
    title: "Enterprise",
    subtitle: "A Recepção Digital",
    price: "R$ 1.200",
    color: "emerald",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    description: "Robustez corporativa para alta demanda e segurança.",
    infrastructure: {
      server: "AWS (Lambda + API Gateway)",
      whatsapp: "BSP (Twilio ou Gupshup)",
      database: "AWS DynamoDB + RDS",
      ai: "Claude 3.7 Sonnet (Via Bedrock)"
    },
    costs: [
      { item: "AWS Infraestrutura", cost: "~$80 USD (Load Balancers/NAT)", type: "fixo" },
      { item: "BSP Taxa Adicional", cost: "$0.005 USD / msg extra", type: "variável" },
      { item: "Vector Database (RAG)", cost: "~$40 USD /mês", type: "fixo" },
      { item: "Suporte SLA 24/7", cost: "Incluso no valor da agência", type: "serviço" }
    ]
  }
];