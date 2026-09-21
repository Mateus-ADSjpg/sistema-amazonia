import { useEffect, useState } from 'react'
import { supabase, supabaseConfigurado } from '../supabase'
import GerenciarMembros from './GerenciarMembros'
import LoginSecretaria from './LoginSecretaria'
import { aviso, botaoPequeno, cores } from './estilosPainel'

export default function PainelSecretaria({ onVoltar }) {
  const [sessao, setSessao] = useState(null)
  const [carregandoSessao, setCarregandoSessao] = useState(supabaseConfigurado)
  // Resultado da verificação de administrador para um usuário específico.
  // status: 'sim' | 'nao' | 'erro'
  const [verificacao, setVerificacao] = useState({ userId: null, status: null })

  // Acompanha login/logout (a sessão fica salva no navegador).
  useEffect(() => {
    if (!supabaseConfigurado) return

    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session)
      setCarregandoSessao(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSessao(novaSessao)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  // Pergunta ao banco se o usuário logado é administrador.
  const userId = sessao?.user?.id ?? null
  useEffect(() => {
    if (!userId) return
    let ativo = true

    supabase.rpc('eh_admin').then(({ data, error }) => {
      if (!ativo) return
      if (error) {
        console.error('Erro ao verificar administrador:', error)
        setVerificacao({ userId, status: 'erro' })
      } else {
        setVerificacao({ userId, status: data === true ? 'sim' : 'nao' })
      }
    })

    return () => {
      ativo = false
    }
  }, [userId])

  const statusAdmin = verificacao.userId === userId ? verificacao.status : null

  const sair = async () => {
    await supabase.auth.signOut()
  }

  let conteudo
  if (!supabaseConfigurado) {
    conteudo = (
      <div role="alert" style={aviso('erro')}>
        O painel está indisponível: a conexão com o banco de dados não foi configurada
        (variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY).
      </div>
    )
  } else if (carregandoSessao) {
    conteudo = <p style={{ color: cores.textoSecundario }}>Carregando…</p>
  } else if (!sessao) {
    conteudo = <LoginSecretaria />
  } else if (statusAdmin === null) {
    conteudo = <p style={{ color: cores.textoSecundario }}>Verificando permissões…</p>
  } else if (statusAdmin === 'erro') {
    conteudo = (
      <div role="alert" style={aviso('erro')}>
        Não foi possível verificar suas permissões. Tente de novo em instantes. Se o problema
        continuar, confira se o script <code>supabase/seguranca.sql</code> foi executado no Supabase.
      </div>
    )
  } else if (statusAdmin === 'nao') {
    conteudo = (
      <div role="alert" style={aviso('erro')}>
        A conta <strong>{sessao.user.email}</strong> não tem acesso ao Painel da Secretaria.
        Peça ao responsável pelo sistema para liberar o acesso.
      </div>
    )
  } else {
    conteudo = <GerenciarMembros />
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap', borderBottom: `1px solid ${cores.borda}`, paddingBottom: '10px' }}>
        <h2 style={{ color: cores.dourado, margin: 0 }}>🔐 Painel da Secretaria</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {sessao && (
            <>
              <span style={{ color: cores.textoSecundario, fontSize: '0.9rem' }}>{sessao.user.email}</span>
              <button onClick={sair} style={botaoPequeno('#6d2828')}>
                Sair
              </button>
            </>
          )}
          <button onClick={onVoltar} style={botaoPequeno(cores.borda)}>
            Voltar ao Site
          </button>
        </div>
      </div>
      {statusAdmin === 'sim' && sessao && (
        <p style={{ color: cores.textoSecundario, marginTop: '10px', textAlign: 'left' }}>
          Gerencie rapidamente os membros, unidades e contatos do clube.
        </p>
      )}

      {conteudo}
    </div>
  )
}
