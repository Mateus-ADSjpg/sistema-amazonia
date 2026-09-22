import { useState } from 'react'
import { supabase } from '../../supabase'
import { aviso, botao, campo, cartao, cores } from './estilosPainel'

function traduzirErro(error) {
  if (error.code === 'invalid_credentials' || /invalid login credentials/i.test(error.message)) {
    return 'E-mail ou senha incorretos.'
  }
  if (error.code === 'email_not_confirmed' || /email not confirmed/i.test(error.message)) {
    return 'Este e-mail ainda não foi confirmado. Peça ao responsável pelo sistema para confirmar a conta no Supabase.'
  }
  if (error.status === 429 || /rate limit/i.test(error.message)) {
    return 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.'
  }
  if (/fetch|network/i.test(error.message)) {
    return 'Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.'
  }
  return 'Não foi possível entrar. Tente de novo em instantes.'
}

export default function LoginSecretaria() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [entrando, setEntrando] = useState(false)

  const entrar = async (e) => {
    e.preventDefault()
    setErro('')
    setEntrando(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    })

    setEntrando(false)
    if (error) {
      console.error('Erro no login:', error)
      setErro(traduzirErro(error))
    }
    // Se deu certo, o PainelSecretaria percebe a nova sessão sozinho.
  }

  return (
    <form onSubmit={entrar} style={{ ...cartao, maxWidth: '400px', margin: '30px auto' }}>
      <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '5px' }}>Acesso restrito</h3>
      <p style={{ color: cores.textoSecundario, marginBottom: '20px' }}>
        Entre com a conta da secretaria para gerenciar os membros.
      </p>

      <label htmlFor="login-email" style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>
        E-mail
      </label>
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ ...campo, marginBottom: '15px' }}
      />

      <label htmlFor="login-senha" style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>
        Senha
      </label>
      <input
        id="login-senha"
        type="password"
        autoComplete="current-password"
        required
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ ...campo, marginBottom: '20px' }}
      />

      {erro && (
        <div role="alert" style={aviso('erro')}>
          {erro}
        </div>
      )}

      <button type="submit" disabled={entrando} style={{ ...botao(), width: '100%', opacity: entrando ? 0.7 : 1 }}>
        {entrando ? 'Entrando…' : 'Entrar'}
      </button>

      <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '15px', marginBottom: 0 }}>
        Esqueceu a senha? Fale com o responsável pelo sistema.
      </p>
    </form>
  )
}
