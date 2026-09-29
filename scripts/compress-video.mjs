#!/usr/bin/env node
import { spawn, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ffmpegPath from 'ffmpeg-static'

const EXTENSIONES = new Set(['.mp4', '.mov', '.webm', '.m4v', '.avi', '.mkv'])
const UMBRAL_SALTAR_MB = 5

const argv = process.argv.slice(2)

function usage() {
  console.log(`
Comprime videos para la landing (H.264 + AAC, optimizado para web)

Uso:
  npm run video -- <ruta-video> [opciones]

Opciones:
  --crf <n>      Calidad 18-32, menor = mejor y más pesado (default 26)
  --preset <n>   ultrafast..veryslow (default slow)
  --max <px>     Lado máximo en px, sin escalar arriba (default 1920)
  --force        Re-comprimir aunque el video ya esté liviano,
                 o sobrescribir archivos no trackeados por git
  -h, --help     Esta ayuda

Ejemplos:
  npm run video -- public/assets/tours/champaqui/cerro-champaqui.mp4
  npm run video -- C:/Videos/foto-cumbre.mov --crf 24
`)
}

let crf = 26
let preset = 'slow'
let max = 1920
let force = false
const entradas = []

for (let i = 0; i < argv.length; i++) {
  const arg = argv[i]
  if (arg === '-h' || arg === '--help') { usage(); process.exit(0) }
  else if (arg === '--crf') crf = Number(argv[++i])
  else if (arg === '--preset') preset = String(argv[++i])
  else if (arg === '--max') max = Number(argv[++i])
  else if (arg === '--force') force = true
  else if (arg.startsWith('--')) { console.error(`Opción desconocida: ${arg}`); usage(); process.exit(1) }
  else entradas.push(arg)
}

if (!entradas.length || !Number.isFinite(crf) || crf < 0 || crf > 51 || !Number.isFinite(max)) {
  usage()
  process.exit(1)
}

if (!ffmpegPath || !fs.existsSync(ffmpegPath)) {
  console.error('No se encontró ffmpeg. Reinstalá con: npm i -D ffmpeg-static')
  process.exit(1)
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toLocaleString('es-AR', { maximumFractionDigits: 1 })} MB`
const reloj = (seg) => {
  if (!Number.isFinite(seg)) return '--:--'
  const h = Math.floor(seg / 3600)
  const m = Math.floor((seg % 3600) / 60)
  const s = Math.floor(seg % 60)
  return `${h ? `${h}:` : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`
}

function probe(file) {
  let stderr = ''
  try {
    execFileSync(ffmpegPath, ['-hide_banner', '-i', file], { encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] })
  } catch (err) {
    stderr = String(err.stderr || '')
  }
  const dur = stderr.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/)
  const stream = stderr.match(/Stream #.*Video: ([^,]+).*?(\d{2,5})x(\d{2,5})/)
  return {
    duracion: dur ? Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3]) : null,
    codec: stream ? stream[1].trim() : null,
    ancho: stream ? Number(stream[2]) : null,
    alto: stream ? Number(stream[3]) : null
  }
}

function estaEnGit(file) {
  try {
    const rel = path.relative(process.cwd(), file).replaceAll('\\', '/')
    execFileSync('git', ['ls-files', '--error-unmatch', '--', rel], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function comprimir(file) {
  return new Promise((resolve) => {
    const info = probe(file)
    const bytesAntes = fs.statSync(file).size
    const nombre = path.basename(file)

    if (!info.codec) {
      console.error(`✗ ${nombre}: no se pudo leer (¿archivo dañado o formato no soportado?)`)
      return resolve(false)
    }

    if (!force && info.codec.includes('h264') && bytesAntes <= UMBRAL_SALTAR_MB * 1024 * 1024) {
      console.log(`→ ${nombre}: ya está liviano (${mb(bytesAntes)}, h264). Se omite; usá --force para re-comprimirlo.`)
      return resolve(true)
    }

    if (!estaEnGit(file) && !force) {
      console.error(`✗ ${nombre}: no está trackeado en git (se pisaría el original sin respaldo). Copiá el archivo o repetí con --force.`)
      return resolve(false)
    }

    const tmp = path.join(path.dirname(file), `${path.basename(file, path.extname(file))}.tmp.mp4`)
    const filtros = `scale=w='min(${max},iw)':h='min(${max},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`

    const args = [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-i', file,
      '-map', '0:v:0', '-map', '0:a:0?',
      '-c:v', 'libx264', '-preset', preset, '-crf', String(crf),
      '-pix_fmt', 'yuv420p',
      '-vf', filtros,
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      '-movflags', '+faststart',
      '-sn', '-dn',
      '-progress', 'pipe:1',
      tmp
    ]

    console.log(`→ ${nombre}: ${info.codec} ${info.ancho}x${info.alto} · ${reloj(info.duracion)} · ${mb(bytesAntes)}`)

    const proc = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    let ultimoPorcentaje = -10

    proc.stdout.on('data', (chunk) => {
      if (!info.duracion) return
      const match = chunk.toString().match(/out_time_(?:us|ms)=(\d+)/)
      if (!match) return
      const porcentaje = Math.min(100, (Number(match[1]) / 1e6 / info.duracion) * 100)
      if (porcentaje - ultimoPorcentaje >= 10) {
        ultimoPorcentaje = porcentaje
        process.stdout.write(`   ${Math.round(porcentaje)}%  `)
      }
    })
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString() })

    proc.on('error', (err) => {
      fs.rmSync(tmp, { force: true })
      console.error(`\n✗ ${nombre}: no se pudo ejecutar ffmpeg (${err.message})`)
      resolve(false)
    })

    proc.on('close', (code) => {
      if (code !== 0 || !fs.existsSync(tmp)) {
        fs.rmSync(tmp, { force: true })
        const detalle = stderr.trim().split('\n').slice(-5).join('\n  ')
        console.error(`\n✗ ${nombre}: ffmpeg terminó con código ${code}${detalle ? `\n  ${detalle}` : ''}`)
        return resolve(false)
      }

      const bytesDespues = fs.statSync(tmp).size
      const delta = Math.round((bytesDespues / bytesAntes - 1) * 100)
      if (bytesDespues >= bytesAntes) {
        fs.rmSync(tmp, { force: true })
        console.log(`→ ${nombre}: el resultado pesaría más (${mb(bytesAntes)} → ${mb(bytesDespues)}, +${-delta}%). Se conserva el archivo original.`)
        return resolve(true)
      }
      fs.renameSync(tmp, file)
      const despues = probe(file)
      process.stdout.write('\r' + ' '.repeat(60) + '\r')
      console.log(`✓ ${nombre}: ${mb(bytesAntes)} → ${mb(bytesDespues)} (−${-delta}%) · ${despues.ancho}x${despues.alto} · h264/aac · faststart`)
      resolve(true)
    })
  })
}

let fallidos = 0
for (const entrada of entradas) {
  const file = path.resolve(entrada)
  if (!fs.existsSync(file)) {
    console.error(`✗ No existe: ${entrada}`)
    fallidos++
    continue
  }
  if (!EXTENSIONES.has(path.extname(file).toLowerCase())) {
    console.error(`✗ Formato no soportado: ${entrada}`)
    fallidos++
    continue
  }
  const ok = await comprimir(file)
  if (!ok) fallidos++
}

process.exit(fallidos ? 1 : 0)
