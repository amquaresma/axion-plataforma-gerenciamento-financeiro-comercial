import { useEffect, useState } from 'react'

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const duration = 2000
    const interval = 20
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      setProgress(Math.min((current / steps) * 100, 100))
      if (current >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(onFinish, 400)
        }, 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`fixed inset-0 z-[9999] bg-gray-950 flex flex-col items-center justify-center transition-opacity duration-400 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img src="/assets/logo.jpg" alt="Axion" className="w-20 h-20 rounded-2xl object-cover shadow-2xl" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight">Axion</h1>
            <p className="text-gray-400 text-sm mt-1">Gestão simplificada para o seu negócio</p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="w-64">
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div
              className="h-1 rounded-full bg-blue-600 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-gray-600 mt-3">Carregando...</p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-gray-700">Desenvolvido por Matheus Quaresma</p>
      </div>
    </div>
  )
}
