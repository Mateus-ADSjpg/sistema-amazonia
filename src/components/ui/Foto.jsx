import { useState } from 'react'
import { MODO_DESENVOLVIMENTO } from '../../conteudo/util'
import Icone from './Icone'
import './Foto.css'

const PROPORCOES = {
  vertical: '3 / 4',
  horizontal: '4 / 3',
  quadrada: '1 / 1',
  panoramica: '16 / 9',
}

// Mostra uma foto do site. Se o arquivo ainda não existir em public/fotos,
// aparece um espaço decorado no lugar (e, no computador, o caminho esperado).
//
// preencher: ocupa todo o espaço do elemento pai (fundo de capa, cartões).
// proporcao: força uma proporção fixa, ex.: 'quadrada', 'vertical', '16 / 9'.
// formato:   proporção usada só enquanto a foto não existe (galerias).
// tom:       cor usada no espaço decorado.
export default function Foto({
  src,
  alt = '',
  preencher = false,
  proporcao,
  formato,
  tom,
  prioridade = false,
  className = '',
  style,
}) {
  const [srcComErro, setSrcComErro] = useState(null)
  const semFoto = !src || srcComErro === src

  const proporcaoFixa = proporcao && (PROPORCOES[proporcao] ?? proporcao)
  const proporcaoProvisoria = semFoto && !preencher ? PROPORCOES[formato] ?? '4 / 3' : undefined

  const classes = ['foto', preencher && 'foto--preencher', (proporcaoFixa || semFoto) && 'foto--moldura', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={{ aspectRatio: proporcaoFixa ?? proporcaoProvisoria, '--tom': tom, ...style }}
    >
      {semFoto ? (
        // Sem a foto, fica o sol de raios do emblema na cor do lugar. O ícone
        // de câmera e o caminho do arquivo só aparecem no seu computador.
        <div className="foto__vazia" role="img" aria-label={alt || 'Foto a adicionar'}>
          <span className="raios" aria-hidden="true" />
          {MODO_DESENVOLVIMENTO && <Icone nome="camera" tamanho={30} />}
          {MODO_DESENVOLVIMENTO && src && <span className="foto__caminho">public{src}</span>}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={prioridade ? 'eager' : 'lazy'}
          decoding="async"
          // minúsculo: o React 18 ainda não conhece "fetchPriority"
          fetchpriority={prioridade ? 'high' : undefined}
          onError={() => setSrcComErro(src)}
        />
      )}
    </div>
  )
}
