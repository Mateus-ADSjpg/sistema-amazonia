import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import { CARGOS } from '../../conteudo/clube'
import { NOMES_UNIDADES } from '../../conteudo/unidades'
import { aviso, botao, botaoPequeno, campo, cartao, cores } from './estilosPainel'

const FORMULARIO_VAZIO = {
  nome: '',
  unidade: NOMES_UNIDADES[0],
  cargo: CARGOS[0],
  telefone: '',
}

function consultarMembros() {
  return supabase
    .from('membros')
    .select('id, nome, unidade, cargo, telefone, criado_em')
    .order('criado_em', { ascending: false })
}

export default function GerenciarMembros() {
  const [membros, setMembros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [formulario, setFormulario] = useState(FORMULARIO_VAZIO)
  const [idEditando, setIdEditando] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'sucesso' | 'erro', texto }

  const aplicarResultado = useCallback(({ data, error }) => {
    if (error) {
      console.error('Erro ao buscar membros:', error)
      setMensagem({ tipo: 'erro', texto: 'Não foi possível carregar a lista de membros.' })
    } else {
      setMembros(data)
    }
    setCarregando(false)
  }, [])

  // Só roda quando o painel abre, ou seja, depois do login e da
  // verificação de administrador.
  useEffect(() => {
    let ativo = true
    consultarMembros().then((resultado) => {
      if (ativo) aplicarResultado(resultado)
    })
    return () => {
      ativo = false
    }
  }, [aplicarResultado])

  const buscarMembros = async () => aplicarResultado(await consultarMembros())

  const alterarCampo = (campoNome) => (e) =>
    setFormulario((atual) => ({ ...atual, [campoNome]: e.target.value }))

  const limparFormulario = () => {
    setFormulario(FORMULARIO_VAZIO)
    setIdEditando(null)
  }

  const salvar = async (e) => {
    e.preventDefault()
    const dados = {
      nome: formulario.nome.trim(),
      unidade: formulario.unidade,
      cargo: formulario.cargo,
      telefone: formulario.telefone.trim() || null,
    }

    if (!dados.nome) {
      setMensagem({ tipo: 'erro', texto: 'Preencha o nome do membro.' })
      return
    }

    setSalvando(true)
    setMensagem(null)

    const { error } = idEditando
      ? await supabase.from('membros').update(dados).eq('id', idEditando)
      : await supabase.from('membros').insert([dados])

    setSalvando(false)

    if (error) {
      console.error('Erro ao salvar membro:', error)
      // Mantém o que foi digitado para a pessoa poder tentar de novo.
      setMensagem({
        tipo: 'erro',
        texto: idEditando ? 'Erro ao atualizar o membro.' : 'Erro ao cadastrar o membro.',
      })
      return
    }

    setMensagem({
      tipo: 'sucesso',
      texto: idEditando ? 'Membro atualizado com sucesso!' : 'Membro cadastrado com sucesso!',
    })
    limparFormulario()
    buscarMembros()
  }

  const iniciarEdicao = (membro) => {
    setIdEditando(membro.id)
    setFormulario({
      nome: membro.nome,
      unidade: membro.unidade,
      cargo: membro.cargo,
      telefone: membro.telefone || '',
    })
    setMensagem(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const excluirMembro = async (membro) => {
    if (!window.confirm(`Tem certeza que deseja remover ${membro.nome}?`)) return

    const { error } = await supabase.from('membros').delete().eq('id', membro.id)
    if (error) {
      console.error('Erro ao excluir membro:', error)
      setMensagem({ tipo: 'erro', texto: 'Erro ao remover o membro.' })
      return
    }

    if (idEditando === membro.id) limparFormulario()
    setMensagem({ tipo: 'sucesso', texto: `${membro.nome} foi removido(a).` })
    buscarMembros()
  }

  return (
    <div>
      {/* Formulário */}
      <form onSubmit={salvar} style={{ ...cartao, margin: '20px 0' }}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '15px' }}>
          {idEditando ? '✏️ Editar Membro' : '➕ Novo Cadastro'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Nome Completo"
            aria-label="Nome completo"
            value={formulario.nome}
            onChange={alterarCampo('nome')}
            style={campo}
          />
          <select aria-label="Unidade" value={formulario.unidade} onChange={alterarCampo('unidade')} style={campo}>
            {NOMES_UNIDADES.map((uni) => (
              <option key={uni} value={uni}>
                Unidade {uni}
              </option>
            ))}
          </select>
          <select aria-label="Cargo" value={formulario.cargo} onChange={alterarCampo('cargo')} style={campo}>
            {CARGOS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Telefone / Contato"
            aria-label="Telefone"
            value={formulario.telefone}
            onChange={alterarCampo('telefone')}
            style={campo}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="submit" disabled={salvando} style={{ ...botao(idEditando ? '#d32f2f' : cores.verde), opacity: salvando ? 0.7 : 1 }}>
            {salvando ? 'Salvando…' : idEditando ? 'Salvar Alterações' : 'Cadastrar Membro'}
          </button>
          {idEditando && (
            <button type="button" onClick={limparFormulario} style={botao('#555')}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {mensagem && (
        <div role={mensagem.tipo === 'erro' ? 'alert' : 'status'} style={aviso(mensagem.tipo)}>
          {mensagem.texto}
        </div>
      )}

      {/* Tabela de Membros */}
      <h3 style={{ marginTop: '30px', textAlign: 'left' }}>Membros Cadastrados ({membros.length})</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', background: cores.fundoCartao, borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: cores.verde, color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Nome</th>
              <th style={{ padding: '12px' }}>Unidade</th>
              <th style={{ padding: '12px' }}>Cargo</th>
              <th style={{ padding: '12px' }}>Telefone</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                  Carregando membros…
                </td>
              </tr>
            ) : membros.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                  Nenhum membro cadastrado ainda.
                </td>
              </tr>
            ) : (
              membros.map((membro) => (
                <tr key={membro.id} style={{ borderBottom: '1px solid #222', textAlign: 'left' }}>
                  <td style={{ padding: '12px' }}>{membro.nome}</td>
                  <td style={{ padding: '12px' }}>{membro.unidade}</td>
                  <td style={{ padding: '12px' }}>{membro.cargo}</td>
                  <td style={{ padding: '12px' }}>{membro.telefone || '-'}</td>
                  <td style={{ padding: '12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <button onClick={() => iniciarEdicao(membro)} style={{ ...botaoPequeno(cores.azul), marginRight: '5px' }}>
                      Editar
                    </button>
                    <button onClick={() => excluirMembro(membro)} style={botaoPequeno(cores.vermelho)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
