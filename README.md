# Axion — Plataforma de Gestão Empresarial

Axion é uma plataforma SaaS completa de gestão para MEIs, autônomos e pequenas empresas. Desenvolvida com foco em simplicidade, integração total entre módulos e acessibilidade para empreendedores que precisam de controle real do seu negócio.

---

## Funcionalidades

### Vendas
- Orçamentos com itens, descontos e aprovação integrada
- Pedidos de venda com controle de status e comissões
- Geração automática de contas a receber ao concluir vendas

### Operacional
- Gestão de clientes e fornecedores
- Controle de serviços com vínculo a clientes
- Ordens de serviço com diagnóstico, técnico e equipamento
- Equipamentos dos clientes em atendimento
- Agenda com calendário visual, tipos de eventos e prioridades

### Gestão de Equipe
- Cadastro de funcionários com salário, horário e escala
- Controle de adiantamentos, vales e reembolsos
- Gestão de férias com cálculo automático de dias
- Registro de ponto com cálculo de horas extras

### Estoque
- Controle de produtos com estoque mínimo
- Movimentações de entrada e saída com custo médio
- Geração automática de conta a pagar em compras

### Financeiro
- Visão geral com gráficos de fluxo de caixa
- Contas a pagar e a receber com vencimento e status
- Contas bancárias com saldo em tempo real
- Transferências entre contas com atualização automática de saldo
- Relatórios completos: DRE, fluxo de caixa, balancete

### Fiscal
- Registro e controle de notas fiscais (NF-e, NFS-e, NFC-e)
- Apuração de impostos por período com cálculo automático
- Integração com contas a pagar ao registrar tributos

### Contabilidade
- Lançamentos contábeis com débito e crédito
- Livro Diário e Livro Razão
- Balancete de verificação
- DRE contábil
- Balanço Patrimonial simplificado

### Inteligência
- Central de controle com alertas automáticos de todas as áreas
- Saúde do negócio com score e 10 indicadores
- Assistente de IA com acesso a todos os dados do negócio (Groq / LLaMA)

### Educação
- Módulo de educação financeira com lições práticas
- Simulador de precificação com cálculo de margem, impostos e markup

### Notificações
- Alertas automáticos de estoque baixo, contas vencidas, OS abertas e mais
- Lembretes personalizados com frequência configurável

---

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 19 + Vite |
| Estilização | Tailwind CSS v3 |
| Backend / Banco | Supabase (PostgreSQL + Auth + RLS) |
| Gráficos | Recharts |
| IA | Groq API (LLaMA 3.3 70B) |
| Deploy | Vercel |

---

## Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Button, Input, Modal, Card
│   ├── Sidebar.jsx      # Navegação lateral com submenus
│   ├── Calendar.jsx     # Calendário visual da agenda
│   ├── HelpWidget.jsx   # Widget flutuante de ajuda
│   ├── Footer.jsx       # Rodapé com links
│   ├── PageHeader.jsx   # Header para páginas externas
│   └── SplashScreen.jsx # Tela de carregamento inicial
├── contexts/            # Contextos React
│   ├── AuthContext.jsx  # Autenticação com Supabase
│   ├── BusinessContext.jsx # Negócio ativo
│   └── ThemeContext.jsx # Dark / Light mode
├── layouts/
│   └── BusinessLayout.jsx # Layout principal com sidebar
├── pages/
│   ├── auth/            # Login, Cadastro, Recuperar senha
│   ├── dashboard/       # Seleção e criação de negócio
│   ├── business/        # Todos os módulos do negócio
│   ├── education/       # Educação financeira e simulador
│   └── settings/        # Configurações de perfil
└── services/
    └── financeService.js # Integração financeira automática
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Chave de API no [Groq](https://console.groq.com) (para o assistente de IA)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/amquaresma/axion-saas.git
cd axion-saas

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
VITE_GROQ_API_KEY=sua_chave_da_api_groq
```

### Executar

```bash
npm run dev
```

Acesse `http://localhost:5173`

---

## Deploy

O projeto está configurado para deploy automático na Vercel a cada push na branch `main`.

Acesse em produção: [axion-saas.vercel.app](https://axion-saas.vercel.app)

---

## Arquitetura de integração financeira

Todos os módulos operacionais geram lançamentos financeiros automaticamente:

```
OS concluída        →  Conta a receber
Serviço concluído   →  Conta a receber
Orçamento aprovado  →  Conta a receber
Pedido entregue     →  Conta a receber + Comissão a pagar
Compra de estoque   →  Conta a pagar
Salário gerado      →  Conta a pagar
Imposto apurado     →  Conta a pagar
Adiantamento        →  Conta a pagar
```

---

## Autor

**Matheus Quaresma**  
Estudante de Engenharia da Computação SENAC - Ciencia de Dados - UNIVESP

Desenvolvedor independente

- LinkedIn: [linkedin.com/in/matheus-quaresma](https://www.linkedin.com/in/matheus-quaresma-/)
- GitHub: [github.com/amquaresma](https://github.com/amquaresma)

---

## Licença

Este projeto é de uso pessoal e educacional. Todos os direitos reservados ao autor.
