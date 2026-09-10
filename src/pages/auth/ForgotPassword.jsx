import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { AxionLogo } from '../../components/AxionLogo'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) { setError('Informe o email.'); return }
    setLoading(true); setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) { setError('Erro ao enviar email. Verifique o endereço informado.'); setLoading(false); return }
    setSent(true); setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center gap-3">
          <AxionLogo />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Recuperar senha</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-green-600 dark:text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Email enviado!</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Verifique a caixa de entrada de <span className="font-medium text-gray-900 dark:text-white">{email}</span></p>
            </div>

            <div className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-left">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Como redefinir sua senha:</p>
              <ol className="flex flex-col gap-2">
                <li className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  Abra o email enviado pelo <span className="font-medium mx-1">Supabase</span> na sua caixa de entrada
                </li>
                <li className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  Clique no link <span className="font-medium mx-1">"Reset Password"</span> dentro do email
                </li>
                <li className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  Você será redirecionado para criar sua nova senha
                </li>
              </ol>
            </div>

            <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3">
              <p className="text-xs text-yellow-700 dark:text-yellow-400">Nao encontrou o email? Verifique a pasta de spam ou lixo eletrônico.</p>
            </div>

            <Link to="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
              Voltar para o login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input label="Email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar link de recuperação'}</Button>
            </form>

            <div className="mt-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                O email será enviado pelo <span className="font-medium text-gray-700 dark:text-gray-300">Supabase</span>. Verifique também sua pasta de spam.
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Lembrou a senha?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Entrar</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
