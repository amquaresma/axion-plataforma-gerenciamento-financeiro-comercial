import { useState } from 'react'

export function PricingSimulator() {
  const [form, setForm] = useState({
    custoMaterial: '', custoMaoObra: '', custosFixos: '',
    impostos: '6', comissao: '0', margem: '30', concorrencia: ''
  })
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculadora')

  function calcular() {
    const custoMaterial = parseFloat(form.custoMaterial) || 0
    const custoMaoObra = parseFloat(form.custoMaoObra) || 0
    const custosFixos = parseFloat(form.custosFixos) || 0
    const impostos = parseFloat(form.impostos) || 0
    const comissao = parseFloat(form.comissao) || 0
    const margem = parseFloat(form.margem) || 0

    const custoTotal = custoMaterial + custoMaoObra + custosFixos
    const percentualSaidas = impostos + comissao
    const divisor = 1 - ((percentualSaidas + margem) / 100)
    const precoFinal = divisor > 0 ? custoTotal / divisor : 0

    const valorImpostos = precoFinal * (impostos / 100)
    const valorComissao = precoFinal * (comissao / 100)
    const valorMargem = precoFinal * (margem / 100)
    const markup = custoTotal > 0 ? ((precoFinal / custoTotal - 1) * 100) : 0

    setResult({
      custoTotal, precoFinal, valorImpostos, valorComissao,
      valorMargem, markup, percentualSaidas,
      concorrencia: parseFloat(form.concorrencia) || 0,
    })
  }

  const fmt = (val) => `R$ ${Number(val || 0).toFixed(2).replace('.', ',')}`

  const lessons = [
    {
      title: 'O que é precificação?',
      icon: '💡',
      content: 'Precificação é o processo de determinar quanto cobrar pelo seu produto ou serviço. Um preço mal calculado pode fazer você trabalhar no prejuízo sem perceber.',
      tip: 'Dica: Muitos empreendedores erram ao precificar apenas baseado na concorrência, sem calcular seus próprios custos.'
    },
    {
      title: 'Custos fixos vs variáveis',
      icon: '📊',
      content: 'Custos fixos são gastos que existem independente de você vender ou não (aluguel, salários, internet). Custos variáveis mudam conforme a produção (material, comissão, embalagem).',
      tip: 'Dica: Divida seus custos fixos mensais pelo número de produtos/serviços que você vende para saber quanto cada um precisa cobrir.'
    },
    {
      title: 'Margem de lucro',
      icon: '📈',
      content: 'A margem de lucro é o percentual do preço final que representa lucro real. Uma margem de 20% significa que de cada R$ 100 vendidos, R$ 20 são lucro líquido.',
      tip: 'Dica: Margem abaixo de 15% é arriscada. O ideal para serviços é entre 25-40%, e para produtos entre 30-50%.'
    },
    {
      title: 'Markup vs Margem',
      icon: '🔢',
      content: 'Markup é o percentual aplicado SOBRE o custo. Margem é o percentual do PREÇO FINAL. São conceitos diferentes! Markup de 100% = Margem de 50%. Não confunda!',
      tip: 'Exemplo: Custo R$ 100, Markup 100% = Preço R$ 200. Mas a margem é 50% (R$ 100 de lucro em R$ 200 de venda).'
    },
    {
      title: 'Impostos na precificação',
      icon: '📄',
      content: 'Os impostos devem ser calculados sobre o preço de venda, não sobre o custo. No Simples Nacional, a alíquota varia de 4% a 19,5% dependendo do faturamento e atividade.',
      tip: 'Dica: Sempre inclua os impostos no cálculo do preço. Esquecer os impostos é um dos erros mais comuns que levam empresas à falência.'
    },
    {
      title: 'Ponto de equilíbrio',
      icon: '⚖️',
      content: 'O ponto de equilíbrio (break-even) é o momento em que suas receitas cobrem exatamente seus custos totais. Abaixo disso você opera no prejuízo.',
      tip: 'Fórmula: Ponto de equilíbrio = Custos Fixos ÷ (1 - Custos Variáveis/Receita). Use a calculadora acima para simular diferentes cenários.'
    },
    {
      title: 'Estratégias de precificação',
      icon: '🎯',
      content: 'Existem várias estratégias: por custo (mais comum), por valor percebido (premium), por concorrência (arriscada) e dinâmica (varia conforme demanda).',
      tip: 'Recomendação: Calcule sempre pelo custo primeiro para garantir que não haverá prejuízo. Depois analise o mercado para posicionar o preço.'
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Simulador de Precificação</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Aprenda a precificar corretamente e calcule o preço ideal do seu produto ou serviço.</p>
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-800">
        {[['calculadora', 'Calculadora'], ['aprender', 'Aprender a Precificar']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={"px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px " + (activeTab === key ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300')}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'calculadora' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Informe seus custos</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Custo de material/insumo (R$)</label>
                <input type="number" placeholder="0,00" value={form.custoMaterial} onChange={e => setForm(f => ({ ...f, custoMaterial: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Matéria-prima, produtos, ingredientes</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Custo de mão de obra (R$)</label>
                <input type="number" placeholder="0,00" value={form.custoMaoObra} onChange={e => setForm(f => ({ ...f, custoMaoObra: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Seu tempo + funcionários (por unidade/serviço)</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Custos fixos por unidade (R$)</label>
                <input type="number" placeholder="0,00" value={form.custosFixos} onChange={e => setForm(f => ({ ...f, custosFixos: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Aluguel, energia, internet dividido pela produção</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Impostos (%)</label>
                  <input type="number" placeholder="6" value={form.impostos} onChange={e => setForm(f => ({ ...f, impostos: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Comissão (%)</label>
                  <input type="number" placeholder="0" value={form.comissao} onChange={e => setForm(f => ({ ...f, comissao: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Margem (%)</label>
                  <input type="number" placeholder="30" value={form.margem} onChange={e => setForm(f => ({ ...f, margem: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Preço da concorrência (R$) <span className="text-gray-400 font-normal">— opcional</span></label>
                <input type="number" placeholder="0,00" value={form.concorrencia} onChange={e => setForm(f => ({ ...f, concorrencia: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900" />
              </div>

              <button onClick={calcular}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
                Calcular preço ideal
              </button>
            </div>
          </div>

          {/* Resultado */}
          <div>
            {!result ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                <p className="text-4xl mb-3">🧮</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Preencha os dados e clique em calcular para ver o preço ideal.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Preço final */}
                <div className="bg-blue-600 rounded-xl p-6 text-white text-center">
                  <p className="text-sm text-blue-200 mb-1">Preço de venda sugerido</p>
                  <p className="text-4xl font-bold">{fmt(result.precoFinal)}</p>
                  <p className="text-sm text-blue-200 mt-1">Markup de {result.markup.toFixed(1)}%</p>
                </div>

                {/* Composição do preço */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Composição do preço</h3>
                  {[
                    { label: 'Custo total', value: result.custoTotal, color: 'text-gray-900 dark:text-white', pct: result.precoFinal > 0 ? (result.custoTotal / result.precoFinal * 100).toFixed(1) : 0 },
                    { label: `Impostos (${form.impostos}%)`, value: result.valorImpostos, color: 'text-red-500 dark:text-red-400', pct: parseFloat(form.impostos) },
                    { label: `Comissão (${form.comissao}%)`, value: result.valorComissao, color: 'text-orange-500 dark:text-orange-400', pct: parseFloat(form.comissao) },
                    { label: `Lucro (${form.margem}%)`, value: result.valorMargem, color: 'text-green-600 dark:text-green-400', pct: parseFloat(form.margem) },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${item.color}`}>{fmt(item.value)}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({item.pct}%)</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Análise vs concorrência */}
                {result.concorrencia > 0 && (
                  <div className={`rounded-xl p-4 border ${result.precoFinal <= result.concorrencia ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'}`}>
                    <p className="text-sm font-medium mb-1 text-gray-900 dark:text-white">Análise vs concorrência</p>
                    {result.precoFinal <= result.concorrencia ? (
                      <p className="text-sm text-green-700 dark:text-green-400">✓ Seu preço ({fmt(result.precoFinal)}) é competitivo! A concorrência cobra {fmt(result.concorrencia)}. Você tem R$ {(result.concorrencia - result.precoFinal).toFixed(2)} de margem para manobra.</p>
                    ) : (
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">⚠ Seu preço ({fmt(result.precoFinal)}) está {fmt(result.precoFinal - result.concorrencia)} acima da concorrência ({fmt(result.concorrencia)}). Considere reduzir custos ou justificar o valor agregado.</p>
                    )}
                  </div>
                )}

                {/* Alertas */}
                {parseFloat(form.margem) < 15 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-sm text-red-700 dark:text-red-400 font-medium">⚠ Margem muito baixa!</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">Uma margem abaixo de 15% é arriscada. Qualquer imprevisto pode virar prejuízo.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'aprender' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lesson.icon}</span>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{lesson.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{lesson.content}</p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-700 dark:text-blue-400">{lesson.tip}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
