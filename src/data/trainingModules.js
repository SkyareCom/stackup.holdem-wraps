import { PLAN_IDS } from "../config/product";

export const TRAINING_MODULES = Object.freeze([
  {
    id: "omaha-hi",
    title: "OMAHA HI",
    tag: "PLO",
    symbol: "♠",
    requiredPlan: PLAN_IDS.FREE,
    description:
      "Omaha tradicional: a melhor mão de cinco cartas ganha todo o pote. Normalmente jogado no formato Pot-Limit Omaha.",
  },
  {
    id: "omaha-hi-lo",
    title: "OMAHA HI-LO",
    tag: "8 OR BETTER",
    symbol: "8",
    requiredPlan: PLAN_IDS.FREE,
    description:
      "O pote é dividido: metade para a melhor mão alta e metade para a melhor mão baixa válida, com cartas de oito ou menores.",
  },
  {
    id: "omaha-5",
    title: "OMAHA DE 5 CARTAS",
    tag: "5-CARD PLO",
    symbol: "5",
    requiredPlan: PLAN_IDS.FREE,
    description:
      "Cada jogador recebe cinco cartas fechadas, aumentando as combinações disponíveis, a conectividade e a volatilidade.",
  },
  {
    id: "omaha-6",
    title: "OMAHA DE 6 CARTAS",
    tag: "6-CARD",
    symbol: "6",
    requiredPlan: PLAN_IDS.FREE,
    description:
      "Cada participante recebe seis cartas no pré-flop, exigindo ainda mais rigor na seleção e leitura das combinações.",
  },
  {
    id: "courchevel",
    title: "COURCHEVEL",
    tag: "VARIANTE ESPECIAL",
    symbol: "C",
    requiredPlan: PLAN_IDS.FREE,
    featured: true,
    description:
      "Semelhante ao Omaha de 5 cartas, mas uma carta do flop é revelada antes da primeira rodada de apostas.",
  },
]);