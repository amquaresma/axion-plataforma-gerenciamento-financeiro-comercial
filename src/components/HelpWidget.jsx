import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const helpSections = [
  {
    title: 'Primeiros passos',
    icon: '🚀',
    items: [
      { label: 'Criar um negócio', desc: 'Comece cadastrando seu negócio', action: '/dashboard/new' },
      { label: 'Cadastrar clientes', desc: 'Adicione seus primeiros clientes', path: 'clientes' },
      { label: 'Registrar um serviço', desc: 'Crie serviços e vincule a clientes', path: 'servicos' },
      { label: 'Lançar uma receita', desc: 'Registre entradas no financeiro', path: 'financeiro' },
    ]
  },
  {
    title: 'Financeiro',
    icon: '💰',
    items: [
      { label: 'Contas a pagar/receber', desc: 'Controle seus compromissos', path: 'contas' },
      { label: 'Contas bancárias', desc: 'Gerencie saldos e bancos', path: 'bancos' },
      { label: 'Ver relatórios', desc: 'DRE, fluxo de caixa e mais', path: 'relatorios' },
      { label: 'Apurar impostos', desc: 'Calcule e controle tributos', path: 'impostos' },
    ]
  },
  {
    title: 'Operacional',
    icon: '🔧',
    items: [
      { label: 'Abrir uma OS', desc: 'Ordem de serviço para clientes', path: 'ordens-servico' },
      { label: 'Criar orçamento', desc: 'Envie propostas comerciais', path: 'orcamentos' },
      { label: 'Agendar compromisso', desc: 'Use a agenda para organizar', path: 'agenda' },
      { label: 'Controlar estoque', desc: 'Gerencie produtos e peças', path: 'estoque' },
    ]
  },
  {
    title: 'Gestão',
    icon: '👥',
    items: [
      { label: 'Cadastrar funcionário', desc: 'Adicione sua equipe', path: 'funcionarios' },
      { label: 'Registrar ponto', desc: 'Controle de horas trabalhadas', path: 'horas' },
      { label: 'Agendar férias', desc: 'Planeje o calendário da equipe', path: 'ferias' },
      { label: 'Ver saúde do negócio', desc: 'Score e indicadores gerais', path: 'saude' },
    ]
  },
  {
    title: 'Aprender',
    icon: '📚',
    items: [
      { label: 'Educação financeira', desc: 'Aprenda a gerir seu dinheiro', path: 'educacao' },
      { label: 'Simular preços', desc: 'Calcule o preço ideal', path: 'precificacao' },
      { label: 'Assistente de IA', desc: 'Pergunte sobre seu negócio', path: 'ia' },
      { label: 'Central de controle', desc: 'Veja todas as pendências', path: 'controle' },
    ]
  },
]

export function HelpWidget({ businessId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const navigate = useNavigate()

  function handleItemClick(item) {
    if (item.action) {
      navigate(item.action)
    } else if (businessId && item.path) {
      navigate(`/b/${businessId}/${item.path}`)
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-white font-semibold text-sm">Central de Ajuda</h3>
              <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-blue-200 text-xs">O que você quer fazer agora?</p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            {helpSections.map((section, i) => (
              <button key={i} onClick={() => setActiveSection(i)}
                className={`flex-shrink-0 px-3 py-2.5 text-xs font-medium transition-colors ${activeSection === i ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-900' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                {section.icon} {section.title}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="p-3 flex flex-col gap-1 max-h-64 overflow-y-auto">
            {helpSections[activeSection].items.map((item, i) => (
              <button key={i} onClick={() => handleItemClick(item)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.desc}</p>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Axion — sua gestão simplificada</p>
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-gray-700 dark:bg-gray-600 rotate-45' : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>
        )}
      </button>
    </div>
  )
}
