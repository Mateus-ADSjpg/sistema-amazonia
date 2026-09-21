import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home') // 'home', 'sobre', 'unidades', 'fotos', 'contato', 'secretaria'
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('Suruí')

  // Estados do Backend (Painel da Secretaria)
  const [membros, setMembros] = useState([])
  const [nome, setNome] = useState('')
  const [unidade, setUnidade] = useState('Suruí')
  const [cargo, setCargo] = useState('Desbravador')
  const [telefone, setTelefone] = useState('')
  const [idEditando, setIdEditando] = useState(null)

  const buscarMembros = async () => {
    const { data, error } = await supabase
      .from('membros')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) console.error('Erro ao buscar:', error)
    else setMembros(data)
  }

  useEffect(() => {
    buscarMembros()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome || !unidade) {
      alert('Preencha o nome e a unidade!')
      return
    }

    if (idEditando) {
      const { error } = await supabase
        .from('membros')
        .update({ nome, unidade, cargo, telefone })
        .eq('id', idEditando)

      if (error) alert('Erro ao atualizar membro.')
      else {
        alert('Membro atualizado com sucesso!')
        setIdEditando(null)
      }
    } else {
      const { error } = await supabase
        .from('membros')
        .insert([{ nome, unidade, cargo, telefone }])

      if (error) alert('Erro ao cadastrar membro.')
      else alert('Membro cadastrado com sucesso!')
    }

    setNome('')
    setUnidade('Suruí')
    setTelefone('')
    buscarMembros()
  }

  const iniciarEdicao = (membro) => {
    setIdEditando(membro.id)
    setNome(membro.nome)
    setUnidade(membro.unidade)
    setCargo(membro.cargo)
    setTelefone(membro.telefone || '')
  }

  const excluirMembro = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este membro?')) {
      const { error } = await supabase.from('membros').delete().eq('id', id)
      if (!error) buscarMembros()
    }
  }

  // Dados das Unidades do Clube
  const unidadesInfo = {
    Suruí: { cor: '#2E7D32', desc: 'Unidade com identidade em Branco e Verde. Focada em bravura, superação e harmonia com a natureza.' },
    Suyá: { cor: '#1565C0', desc: 'Unidade com identidade em Azul-marinho, detalhes em amarelo e vermelho. Espírito de liderança e união.' },
    Xavantes: { cor: '#C62828', desc: 'Unidade com identidade Preta e detalhes marcantes em Vermelho. Força, energia e determinação.' },
    'Ye\'kwana': { cor: '#6A1B9A', desc: 'Unidade com identidade Roxa/Lilás e detalhes em branco. Criatividade, foco e companheirismo.' }
  }

  // Se estiver na Home (Capa inicial)
  if (paginaAtual === 'home') {
    return (
      <div style={{
        height: '100vh',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1920") no-repeat center center fixed',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ border: '3px solid #C5A059', padding: '10px 20px', borderRadius: '4px', marginBottom: '20px', background: 'rgba(0,0,0,0.5)' }}>
          <span style={{ color: '#C5A059', fontWeight: 'bold', letterSpacing: '2px' }}>BARUERI - SP | R10</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Clube de Desbravadores Amazônia</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px', color: '#ddd' }}>
          Todos juntos por um só objetivo! Desenvolvendo caráter, liderança e amor pela natureza.
        </p>
        <button 
          onClick={() => setPaginaAtual('sobre')}
          style={{
            background: '#C5A059',
            color: '#121212',
            border: 'none',
            padding: '15px 35px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0px 4px 15px rgba(197, 160, 89, 0.4)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Conheça nosso clube
        </button>
      </div>
    )
  }

  // Layout Principal com Menu Superior Estilo Portal
  return (
    <div style={{ background: '#121212', color: '#f0f0f0', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* Menu Superior */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        background: '#1a1a1a',
        borderBottom: '2px solid #C5A059',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div onClick={() => setPaginaAtual('home')} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', color: '#C5A059' }}>
          🏕️ AMAZÔNIA DBV
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <button 
            onClick={() => setPaginaAtual('sobre')} 
            style={{ background: 'none', border: 'none', color: paginaAtual === 'sobre' ? '#C5A059' : '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: paginaAtual === 'sobre' ? 'bold' : 'normal', borderBottom: paginaAtual === 'sobre' ? '2px solid #C5A059' : 'none', paddingBottom: '5px' }}
          >
            Sobre
          </button>
          <button 
            onClick={() => setPaginaAtual('unidades')} 
            style={{ background: 'none', border: 'none', color: paginaAtual === 'unidades' ? '#C5A059' : '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: paginaAtual === 'unidades' ? 'bold' : 'normal', borderBottom: paginaAtual === 'unidades' ? '2px solid #C5A059' : 'none', paddingBottom: '5px' }}
          >
            Unidades
          </button>
          <button 
            onClick={() => setPaginaAtual('fotos')} 
            style={{ background: 'none', border: 'none', color: paginaAtual === 'fotos' ? '#C5A059' : '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: paginaAtual === 'fotos' ? 'bold' : 'normal', borderBottom: paginaAtual === 'fotos' ? '2px solid #C5A059' : 'none', paddingBottom: '5px' }}
          >
            Fotos
          </button>
          <button 
            onClick={() => setPaginaAtual('contato')} 
            style={{ background: 'none', border: 'none', color: paginaAtual === 'contato' ? '#C5A059' : '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: paginaAtual === 'contato' ? 'bold' : 'normal', borderBottom: paginaAtual === 'contato' ? '2px solid #C5A059' : 'none', paddingBottom: '5px' }}
          >
            Contato
          </button>
          <button 
            onClick={() => setPaginaAtual('secretaria')} 
            style={{ background: '#2E7D32', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🔐 Secretaria / Painel
          </button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico das Abas */}
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
        
        {/* ABA SOBRE */}
        {paginaAtual === 'sobre' && (
          <div>
            <h2 style={{ color: '#C5A059', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Nossa História</h2>
            <p style={{ lineHeight: '1.8', color: '#ccc', marginTop: '20px', fontSize: '1.1rem' }}>
              O <strong>Clube de Desbravadores Amazônia</strong>, localizado em Barueri - SP, atua com a missão de guiar juvenis e adolescentes no desenvolvimento físico, mental e espiritual. Inspirados pelas riquezas e grandiosidade da Amazônia, trabalhamos em equipe com as nossas unidades (Suruí, Suyá, Xavantes e Ye'kwana) para formar cidadãos íntegros e líderes capacitados.
            </p>
          </div>
        )}

        {/* ABA UNIDADES */}
        {paginaAtual === 'unidades' && (
          <div>
            <h2 style={{ color: '#C5A059', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Nossas Unidades</h2>
            <p style={{ color: '#aaa', marginTop: '10px' }}>Selecione abaixo para conhecer a identidade e o espírito de cada unidade:</p>
            
            <div style={{ display: 'flex', gap: '15px', margin: '20px 0', flexWrap: 'wrap' }}>
              {Object.keys(unidadesInfo).map((uni) => (
                <button
                  key={uni}
                  onClick={() => setUnidadeSelecionada(uni)}
                  style={{
                    background: unidadeSelecionada === uni ? unidadesInfo[uni].cor : '#222',
                    color: '#fff',
                    border: '1px solid #444',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: unidadeSelecionada === uni ? '0px 4px 10px rgba(0,0,0,0.5)' : 'none'
                  }}
                >
                  Unidade {uni}
                </button>
              ))}
            </div>

            <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', borderLeft: `6px solid ${unidadesInfo[unidadeSelecionada].cor}`, marginTop: '20px' }}>
              <h3 style={{ color: unidadesInfo[unidadeSelecionada].cor, marginBottom: '10px' }}>Unidade {unidadeSelecionada}</h3>
              <p style={{ fontSize: '1.1rem', color: '#ddd' }}>{unidadesInfo[unidadeSelecionada].desc}</p>
            </div>
          </div>
        )}

        {/* ABA FOTOS */}
        {paginaAtual === 'fotos' && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200")', backgroundSize: 'cover', borderRadius: '12px' }}>
            <h2 style={{ color: '#C5A059', marginBottom: '15px' }}>Galeria de Momentos</h2>
            <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '1.1rem' }}>
              Veja todos os acampamentos, caminhadas, eventos e reuniões do Clube Amazônia organizados no nosso álbum oficial.
            </p>
            <a 
              href="https://photos.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                background: '#C5A059',
                color: '#121212',
                padding: '12px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
                boxShadow: '0px 4px 10px rgba(197, 160, 89, 0.4)'
              }}
            >
              📸 Acessar Álbum no Google Fotos
            </a>
          </div>
        )}

        {/* ABA CONTATO */}
        {paginaAtual === 'contato' && (
          <div>
            <h2 style={{ color: '#C5A059', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Fale Conosco</h2>
            <p style={{ color: '#ccc', marginTop: '20px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Tem interesse em inscrever seu filho ou quer saber mais sobre as nossas reuniões em Barueri - SP? Entre em contato diretamente com a nossa diretoria:
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                💬 Falar com o Diretor (WhatsApp)
              </a>
            </div>
          </div>
        )}

        {/* ABA SECRETARIA / PAINEL ADMINISTRATIVO */}
        {paginaAtual === 'secretaria' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              <h2 style={{ color: '#C5A059' }}>🔐 Painel da Secretaria</h2>
              <button onClick={() => setPaginaAtual('sobre')} style={{ background: '#333', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Voltar ao Site
              </button>
            </div>
            <p style={{ color: '#aaa', marginTop: '10px' }}>Gerencie rapidamente os membros, unidades e contatos do clube.</p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '1px solid #333' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>{idEditando ? '✏️ Editar Membro' : '➕ Novo Cadastro'}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
                <select value={unidade} onChange={(e) => setUnidade(e.target.value)} style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                  <option value="Suruí">Unidade Suruí</option>
                  <option value="Suyá">Unidade Suyá</option>
                  <option value="Xavantes">Unidade Xavantes</option>
                  <option value="Ye'kwana">Unidade Ye'kwana</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <select value={cargo} onChange={(e) => setCargo(e.target.value)} style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                  <option value="Desbravador">Desbravador</option>
                  <option value="Conselheiro">Conselheiro</option>
                  <option value="Diretor">Diretor</option>
                  <option value="Diretora Associada">Diretora Associada</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Telefone / Contato" 
                  value={telefone} 
                  onChange={(e) => setTelefone(e.target.value)} 
                  style={{ padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: idEditando ? '#d32f2f' : '#2E7D32', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {idEditando ? 'Salvar Alterações' : 'Cadastrar Membro'}
                </button>
                {idEditando && (
                  <button type="button" onClick={() => { setIdEditando(null); setNome(''); setTelefone(''); }} style={{ background: '#555', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            {/* Tabela de Membros */}
            <h3 style={{ marginTop: '30px' }}>Membros Cadastrados ({membros.length})</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#2E7D32', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Nome</th>
                  <th style={{ padding: '12px' }}>Unidade</th>
                  <th style={{ padding: '12px' }}>Cargo</th>
                  <th style={{ padding: '12px' }}>Telefone</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {membros.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>Nenhum membro cadastrado ainda.</td>
                  </tr>
                ) : (
                  membros.map((membro) => (
                    <tr key={membro.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '12px' }}>{membro.nome}</td>
                      <td style={{ padding: '12px' }}>{membro.unidade}</td>
                      <td style={{ padding: '12px' }}>{membro.cargo}</td>
                      <td style={{ padding: '12px' }}>{membro.telefone || '-'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button onClick={() => iniciarEdicao(membro)} style={{ background: '#1976D2', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>
                          Editar
                        </button>
                        <button onClick={() => excluirMembro(membro.id)} style={{ background: '#C62828', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default App