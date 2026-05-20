import Decimal from "decimal.js";

interface PricingInput {
  serviceName: string;
  basePrice: number; // valor ideal do serviço
  complexity: "baixa" | "media" | "alta"; // complexidade
  deliveryCount: number; // quantidade de entregas
  urgency: "normal" | "alta" | "critica"; // urgência
  region: string; // região/estado
  companySize: "startup" | "pequena" | "media" | "grande"; // porte da empresa
  clientProfile?: "new" | "repeat" | "strategic"; // perfil do cliente
}

interface PricingResult {
  minimumViable: number;
  recommended: number;
  premium: number;
  margin: number;
  estimatedProfitPerHour: number;
  marketComparison: "below" | "market" | "above";
  suggestions: string[];
  alerts: string[];
}

// Base pricing database for common services
const SERVICE_DATABASE: Record<string, number> = {
  // Social Media
  "gestao-instagram-mensal": 1500,
  "gestao-social-media-completa": 2500,
  "conteudo-reels-producao": 800,
  "estrategia-digital": 2000,

  // Branding
  "identidade-visual-completa": 3500,
  "branding-logo": 1200,
  "manual-de-marca": 1500,

  // Video e Design
  "producao-video-profissional": 2000,
  "edicao-video-avancada": 1000,
  "design-grafico-campanha": 800,
  "infografico-profissional": 600,

  // Tráfego
  "gestao-trafego-pago-mensal": 3000,
  "consultoria-anuncios": 1500,

  // Consultoria
  "consultoria-horaria": 500,
  "mentoria-digital": 300,
  "auditoria-marketing": 2000,

  // Cobertura
  "cobertura-evento": 1500,
  "cobertura-lancamento": 2000,
};

export class PricingEngine {
  /**
   * Calcula sugestão de preço com base em múltiplos fatores
   */
  static calculatePrice(input: PricingInput): PricingResult {
    const basePrice = new Decimal(input.basePrice);

    // Aplicar multiplicadores
    const complexityMultiplier = this.getComplexityMultiplier(input.complexity);
    const urgencyMultiplier = this.getUrgencyMultiplier(input.urgency);
    const regionMultiplier = this.getRegionMultiplier(input.region);
    const sizeMultiplier = this.getCompanySizeMultiplier(input.companySize);
    const deliveryMultiplier = this.getDeliveryMultiplier(input.deliveryCount);

    // Cálculo do preço recomendado
    const recommended = basePrice
      .times(complexityMultiplier)
      .times(urgencyMultiplier)
      .times(regionMultiplier)
      .times(sizeMultiplier)
      .times(deliveryMultiplier)
      .toNumber();

    // Mínimo viável (80% do recomendado)
    const minimumViable = recommended * 0.8;

    // Premium (140% do recomendado)
    const premium = recommended * 1.4;

    // Margem padrão (40%)
    const margin = 40;

    // Lucro estimado por hora (assumindo 1 entrega = 20 horas)
    const hoursPerDelivery = 20;
    const totalHours = input.deliveryCount * hoursPerDelivery;
    const profit = recommended * (margin / 100);
    const estimatedProfitPerHour =
      totalHours > 0 ? profit / totalHours : profit;

    // Comparar com mercado
    const comparison = this.getMarketComparison(input.serviceName, recommended);

    // Gerar sugestões
    const suggestions = this.generateSuggestions(
      input,
      recommended,
      comparison,
      basePrice.toNumber()
    );

    // Alertas
    const alerts = this.generateAlerts(
      recommended,
      basePrice.toNumber(),
      input.complexity,
      comparison
    );

    return {
      minimumViable: Math.round(minimumViable),
      recommended: Math.round(recommended),
      premium: Math.round(premium),
      margin,
      estimatedProfitPerHour: Math.round(estimatedProfitPerHour),
      marketComparison: comparison,
      suggestions,
      alerts,
    };
  }

  private static getComplexityMultiplier(complexity: string): Decimal {
    const multipliers: Record<string, number> = {
      baixa: 1.0,
      media: 1.3,
      alta: 1.6,
    };
    return new Decimal(multipliers[complexity] || 1.0);
  }

  private static getUrgencyMultiplier(urgency: string): Decimal {
    const multipliers: Record<string, number> = {
      normal: 1.0,
      alta: 1.2,
      critica: 1.5,
    };
    return new Decimal(multipliers[urgency] || 1.0);
  }

  private static getRegionMultiplier(region: string): Decimal {
    // Mercados com maior poder de compra
    const regionMultipliers: Record<string, number> = {
      SP: 1.15,
      RJ: 1.12,
      MG: 1.05,
      RS: 1.08,
      SC: 1.07,
      PR: 1.05,
      BA: 0.95,
      CE: 0.95,
      PE: 0.95,
    };
    return new Decimal(regionMultipliers[region?.toUpperCase()] || 1.0);
  }

  private static getCompanySizeMultiplier(size: string): Decimal {
    const multipliers: Record<string, number> = {
      startup: 0.9,
      pequena: 1.0,
      media: 1.1,
      grande: 1.25,
    };
    return new Decimal(multipliers[size] || 1.0);
  }

  private static getDeliveryMultiplier(count: number): Decimal {
    // Desconto por volume
    if (count >= 10) return new Decimal(0.85);
    if (count >= 5) return new Decimal(0.9);
    if (count >= 3) return new Decimal(0.95);
    return new Decimal(1.0);
  }

  private static getMarketComparison(
    serviceName: string,
    calculatedPrice: number
  ): "below" | "market" | "above" {
    const marketPrice = SERVICE_DATABASE[serviceName] || 2000;
    const ratio = calculatedPrice / marketPrice;

    if (ratio < 0.85) return "below";
    if (ratio > 1.15) return "above";
    return "market";
  }

  private static generateSuggestions(
    input: PricingInput,
    recommended: number,
    comparison: string,
    basePrice: number
  ): string[] {
    const suggestions: string[] = [];

    // Sugestão por perfil de cliente
    if (input.companySize === "grande") {
      suggestions.push(
        "💡 Cliente de grande porte: considere adicionar serviço de consultoria estratégica"
      );
    }

    if (input.clientProfile === "strategic") {
      suggestions.push(
        "💡 Cliente estratégico: ofereça pacote especial com desconto de 10%"
      );
    }

    // Sugestão de upsell baseado no serviço
    const upsellRules: Record<string, string> = {
      "gestao-instagram-mensal":
        "💡 Ideal para adicionar: gestão de tráfego pago para ampliar alcance",
      "gestao-social-media-completa":
        "💡 Ideal para adicionar: produção de reels profissionais",
      "identidade-visual-completa":
        "💡 Ideal para adicionar: consultoria de branding estratégico",
      "gestao-trafego-pago-mensal":
        "💡 Ideal para adicionar: acompanhamento de landing page",
    };

    if (upsellRules[input.serviceName]) {
      suggestions.push(upsellRules[input.serviceName]);
    }

    // Sugestão por urgência
    if (input.urgency === "critica") {
      suggestions.push(
        "⚡ Urgência crítica: cliente está disposto a pagar premium, considere aumentar valor"
      );
    }

    // Sugestão por complexidade
    if (input.complexity === "alta") {
      suggestions.push(
        "🎯 Alta complexidade: documente bem o escopo para evitar extra scopes"
      );
    }

    return suggestions.slice(0, 3); // Máximo 3 sugestões
  }

  private static generateAlerts(
    recommended: number,
    basePrice: number,
    complexity: string,
    comparison: string
  ): string[] {
    const alerts: string[] = [];

    // Alerta de preço abaixo do mercado
    if (comparison === "below") {
      const percentage = Math.round(((basePrice - recommended) / basePrice) * 100);
      alerts.push(
        `⚠️ Seu valor está ${percentage}% abaixo da média de mercado`
      );
    }

    // Alerta de margem baixa
    if (recommended < basePrice * 0.9) {
      alerts.push(
        "⚠️ Margem está muito apertada para este tipo de serviço"
      );
    }

    // Alerta para complexidade alta
    if (complexity === "alta" && recommended < basePrice * 1.2) {
      alerts.push(
        "⚠️ Serviço com alta complexidade merece preço mais elevado"
      );
    }

    return alerts.slice(0, 3); // Máximo 3 alertas
  }

  /**
   * Calcula o preço total de uma proposta com múltiplos serviços
   */
  static calculateProposalTotal(
    services: Array<{ price: number; quantity: number }>,
    discount: number = 0,
    extraFees: number = 0
  ): number {
    const subtotal = services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
    const total = subtotal - discount + extraFees;
    return Math.max(0, total); // Não permitir negativo
  }

  /**
   * Calcula a margem de lucro efetiva
   */
  static calculateMargin(
    revenue: number,
    costOfGoods: number
  ): number {
    if (revenue === 0) return 0;
    const margin = ((revenue - costOfGoods) / revenue) * 100;
    return Math.max(0, Math.min(100, margin)); // Entre 0 e 100%
  }
}

export default PricingEngine;
