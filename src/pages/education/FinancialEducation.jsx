import { useState } from 'react'

const modules = [
  {
    id: 'fundamentos',
    title: 'Fundamentos Financeiros',
    icon: '🏛️',
    color: 'blue',
    lessons: [
      {
        title: 'O que é fluxo de caixa?',
        content: 'Fluxo de caixa é o controle de todo dinheiro que entra e sai do seu negócio. É a fotografia financeira da sua empresa em tempo real.',
        example: 'Exemplo: Você vendeu R$ 10.000 em janeiro, mas recebeu apenas R$ 6.000 (o resto é a prazo). Suas despesas foram R$ 7.000. Seu fluxo de caixa é NEGATIVO (-R$ 1.000), mesmo tendo faturado bem.',
        action: 'Como aplicar: Registre TODAS as entradas e saídas no módulo Financeiro > Visão Geral todos os dias.',
        alert: null,
      },
      {
        title: 'Lucro vs. Faturamento',
        content: 'Faturamento é o total que você vendeu. Lucro é o que sobrou depois de pagar todos os custos. Muitas empresas faturam muito mas lucram pouco.',
        example: 'Exemplo: Faturou R$ 50.000, mas teve R$ 45.000 em custos. Lucro = apenas R$ 5.000 (10% de margem).',
        action: 'Como aplicar: Acompanhe sua margem de lucro no módulo Relatórios > DRE todo mês.',
        alert: 'Atenção: Não confunda dinheiro em conta com lucro. Parte do que está na conta pode ser de clientes que ainda não pagaram.',
      },
      {
        title: 'Capital de giro',
        content: 'Capital de giro é o dinheiro necessário para manter o negócio funcionando enquanto você aguarda os recebimentos. É a "gasolina" da empresa.',
        example: 'Exemplo: Você compra produtos (paga à vista) e vende a prazo (recebe em 30 dias). Precisa de capital de giro para cobrir esse intervalo.',
        action: 'Como calcular: Some suas contas a pagar nos próximos 30 dias e subtraia o que você tem a receber no mesmo período.',
        alert: 'Falta de capital de giro é a principal causa de falência de pequenas empresas!',
      },
    ]
  },
  {
    id: 'gestao',
    title: 'Gestão Financeira',
    icon: '📊',
    color: 'green',
    lessons: [
      {
        title: 'Regra 50-30-20',
        content: 'Uma regra simples para distribuir sua receita: 50% para custos operacionais, 30% para investimento no negócio, 20% para reserva e lucro do dono.',
        example: 'Exemplo: Receita de R$ 20.000/mês → R$ 10.000 custos, R$ 6.000 investimento, R$ 4.000 reserva/lucro.',
        action: 'Como aplicar: Categorize suas despesas no Axion e acompanhe o percentual de cada grupo mensalmente.',
        alert: null,
      },
      {
        title: 'Reserva de emergência',
        content: 'Todo negócio precisa de uma reserva equivalente a 3-6 meses de custos fixos. Ela protege você de imprevistos como queda nas vendas, consertos emergenciais etc.',
        example: 'Exemplo: Custos fixos de R$ 5.000/mês → Reserva ideal: R$ 15.000 a R$ 30.000.',
        action: 'Como construir: Separe 10-20% do lucro mensal até atingir a reserva ideal. Use uma conta separada.',
        alert: 'Nunca use a reserva de emergência para investimentos ou despesas planejadas.',
      },
      {
        title: 'Separar finanças pessoais e empresariais',
        content: 'Misturar finanças pessoais e empresariais é um dos erros mais graves. Você perde controle de ambas e não consegue saber se o negócio é realmente lucrativo.',
        example: 'Solução: Tenha uma conta bancária exclusiva para o negócio. Defina um pró-labore fixo para você mesmo.',
        action: 'Como aplicar: Abra uma conta PJ, registre todas as movimentações no Axion e pague-se um salário fixo.',
        alert: 'Retirar dinheiro aleatoriamente da conta da empresa é um erro que leva muitos negócios à falência.',
      },
    ]
  },
  {
    id: 'crescimento',
    title: 'Crescimento e Investimento',
    icon: '🚀',
    color: 'purple',
    lessons: [
      {
        title: 'Quando reinvestir no negócio?',
        content: 'Reinvista quando: sua margem está acima de 20%, você tem reserva de emergência completa e o investimento tem retorno claro e mensurável.',
        example: 'Bons investimentos: equipamentos que aumentam produção, marketing que traz retorno comprovado, treinamento de equipe.',
        action: 'Como decidir: Calcule o ROI (Retorno sobre Investimento) antes de qualquer compra grande: ROI = (Ganho - Custo) / Custo × 100.',
        alert: null,
      },
      {
        title: 'Indicadores essenciais (KPIs)',
        content: 'Todo empreendedor precisa acompanhar: Margem de lucro, Ticket médio, Custo de aquisição de cliente (CAC), Taxa de retenção e Giro de estoque.',
        example: 'Exemplo de meta: Margem > 25%, Ticket médio crescendo 5% ao mês, CAC menor que o lucro da primeira venda.',
        action: 'Como aplicar: Use o módulo Saúde do Negócio e Relatórios do Axion para acompanhar seus KPIs mensalmente.',
        alert: null,
      },
      {
        title: 'Planejamento financeiro anual',
        content: 'Todo início de ano, defina metas financeiras claras: faturamento alvo, margem desejada, investimentos planejados e reserva a construir.',
        example: 'Meta SMART: "Faturar R$ 30.000/mês com margem de 30% até dezembro, construindo reserva de R$ 20.000".',
        action: 'Como aplicar: Use o módulo de Relatórios para analisar o histórico e defina metas realistas baseadas em dados reais.',
        alert: 'Metas sem prazo são apenas sonhos. Metas sem dados são apenas chutes.',
      },
    ]
  },
  {
    id: 'impostos',
    title: 'Impostos e Obrigações',
    icon: '📄',
    color: 'orange',
    lessons: [
      {
        title: 'Regimes tributários',
        content: 'MEI: Faturamento até R$ 81.000/ano, imposto fixo mensal. Simples Nacional: Até R$ 4,8M/ano, alíquota de 4-19,5%. Lucro Presumido/Real: Para empresas maiores.',
        example: 'MEI paga em média R$ 67/mês. Simples Nacional paga % sobre o faturamento. Escolha errada pode custar muito dinheiro!',
        action: 'Consulte um contador para escolher o melhor regime para o seu negócio. O Axion ajuda a controlar os impostos no módulo Fiscal.',
        alert: 'Trocar de regime tributário pode gerar grandes economias. Reavalie anualmente.',
      },
      {
        title: 'DAS e obrigações do MEI',
        content: 'O MEI deve pagar o DAS mensalmente, fazer a DASN-SIMEI anualmente (declaração) e emitir nota fiscal para empresas (pessoas jurídicas).',
        example: 'Esqueceu de pagar o DAS? Gera multa de 2% + 0,33% ao dia. Após 3 meses sem pagar, pode perder o CNPJ.',
        action: 'Como controlar: Registre o pagamento do DAS todo mês no módulo Apuração de Impostos do Axion.',
        alert: 'Nunca atrase o pagamento do DAS. Configure um lembrete recorrente no Axion!',
      },
    ]
  },
]

const colorClasses = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400', badge: 'bg-blue-600' },
  green: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', icon: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400', badge: 'bg-green-600' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400', badge: 'bg-purple-600' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', icon: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400', badge: 'bg-orange-600' },
}

export function FinancialEducation() {
  const [activeModule, setActiveModule] = useState('fundamentos')
  const [expandedLesson, setExpandedLesson] = useState(null)

  const currentModule = modules.find(m => m.id === activeModule)
  const colors = colorClasses[currentModule?.color || 'blue']

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Educação Financeira</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Aprenda conceitos essenciais para gerir seu negócio com mais inteligência.</p>
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {modules.map((mod) => {
          const c = colorClasses[mod.color]
          const isActive = activeModule === mod.id
          return (
            <button key={mod.id} onClick={() => { setActiveModule(mod.id); setExpandedLesson(null) }}
              className={`p-4 rounded-xl border text-left transition-all ${isActive ? `${c.bg} ${c.border}` : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
              <span className="text-2xl block mb-2">{mod.icon}</span>
              <p className={`text-sm font-medium ${isActive ? '' : 'text-gray-700 dark:text-gray-300'}`}>{mod.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{mod.lessons.length} lições</p>
            </button>
          )
        })}
      </div>

      {/* Lições do módulo ativo */}
      <div className="flex flex-col gap-4">
        {currentModule?.lessons.map((lesson, i) => {
          const isExpanded = expandedLesson === i
          return (
            <div key={i} className={`bg-white dark:bg-gray-900 border rounded-xl overflow-hidden transition-all ${isExpanded ? `border-gray-300 dark:border-gray-700 shadow-sm` : 'border-gray-200 dark:border-gray-800'}`}>
              <button onClick={() => setExpandedLesson(isExpanded ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full ${colors.badge} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{i + 1}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{lesson.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 flex flex-col gap-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{lesson.content}</p>

                  <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Exemplo prático</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{lesson.example}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Como aplicar no Axion</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{lesson.action}</p>
                  </div>

                  {lesson.alert && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-sm text-red-700 dark:text-red-400 font-medium">⚠ {lesson.alert}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
