import { describe, it, expect } from '@jest/globals';

// Simulação da lógica de priorização de IA
const aiPrioritizationService = {
  analyzePriority: (description: string): { priority: string; confidence: number; reason: string } => {
    const urgentKeywords = ['urgente', 'crítico', 'parado', 'não funciona', 'emergência', 'imediato'];
    const highKeywords = ['importante', 'problema', 'erro', 'falha', 'bug'];
    const lowKeywords = ['dúvida', 'sugestão', 'melhoria', 'pergunta'];

    const lowerDesc = description.toLowerCase();

    // Verifica palavras urgentes
    const urgentMatch = urgentKeywords.some((keyword) => lowerDesc.includes(keyword));
    if (urgentMatch) {
      return {
        priority: 'URGENT',
        confidence: 0.9,
        reason: 'Contém palavras-chave de urgência',
      };
    }

    // Verifica palavras de alta prioridade
    const highMatch = highKeywords.some((keyword) => lowerDesc.includes(keyword));
    if (highMatch) {
      return {
        priority: 'HIGH',
        confidence: 0.75,
        reason: 'Contém palavras-chave de alta prioridade',
      };
    }

    // Verifica palavras de baixa prioridade
    const lowMatch = lowKeywords.some((keyword) => lowerDesc.includes(keyword));
    if (lowMatch) {
      return {
        priority: 'LOW',
        confidence: 0.7,
        reason: 'Contém palavras-chave de baixa prioridade',
      };
    }

    // Default: média prioridade
    return {
      priority: 'MEDIUM',
      confidence: 0.5,
      reason: 'Sem palavras-chave identificadas',
    };
  },

  analyzeCategory: (description: string): { category: string; confidence: number } => {
    const categories = {
      TI: ['computador', 'sistema', 'rede', 'internet', 'software', 'hardware', 'login', 'senha'],
      RH: ['férias', 'salário', 'benefício', 'ponto', 'folga', 'admissão', 'demissão'],
      FINANCEIRO: ['pagamento', 'reembolso', 'nota fiscal', 'fatura', 'cobrança'],
      FACILITIES: ['manutenção', 'limpeza', 'ar condicionado', 'sala', 'equipamento'],
    };

    const lowerDesc = description.toLowerCase();
    let bestMatch = { category: 'GERAL', confidence: 0.3 };

    for (const [category, keywords] of Object.entries(categories)) {
      const matches = keywords.filter((keyword) => lowerDesc.includes(keyword));
      if (matches.length > 0) {
        const confidence = Math.min(0.6 + matches.length * 0.1, 0.95);
        if (confidence > bestMatch.confidence) {
          bestMatch = { category, confidence };
        }
      }
    }

    return bestMatch;
  },
};

describe('AI Prioritization Service - Unit Tests', () => {
  describe('analyzePriority', () => {
    it('deve identificar prioridade URGENT com palavras-chave críticas', () => {
      const descriptions = [
        'Sistema parado! Urgente!',
        'Servidor não funciona - emergência',
        'Crítico: aplicação travada',
      ];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzePriority(desc);
        expect(result.priority).toBe('URGENT');
        expect(result.confidence).toBeGreaterThanOrEqual(0.8);
      });
    });

    it('deve identificar prioridade HIGH com palavras-chave de problema', () => {
      const descriptions = ['Bug no sistema de login', 'Erro ao salvar dados', 'Falha importante no processo'];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzePriority(desc);
        expect(result.priority).toBe('HIGH');
        expect(result.confidence).toBeGreaterThanOrEqual(0.7);
      });
    });

    it('deve identificar prioridade LOW com palavras-chave simples', () => {
      const descriptions = ['Dúvida sobre o sistema', 'Sugestão de melhoria', 'Pergunta sobre funcionalidade'];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzePriority(desc);
        expect(result.priority).toBe('LOW');
      });
    });

    it('deve identificar prioridade MEDIUM quando não há palavras-chave', () => {
      const description = 'Preciso de ajuda com uma tarefa';
      const result = aiPrioritizationService.analyzePriority(description);

      expect(result.priority).toBe('MEDIUM');
      expect(result.confidence).toBeLessThan(0.7);
    });

    it('deve ser case-insensitive', () => {
      const result1 = aiPrioritizationService.analyzePriority('URGENTE: SISTEMA PARADO');
      const result2 = aiPrioritizationService.analyzePriority('urgente: sistema parado');

      expect(result1.priority).toBe(result2.priority);
    });
  });

  describe('analyzeCategory', () => {
    it('deve identificar categoria TI', () => {
      const descriptions = ['Problema no computador', 'Internet não funciona', 'Esqueci minha senha'];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzeCategory(desc);
        expect(result.category).toBe('TI');
        expect(result.confidence).toBeGreaterThan(0.5);
      });
    });

    it('deve identificar categoria RH', () => {
      const descriptions = ['Solicitação de férias', 'Dúvida sobre salário', 'Problema com ponto'];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzeCategory(desc);
        expect(result.category).toBe('RH');
      });
    });

    it('deve identificar categoria FINANCEIRO', () => {
      const descriptions = ['Reembolso de despesas', 'Nota fiscal pendente', 'Problema com pagamento'];

      descriptions.forEach((desc) => {
        const result = aiPrioritizationService.analyzeCategory(desc);
        expect(result.category).toBe('FINANCEIRO');
      });
    });

    it('deve retornar GERAL quando não identificar categoria', () => {
      const description = 'Preciso de ajuda genérica';
      const result = aiPrioritizationService.analyzeCategory(description);

      expect(result.category).toBe('GERAL');
      expect(result.confidence).toBeLessThan(0.5);
    });

    it('deve aumentar confiança com múltiplas palavras-chave', () => {
      const desc1 = 'Problema no computador';
      const desc2 = 'Problema no computador e internet, preciso de login e senha';

      const result1 = aiPrioritizationService.analyzeCategory(desc1);
      const result2 = aiPrioritizationService.analyzeCategory(desc2);

      expect(result2.confidence).toBeGreaterThan(result1.confidence);
    });
  });
});
