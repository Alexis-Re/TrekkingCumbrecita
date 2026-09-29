import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import sharp from 'sharp'

const LIMITE_LADO_LARGO = 2560
const EXTENSIONES = new Set(['.webp', '.jpg', '.jpeg'])

// Redimensiona en dist/ las imágenes cuyo lado largo supera LIMITE_LADO_LARGO.
// Corre antes que ViteImageOptimizer (que es enforce: 'post'), así la codificación
// final q80 la hace el optimizer y no se pierde calidad con doble compresión.
// Solo aplica al build: los originales en public/ quedan intactos.
function redimensionarParaBuild() {
  return {
    name: 'redimensionar-imagenes-build',
    apply: 'build',
    async closeBundle() {
      const dist = path.resolve('dist')
      if (!fs.existsSync(dist)) return

      const archivos = []
      const recorrer = (dir) => {
        for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
          const ruta = path.join(dir, entrada.name)
          if (entrada.isDirectory()) recorrer(ruta)
          else if (EXTENSIONES.has(path.extname(entrada.name).toLowerCase())) archivos.push(ruta)
        }
      }
      recorrer(dist)

      let tocadas = 0
      let antes = 0
      let despues = 0

      for (const archivo of archivos) {
        const original = await fs.promises.readFile(archivo)
        const meta = await sharp(original).metadata()
        if (!meta.width || !meta.height) continue

        antes += original.length
        if (Math.max(meta.width, meta.height) <= LIMITE_LADO_LARGO) {
          despues += original.length
          continue
        }

        const esWebp = path.extname(archivo).toLowerCase() === '.webp'
        const redimension = (pipeline) => pipeline.resize({
          width: LIMITE_LADO_LARGO,
          height: LIMITE_LADO_LARGO,
          fit: 'inside',
          withoutEnlargement: true
        })
        const codificar = (calidad) =>
          (esWebp
            ? redimension(sharp(original)).webp({ quality: calidad, effort: 4 })
            : redimension(sharp(original)).jpeg({ quality: calidad, mozjpeg: true })
          ).toBuffer()

        let buffer = await codificar(92)
        if (buffer.length >= original.length) buffer = await codificar(80)

        if (buffer.length < original.length) {
          await fs.promises.writeFile(archivo, buffer)
          tocadas++
        }
        despues += Math.min(buffer.length, original.length)
      }

      if (tocadas) {
        const mb = (b) => (b / 1024 / 1024).toFixed(1)
        console.log(
          `  redimensionadas ${tocadas} imágenes (> ${LIMITE_LADO_LARGO}px): ${mb(antes)} → ${mb(despues)} MB`
        )
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    redimensionarParaBuild(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
        effort: 4
      },
      png: {
        quality: 80
      },
      jpg: {
        quality: 80
      }
    })
  ],
})
