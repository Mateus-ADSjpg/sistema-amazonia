// =====================================================================
// COMPRIME AS FOTOS DO SITE
//
// Como usar:  npm run fotos
//
// O que faz: passa por todas as imagens de public/fotos, reduz o tamanho
// (largura máxima) e comprime. Só substitui o arquivo quando o resultado
// fica menor. Fotos que já estão leves são puladas.
//
// Faça isso sempre que colocar fotos novas: o celular agradece.
// =====================================================================

import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { join, extname, relative } from 'node:path'
import sharp from 'sharp'

const PASTA = 'public/fotos'

// Largura máxima por tipo de arquivo
const LARGURA_CAPA = 1920 // fotos de capa (nome começa com "capa")
const LARGURA_PADRAO = 1400 // demais fotos
const LARGURA_LOGO = 600 // logos e emblemas (PNG)

const QUALIDADE = 78
const kb = (bytes) => Math.round(bytes / 1024)

async function listarImagens(pasta) {
  const itens = await readdir(pasta, { withFileTypes: true })
  const arquivos = []
  for (const item of itens) {
    const caminho = join(pasta, item.name)
    if (item.isDirectory()) arquivos.push(...(await listarImagens(caminho)))
    else if (/\.(jpe?g|png)$/i.test(item.name)) arquivos.push(caminho)
  }
  return arquivos
}

async function otimizar(caminho) {
  const original = await readFile(caminho)
  const imagem = sharp(original)
  const info = await imagem.metadata()
  const ehPng = extname(caminho).toLowerCase() === '.png'
  const nome = caminho.split(/[\\/]/).pop()

  const larguraMaxima = ehPng ? LARGURA_LOGO : nome.startsWith('capa') ? LARGURA_CAPA : LARGURA_PADRAO

  let processada = imagem.rotate() // respeita a orientação da foto do celular
  if (info.width > larguraMaxima) processada = processada.resize({ width: larguraMaxima })

  const nova = ehPng
    ? await processada.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await processada.jpeg({ quality: QUALIDADE, progressive: true, mozjpeg: true }).toBuffer()

  const menor = nova.length < original.length * 0.98
  if (menor) await writeFile(caminho, nova)

  return {
    arquivo: relative(PASTA, caminho),
    antes: original.length,
    depois: menor ? nova.length : original.length,
    largura: info.width,
    novaLargura: Math.min(info.width, larguraMaxima),
    mudou: menor,
  }
}

const fotos = await listarImagens(PASTA).catch(() => [])
if (fotos.length === 0) {
  console.log(`Nenhuma imagem encontrada em ${PASTA}/`)
  process.exit(0)
}

console.log(`\nComprimindo ${fotos.length} imagem(ns) de ${PASTA}/ ...\n`)

let antesTotal = 0
let depoisTotal = 0

for (const caminho of fotos) {
  try {
    const r = await otimizar(caminho)
    antesTotal += r.antes
    depoisTotal += r.depois
    const tamanho = r.largura !== r.novaLargura ? ` (${r.largura}px → ${r.novaLargura}px)` : ''
    console.log(
      r.mudou
        ? `  ✔ ${r.arquivo}: ${kb(r.antes)} KB → ${kb(r.depois)} KB${tamanho}`
        : `  – ${r.arquivo}: ${kb(r.antes)} KB (já estava bom)`,
    )
  } catch (erro) {
    const tamanho = await stat(caminho).then((s) => s.size).catch(() => 0)
    antesTotal += tamanho
    depoisTotal += tamanho
    console.log(`  ! ${relative(PASTA, caminho)}: não consegui ler (${erro.message})`)
  }
}

console.log(
  `\nTotal: ${kb(antesTotal)} KB → ${kb(depoisTotal)} KB` +
    (antesTotal > 0 ? ` (${Math.round((1 - depoisTotal / antesTotal) * 100)}% menor)` : '') +
    '\n',
)
