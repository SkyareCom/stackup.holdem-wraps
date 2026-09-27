# Scaling Architecture — Omaha Poker Pro

## Objetivo

Este app deve escalar como produto independente dentro do ecossistema STACKUP HOLD'EM.

## Fronteiras do produto

O app mantém sob sua responsabilidade:
- catálogo e regras de treinamento Omaha;
- progresso específico do produto;
- estatísticas específicas do produto;
- FREE / EDGE / FULL deste produto;
- funil e métricas deste produto;
- retenção e evolução deste produto.

Serviços compartilháveis futuramente:
- STACKUP ID;
- analytics central;
- pagamentos/orquestração de assinaturas;
- cupons e benefícios;
- cross-sell entre produtos.

## Estrutura atual

- `src/config`: identidade do produto e variáveis de ambiente;
- `src/domain`: regras de plano e entitlement;
- `src/data`: catálogo de treinamento;
- `src/services`: analytics, API, sessão e entitlement;
- `src/features`: telas e fluxos do produto;
- `src/components`: componentes transversais;
- `.github/workflows`: validação automática de build.

## Regras de escala

1. Nenhuma regra comercial deve depender diretamente de componentes visuais.
2. Toda chamada futura de backend deve passar por `apiClient`.
3. Todo evento deve incluir `product=omaha`.
4. STACKUP ID deve fornecer identidade, nunca misturar progresso entre produtos.
5. Assinatura do Omaha deve permanecer independente de Grinder, Academy e EVO.
6. Novos recursos devem entrar por feature/domain, não crescer dentro de um único `App.jsx`.

## Evolução recomendada

### Até 1.000 usuários
- SPA + API gerenciada;
- Postgres gerenciado;
- armazenamento de assets em object storage/CDN;
- autenticação gerenciada;
- analytics de produto;
- backups automáticos.

### 1.000–10.000
- cache para conteúdo estático;
- filas apenas para tarefas assíncronas reais;
- observabilidade de erros e latência;
- índices e análise de queries;
- separação clara entre leitura de conteúdo e escrita de progresso.

### 10.000–100.000
- CDN agressiva para conteúdo;
- cache distribuído se necessário;
- workers para eventos, notificações e agregações;
- read replicas somente se métricas justificarem;
- rate limiting por usuário/IP.

### 100.000+
- autoscaling horizontal;
- filas desacopladas;
- particionamento apenas quando métricas comprovarem necessidade;
- isolamento operacional entre produtos;
- disaster recovery testado.

## Métricas obrigatórias

Eventos do produto devem permitir medir:
- app_open;
- training_viewed;
- training_started;
- training_completed;
- pricing_viewed;
- subscription_started;
- subscription_renewed;
- subscription_cancelled;
- free_to_edge;
- edge_to_full;
- cross_sell_viewed;
- cross_sell_converted.

Sempre incluir o identificador do produto.
