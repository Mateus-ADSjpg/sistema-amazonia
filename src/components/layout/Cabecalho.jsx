import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { CLUBE, linkWhatsapp } from '../../conteudo/clube'
import { UNIDADES } from '../../conteudo/unidades'
import { useRolagem } from '../../hooks/useRolagem'
import Emblema from '../ui/Emblema'
import Icone from '../ui/Icone'
import './Cabecalho.css'

const LINKS = [
  { para: '/', texto: 'Início' },
  { para: '/sobre', texto: 'Sobre' },
  { para: '/unidades', texto: 'Unidades', submenu: true },
  { para: '/galeria', texto: 'Galeria' },
  { para: '/contato', texto: 'Contato' },
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
          <Link to="/secretaria" className="cabecalho__secretaria" title="Área da Secretaria">
            <Icone nome="cadeado" tamanho={18} />
            <span>Secretaria</span>
          </Link>
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
            <Icone nome={menuAberto ? 'fechar' : 'menu'} tamanho={26} />
          </button>
        </div>
      </div>

      {/* Menu de tela cheia (celular e tablet) */}
      <div id="menu-celular" className="menu-celular" aria-hidden={!menuAberto}>
        <nav className="container" aria-label="Menu">
          <ul className="menu-celular__lista">
            {LINKS.map((link, i) => (
              <li key={link.para} style={{ '--i': i }}>
                <NavLink to={link.para} end={link.para === '/'} onClick={fechar}>
                  <span className="menu-celular__numero">{String(i + 1).padStart(2, '0')}</span>
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="menu-celular__unidades">
            {UNIDADES.map((u) => (
              <Link key={u.slug} to={`/unidades/${u.slug}`} onClick={fechar} style={{ '--cor-unidade': u.tema.claro }}>
                <span className="cabecalho__ponto" />
                {u.nome}
              </Link>
            ))}
          </div>
          <div className="menu-celular__rodape">
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao">
              Quero participar <Icone nome="seta" />
            </a>
            <Link to="/secretaria" onClick={fechar} className="botao botao--vazado">
              <Icone nome="cadeado" /> Secretaria
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
