import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { CLUBE, CONTATO, linkWhatsapp } from '../../conteudo/clube'
import { UNIDADES } from '../../conteudo/unidades'
import { useRolagem } from '../../hooks/useRolagem'
import Emblema from '../ui/Emblema'
import Icone from '../ui/Icone'
import Marca from '../ui/Marca'
import './Cabecalho.css'

// Páginas do menu. Para acrescentar uma, copie uma linha.
// O Painel da Secretaria não entra aqui de propósito: ele é interno.
const LINKS = [
  { para: '/', texto: 'Início', icone: 'casa' },
  { para: '/sobre', texto: 'Sobre', icone: 'bussola' },
  { para: '/unidades', texto: 'Unidades', icone: 'bandeira', submenu: true },
  { para: '/calendario', texto: 'Calendário', icone: 'calendario' },
  { para: '/galeria', texto: 'Galeria', icone: 'camera' },
  { para: '/contato', texto: 'Contato', icone: 'conversa' },
]

export default function Cabecalho() {
  const { rolou, descendo } = useRolagem()
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-aberto', menuAberto)
    if (!menuAberto) return
    const fecharComEsc = (e) => e.key === 'Escape' && setMenuAberto(false)
    window.addEventListener('keydown', fecharComEsc)
    return () => {
      window.removeEventListener('keydown', fecharComEsc)
      document.body.classList.remove('menu-aberto')
    }
  }, [menuAberto])

  const fechar = () => setMenuAberto(false)

  const classes = [
    'cabecalho',
    rolou && 'cabecalho--solido',
    descendo && !menuAberto && 'cabecalho--escondido',
    menuAberto && 'cabecalho--menu-aberto',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes}>
      <div className="container cabecalho__barra">
        <Link to="/" className="cabecalho__marca" onClick={fechar} aria-label={`${CLUBE.nome} — página inicial`}>
          <Emblema src={CLUBE.logo} alt="" tamanho={42} />
          <span className="cabecalho__nome">
            <strong>{CLUBE.nomeCurto}</strong>
            <small>Desbravadores</small>
          </span>
        </Link>

        <nav className="cabecalho__nav" aria-label="Principal">
          <ul>
            {LINKS.map((link) => (
              <li key={link.para} className={link.submenu ? 'cabecalho__com-submenu' : undefined}>
                <NavLink to={link.para} end={link.para === '/'} className="cabecalho__link">
                  {link.texto}
                </NavLink>
                {link.submenu && (
                  <div className="cabecalho__submenu">
                    {UNIDADES.map((u) => (
                      <Link key={u.slug} to={`/unidades/${u.slug}`} style={{ '--cor-unidade': u.tema.claro }}>
                        <span className="cabecalho__ponto" />
                        {u.nome}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="cabecalho__acoes">
          <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao cabecalho__participar">
            Quero participar
          </a>
          <button
            className="cabecalho__hamburguer"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className={`cabecalho__tracos ${menuAberto ? 'cabecalho__tracos--x' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* ---------- Menu do celular (compacto) ---------- */}
      <div
        id="menu-celular"
        className="menu-celular"
        aria-hidden={!menuAberto}
        onClick={(e) => e.target === e.currentTarget && fechar()}
      >
        <nav className="container menu-celular__caixa" aria-label="Menu">
          <ul className="menu-celular__lista">
            {LINKS.map((link, i) => (
              <li key={link.para} style={{ '--i': i }}>
                <NavLink to={link.para} end={link.para === '/'} onClick={fechar}>
                  <span className="menu-celular__icone">
                    <Icone nome={link.icone} tamanho={18} />
                  </span>
                  {link.texto}
                  <Icone nome="seta" tamanho={16} className="menu-celular__seta" />
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="menu-celular__rotulo">As quatro unidades</p>
          <div className="menu-celular__unidades">
            {UNIDADES.map((u) => (
              <Link key={u.slug} to={`/unidades/${u.slug}`} onClick={fechar} style={{ '--cor-unidade': u.tema.claro }}>
                <span className="cabecalho__ponto" />
                {u.nome}
              </Link>
            ))}
          </div>

          <div className="menu-celular__rodape">
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao botao--verde">
              <Marca nome="whatsapp" tamanho={18} /> Quero participar
            </a>
            {CONTATO.instagram && (
              <a
                href={`https://instagram.com/${CONTATO.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-celular__rede"
                aria-label={`Instagram do clube: @${CONTATO.instagram}`}
              >
                <Marca nome="instagram" tamanho={20} />
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
