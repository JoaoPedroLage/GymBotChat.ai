export interface MarketData {
  region: string;
  averageTicket: number;
  churnRate: number; // Taxa de desistência
  activeGyms: number;
}

export interface Competitor {
  id: string;
  name: string;
  planName: string;
  price: number;
  features: string[];
  trend: 'up' | 'down' | 'stable';
}

// Dados simulados do cenário 2026
export const fetchMarketOverview = async (): Promise<MarketData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { region: "Nacional (BR)", averageTicket: 149.90, churnRate: 15, activeGyms: 32000 },
        { region: "Sudeste", averageTicket: 189.90, churnRate: 12, activeGyms: 14500 },
        { region: "Bairros Residenciais", averageTicket: 119.00, churnRate: 22, activeGyms: 8000 },
      ]);
    }, 800); // Simula delay de rede
  });
};

export const fetchCompetitors = async (): Promise<Competitor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: "Smart Fit 2026", planName: "Black", price: 149.90, features: ["Acesso Ilimitado", "Cadeira de Massagem"], trend: 'up' },
        { id: '2', name: "Bluefit", planName: "Gold", price: 139.90, features: ["24 Horas", "Sem Taxa"], trend: 'stable' },
        { id: '3', name: "Ironberg (Franquia)", planName: "Iron", price: 250.00, features: ["Equipamento Hammer", "Nutricionista IA"], trend: 'up' },
        { id: '4', name: "Academia de Bairro (Média)", planName: "Padrão", price: 99.00, features: ["Musculação", "Horário Restrito"], trend: 'down' },
      ]);
    }, 800);
  });
};