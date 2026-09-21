import { useState } from 'react'
import { ALBUM_FOTOS_URL, UNIDADES as unidadesInfo, WHATSAPP_DIRETORIA } from './clube'
import PainelSecretaria from './components/PainelSecretaria'
import './App.css'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home') // 'home', 'sobre', 'unidades', 'fotos', 'contato', 'secretaria'
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('Suruí')

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
              href={ALBUM_FOTOS_URL} 
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
                href={`https://wa.me/${WHATSAPP_DIRETORIA}`} 
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

        {/* ABA SECRETARIA / PAINEL ADMINISTRATIVO (exige login) */}
        {paginaAtual === 'secretaria' && (
          <PainelSecretaria onVoltar={() => setPaginaAtual('sobre')} />
        )}

      </div>
    </div>
  )
}

export default App