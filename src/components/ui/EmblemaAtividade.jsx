import { useId } from 'react'

// Desenhos do site: atividades da página "Sobre" (O que fazemos), cultos
// do Calendário (igreja, fe, oracao) e o cartão de reuniões do Contato (agenda).
// Ilustrações próprias do site, em dourado com relevo e detalhes em verde e
// laranja, cada uma num quadradinho escuro. As classes aparecem como o alfinete
// dourado de classe e as especialidades como o emblema redondo bordado.
// Para usar uma imagem oficial no lugar, preencha "imagem" na atividade em
// src/conteudo/sobre.js (ex.: '/fotos/clube/classes.png').

// Acabamento comum a todos: o mesmo relevo do alfinete de classe.
// Cada linha é uma faixa clara com contorno escuro; as áreas cheias têm
// degradê de luz (de cima à esquerda) e contorno fino.
const CONTORNO = '#8c6206'
const contorno = { fill: 'none', stroke: CONTORNO, strokeWidth: 3.6, strokeLinejoin: 'round', strokeLinecap: 'round' }
const miolo = { fill: 'none', stroke: '#ffe873', strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' }

// Linha em relevo dourado
const Relevo = ({ children }) => (
  <>
    <g {...contorno}>{children}</g>
    <g {...miolo}>{children}</g>
  </>
)

// Degradês usados pelos desenhos (ouro, verde da mata, laranja da coroa, papel)
function Tintas({ id }) {
  const tinta = (nome, cores) => (
    <linearGradient id={`${id}-${nome}`} x1="0" y1="0" x2=".6" y2="1">
      {cores.map((c, i) => (
        <stop key={c} offset={i / (cores.length - 1)} stopColor={c} />
      ))}
    </linearGradient>
  )
  return (
    <defs>
      {tinta('ouro', ['#fff08a', '#f7d018', '#c99512'])}
      {tinta('verde', ['#a6dcae', '#46a066', '#1f5a36'])}
      {tinta('laranja', ['#ffc983', '#f28c2c', '#b4541a'])}
      {tinta('papel', ['#fff8d6', '#f6e08e', '#e0b84a'])}
    </defs>
  )
}

const DESENHOS = {
  // Barraca com a porta aberta, um pinheiro e o chão
  acampamento: (t) => (
    <>
      <path d="M44 20l-7 10h3.5l-6 8.5h4.5l-5 8h20l-5-8h4.5l-6-8.5H51z" fill={t('verde')} stroke="#17462a" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 49 28 17l18 32z" fill={t('ouro')} stroke={CONTORNO} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M22.5 49 28 35l5.5 14z" fill="#3b2a06" stroke={CONTORNO} strokeWidth="1.2" strokeLinejoin="round" />
      <Relevo>
        <path d="M28 17v18M25 13l3 4 3-4" />
        <path d="M7 50h50" />
      </Relevo>
    </>
  ),

  // Mão segurando um coração
  servico: (t) => (
    <>
      <path
        d="M32 33c-5-4-11-7-11-13.5a5.5 5.5 0 0 1 11-2 5.5 5.5 0 0 1 11 2C43 26 37 29 32 33z"
        fill={t('laranja')}
        stroke="#8a3f0a"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M25 18.5a3.2 3.2 0 0 1 4-1" stroke="#fff1d6" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity=".9" />
      <Relevo>
        <path d="M7 39l8-2c3-1 6 0 8 2l5 4h6.5a3 3 0 0 1 0 6H25M7 52h13.5l12-2 17.5-9a3 3 0 0 0-3-5l-11 5" />
      </Relevo>
    </>
  ),

  // Bandeirim do clube à frente de uma fila em formação
  ordem: (t) => (
    <>
      <path d="M16 10.5h23l-5.5 6.5 5.5 6.5H16z" fill={t('ouro')} stroke={CONTORNO} strokeWidth="1.3" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <g key={i} fill={t('verde')} stroke="#17462a" strokeWidth="1.1">
          <circle cx={30 + i * 9.5} cy="35" r="3.6" />
          <path d={`M${25.4 + i * 9.5} 51v-7.5a4.6 4.6 0 0 1 9.2 0V51z`} strokeLinejoin="round" />
        </g>
      ))}
      <Relevo>
        <path d="M14.5 8v43" />
        <path d="M8 53h48" />
      </Relevo>
    </>
  ),

  // Igreja com a cruz no alto (culto de sábado)
  igreja: (t) => (
    <>
      <path d="M17 31h30v20H17z" fill={t('ouro')} stroke={CONTORNO} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M13 32 32 18l19 14z" fill={t('laranja')} stroke="#8a3f0a" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M27.5 51v-7.5a4.5 4.5 0 0 1 9 0V51z" fill="#3b2a06" stroke={CONTORNO} strokeWidth="1.2" />
      <circle cx="32" cy="36" r="2.4" fill="#3b2a06" />
      <Relevo>
        <path d="M32 6v11M27.5 10h9" />
        <path d="M8 52h48" />
      </Relevo>
    </>
  ),

  // Mãos em oração (culto de quarta)
  oracao: (t) => (
    <>
      <g stroke="#9a4a10" strokeWidth="3.4" strokeLinecap="round">
        <path d="M32 4v4M22 7l2 3.5M42 7l-2 3.5" />
      </g>
      <g stroke="#ffc983" strokeWidth="1.5" strokeLinecap="round">
        <path d="M32 4v4M22 7l2 3.5M42 7l-2 3.5" />
      </g>
      <path
        d="M32 13c-2.5 1-5 5-7 11l-2.5 9.5L19 44l7.5 7L32 45zM32 13c2.5 1 5 5 7 11l2.5 9.5L45 44l-7.5 7L32 45z"
        fill={t('ouro')}
        stroke={CONTORNO}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* dedos e polegares */}
      <path
        d="M29.5 17c-1.6 3.5-2.8 7.5-3.6 12M27.5 19.5c-1.4 3-2.4 6.5-3.1 10M34.5 17c1.6 3.5 2.8 7.5 3.6 12M36.5 19.5c1.4 3 2.4 6.5 3.1 10M31.2 30c-2.6 1.2-4.2 4-4.6 8M32.8 30c2.6 1.2 4.2 4 4.6 8"
        fill="none"
        stroke={CONTORNO}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <Relevo>
        <path d="M32 14v31" />
        <path d="M16 47.5l9 9M48 47.5l-9 9" />
      </Relevo>
    </>
  ),

  // Folha de calendário com um dia marcado (reuniões)
  agenda: (t) => (
    <>
      <path d="M12 20a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" fill={t('papel')} stroke={CONTORNO} strokeWidth="1.4" />
      <path d="M12 27v-7a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v7z" fill={t('laranja')} stroke="#8a3f0a" strokeWidth="1.4" strokeLinejoin="round" />
      <g fill="#b8891a">
        {[33, 40, 47].map((y) =>
          [18, 25, 32, 39, 46].map((x) => <rect key={`${x}-${y}`} x={x - 1.6} y={y - 1.6} width="3.2" height="3.2" rx=".8" />),
        )}
      </g>
      <circle cx="39" cy="40" r="4.6" fill={t('ouro')} stroke={CONTORNO} strokeWidth="1.3" />
      <Relevo>
        <path d="M22 11v9M42 11v9" />
      </Relevo>
    </>
  ),

  // Bíblia aberta com a luz saindo das páginas
  fe: (t) => (
    <>
      <g stroke="#9a4a10" strokeWidth="3.4" strokeLinecap="round">
        <path d="M32 7v6M21 10l2.6 5M43 10l-2.6 5M13 17l4.5 3.5M51 17l-4.5 3.5" />
      </g>
      <g stroke="#ffc983" strokeWidth="1.5" strokeLinecap="round">
        <path d="M32 7v6M21 10l2.6 5M43 10l-2.6 5M13 17l4.5 3.5M51 17l-4.5 3.5" />
      </g>
      <path
        d="M32 26c-6-4-14-5-22-4v28c8-1 16 0 22 4 6-4 14-5 22-4V22c-8-1-16 0-22 4z"
        fill={t('papel')}
        stroke={CONTORNO}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M15 31c4.5 0 8 .8 12 2.4M15 37c4.5 0 8 .8 12 2.4M15 43c4.5 0 8 .8 12 2.4M37 33.4c4-1.6 7.5-2.4 12-2.4M37 39.4c4-1.6 7.5-2.4 12-2.4M37 45.4c4-1.6 7.5-2.4 12-2.4" stroke="#b8891a" strokeWidth="1.3" strokeLinecap="round" />
      <Relevo>
        <path d="M32 26v28" />
      </Relevo>
    </>
  ),
}

// Emblema redondo de especialidade, como o bordado do uniforme: feltro verde,
// anel vermelho por dentro da borda, uma árvore e uma barraca
const FELTRO = '#22683b'
const VERMELHO = '#d6372d'
const LIMA = '#c9e43a'

function EmblemaEspecialidade() {
  return (
    <>
      <circle cx="32" cy="32" r="27" fill={FELTRO} />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#000" strokeOpacity=".3" strokeWidth="1.2" />
      {/* anel em ponto cheio: traço largo picotado imita o bordado */}
      <circle cx="32" cy="32" r="21.5" fill="none" stroke={VERMELHO} strokeWidth="3.6" strokeDasharray=".9 .45" />
      {/* árvore */}
      <g fill="none" stroke={LIMA} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44V24" />
        <path d="M24 26c-2.5-2.5-5.5-2.5-7.5-.5M24 26c2-3 5.5-3.5 7.5-1.5M24 24c-1-3 .5-5.5 3-6.5M24 31c-2-1.5-4.5-1-6 .5M24 30c1.5-1.5 4-1.5 5.5 0" />
        <path d="M21 44h6" />
      </g>
      {/* barraca de lado */}
      <path d="M31 44 34.5 26.5c2.5 6 6 12 13.5 15.5l-1 2z" fill={VERMELHO} />
    </>
  )
}

// Alfinete de classe: moeda dourada com o triângulo, o escudo e a espada
// em relevo, como os distintivos das classes regulares. Cada linha do
// relevo é uma faixa clara com contorno escuro (traço largo escuro e, por
// cima, um traço mais fino claro).
function AlfineteClasses({ id }) {

  // barra de cima, triângulo e escudo (inclinado, como na peça)
  const molde = (
    <>
      <path d="M11 13h42v6H11z" />
      <path d="M12.5 21.5h39L30.5 55z" />
      <path d="M21 27.5 39.5 25l.5 6c-.6 6.4-4.6 10.5-9.4 13-4.5-2.8-8.4-7-9.2-12.6z" />
    </>
  )
  // espada de bronze atravessando o escudo
  const espada = (
    <>
      <path d="M22.5 41.5 41 29.6l2-.9-1 1.8" />
      <path d="M20.6 38.4l4.2 6.4" />
      <path d="M22.7 41.6l-4.4 2.9" />
    </>
  )

  return (
    <>
      <defs>
        <radialGradient id={`${id}-moeda`} cx="45%" cy="42%" r="60%">
          <stop offset="0" stopColor="#fff56a" />
          <stop offset=".55" stopColor="#f8d40e" />
          <stop offset=".9" stopColor="#f3a51b" />
          <stop offset="1" stopColor="#ea8f1a" />
        </radialGradient>
        <linearGradient id={`${id}-aro`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3a8" />
          <stop offset=".45" stopColor="#e6bd22" />
          <stop offset="1" stopColor="#8a6206" />
        </linearGradient>
      </defs>
      {/* aro dourado com bisel */}
      <circle cx="32" cy="32" r="29.5" fill={`url(#${id}-aro)`} />
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="#6e4d04" strokeWidth="1" />
      <circle cx="32" cy="32" r="25.5" fill={`url(#${id}-moeda)`} />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke="#8c6206" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="26.6" fill="none" stroke="#fff3a8" strokeOpacity=".8" strokeWidth=".8" />

      <g {...contorno}>{molde}</g>
      <g {...miolo}>{molde}</g>
      <g {...contorno} stroke="#7a4818" strokeWidth="2.6">{espada}</g>
      <g {...miolo} stroke="#eaa863" strokeWidth="1">{espada}</g>
    </>
  )
}

export default function EmblemaAtividade({ nome, imagem, tamanho = 64 }) {
  const id = useId().replace(/:/g, '')

  if (imagem) return <img src={imagem} alt="" width={tamanho} height={tamanho} loading="lazy" />

  // t('ouro') vira a referência ao degradê daquele ícone
  const t = (tinta) => `url(#${id}-${tinta})`
  let desenho = DESENHOS[nome] && (
    <>
      <Tintas id={id} />
      {DESENHOS[nome](t)}
    </>
  )
  if (nome === 'classes') desenho = <AlfineteClasses id={id} />
  if (nome === 'especialidade') desenho = <EmblemaEspecialidade />
  if (!desenho) return null

  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {desenho}
    </svg>
  )
}
