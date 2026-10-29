const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const OUT_DIR = path.join(__dirname, '..', 'public', 'imagenes-filandia')
const PAUT_DIR = (slug) => path.join(__dirname, '..', 'public', 'pautantes', slug, 'imagenes')

// Wikimedia Commons Special:FilePath supports width resize
const commons = (file, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`

/** name -> { url, credit } */
const ASSETS = [
  // Miradores / paisajes
  { out: path.join(OUT_DIR, 'mirador-1.webp'), url: commons('Mirador de Filandia.jpg'), credit: 'Wikimedia Commons - Mirador de Filandia' },
  { out: path.join(OUT_DIR, 'mirador-2.webp'), url: commons('Mirador filandia.JPG'), credit: 'Wikimedia Commons - Mirador filandia' },
  { out: path.join(OUT_DIR, 'mirador-colina.webp'), url: commons('Mirador Colina Iluminada (248878967).jpeg', 1600), credit: 'Pedro Agudelo Gaona / Wikimedia Commons / CC BY 3.0' },
  { out: path.join(OUT_DIR, 'mirador-quindio.webp'), url: commons('El mirador del Quindío.jpg'), credit: 'Wikimedia Commons - El mirador del Quindío' },
  { out: path.join(OUT_DIR, 'senderismo-1.webp'), url: commons('FilandiaQuindioSendero.jpg', 1200), credit: 'Wikimedia Commons - Sendero Filandia' },
  { out: path.join(OUT_DIR, 'camping-1.webp'), url: commons('Cercanías de Filandia. Bosque Barbas-Bremen (14205524860).jpg'), credit: 'Wikimedia Commons - Bosque Barbas-Bremen' },

  // Centro / arquitectura / iglesia
  { out: path.join(OUT_DIR, 'iglesia-1.webp'), url: commons('Iglesia de la Inmaculada Concepción, Filandia - panorámica.jpg'), credit: 'Wikimedia Commons - Iglesia Inmaculada Concepción' },
  { out: path.join(OUT_DIR, 'plaza-1.webp'), url: commons('Calle 7, Filandia.jpg'), credit: 'Wikimedia Commons - Calle 7' },
  { out: path.join(OUT_DIR, 'cultura-1.webp'), url: commons('Building in Filandia, 01.jpg'), credit: 'Wikimedia Commons - Building in Filandia' },
  { out: path.join(OUT_DIR, 'centro-1.webp'), url: commons('Calle del Convento, Filandia.jpg'), credit: 'Wikimedia Commons - Calle del Convento' },
  { out: path.join(OUT_DIR, 'centro-2.webp'), url: commons('Calle 7, Filandia 01.jpg'), credit: 'Wikimedia Commons - Calle 7 01' },
  { out: path.join(OUT_DIR, 'atardecer-1.webp'), url: commons('Atardecer en Filandia (15414184748).jpg'), credit: 'Wikimedia Commons - Atardecer en Filandia' },
  { out: path.join(OUT_DIR, 'atardecer-2.webp'), url: commons('Atardecer en Filandia (15600299245).jpg'), credit: 'Wikimedia Commons - Atardecer en Filandia' },

  // Negocios / estilo de vida
  { out: path.join(OUT_DIR, 'hotel-1.webp'), url: commons('Hotel Tibouchina, Filandia.jpg'), credit: 'Wikimedia Commons - Hotel Tibouchina' },
  { out: path.join(OUT_DIR, 'hotel-2.webp'), url: commons('Building in Filandia, 02.jpg'), credit: 'Wikimedia Commons - Building in Filandia 02' },
  { out: path.join(OUT_DIR, 'casa-hotel-1.webp'), url: commons('Calle 7, Filandia 02.jpg'), credit: 'Wikimedia Commons - Calle 7 02' },
  { out: path.join(OUT_DIR, 'hostal-1.webp'), url: commons('Calle de la Cruz, Filandia.jpg'), credit: 'Wikimedia Commons - Calle de la Cruz' },
  { out: path.join(OUT_DIR, 'artesanias-1.webp'), url: commons('Crafts Colombia, Filandia.jpg'), credit: 'Wikimedia Commons - Crafts Colombia Filandia' },
  { out: path.join(OUT_DIR, 'cafe-1.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - La Casa del Pandebono' },
  { out: path.join(OUT_DIR, 'cafe-mirador-1.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - La Casa del Pandebono' },
  { out: path.join(OUT_DIR, 'cafe-mirador-2.webp'), url: commons('Mirador Colina Iluminada (248878967).jpeg', 1600), credit: 'Pedro Agudelo Gaona / Wikimedia Commons / CC BY 3.0' },
  { out: path.join(OUT_DIR, 'tintin-cafe-1.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - La Casa del Pandebono' },
  { out: path.join(OUT_DIR, 'tienda-cafe-1.webp'), url: commons('Optica Estrella Llano, Filandia.jpg'), credit: 'Wikimedia Commons - Optica Estrella Llano' },
  { out: path.join(OUT_DIR, 'asadero-1.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - La Casa del Pandebono' },
  { out: path.join(OUT_DIR, 'dulces-1.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - La Casa del Pandebono' },
  { out: path.join(OUT_DIR, 'festival-1.webp'), url: commons('Atardecer en Filandia (15414214898).jpg'), credit: 'Wikimedia Commons - Atardecer en Filandia' },
  { out: path.join(OUT_DIR, 'transporte-1.webp'), url: commons('Calledefilandia.jpg', 1000), credit: 'Wikimedia Commons - Calle de Filandia' },

  // Pautantes hotel boutique
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'fachada-hotel.webp'), url: commons('Hotel Tibouchina, Filandia.jpg'), credit: 'Wikimedia Commons - Hotel Tibouchina' },
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'habitacion-deluxe.webp'), url: commons('Building in Filandia, 02.jpg'), credit: 'Wikimedia Commons - Building 02' },
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'suite-premium.webp'), url: commons('Calle 7, Filandia 02.jpg'), credit: 'Wikimedia Commons - Calle 7' },
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'terraza-vista.webp'), url: commons('Atardecer en Filandia (15601151282).jpg'), credit: 'Wikimedia Commons - Atardecer' },
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'restaurante-hotel.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - Casa del Pandebono' },
  { out: path.join(PAUT_DIR('hotel-boutique-filandia'), 'spa-jacuzzi.webp'), url: commons('Mirador Colina Iluminada (248878967).jpeg', 1600), credit: 'Pedro Agudelo Gaona / Wikimedia / CC BY 3.0' },

  // Pautantes truchas
  { out: path.join(PAUT_DIR('restaurante-truchas-filandia'), 'trucha-plancha.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - Casa del Pandebono (placeholder food vibe)' },
  { out: path.join(PAUT_DIR('restaurante-truchas-filandia'), 'terraza-vista.webp'), url: commons('Atardecer en Filandia (15414199908).jpg'), credit: 'Wikimedia Commons - Atardecer Filandia' },

  // Pautantes café
  { out: path.join(PAUT_DIR('cafe-tradicion-filandia'), 'cafeteria-interior.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - Casa del Pandebono' },
  { out: path.join(PAUT_DIR('cafe-tradicion-filandia'), 'cafe-tinto.webp'), url: commons('La Casa del Pandebono, Filandia.jpg', 1200), credit: 'Wikimedia Commons - Casa del Pandebono' },
]

async function downloadOne(asset) {
  fs.mkdirSync(path.dirname(asset.out), { recursive: true })
  const res = await fetch(asset.url, {
    headers: {
      'User-Agent': 'FilandiaALaMano/1.0 (tourism map project; contact@filandialamano.com)',
      'Accept': 'image/*,*/*',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${asset.url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 500) throw new Error(`Too small: ${asset.url}`)
  await sharp(buf)
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(asset.out)
  const kb = Math.round(fs.statSync(asset.out).size / 1024)
  console.log(`OK  ${path.relative(path.join(__dirname, '..'), asset.out)}  (${kb} KB)`)
}

async function main() {
  let ok = 0
  let fail = 0
  for (const asset of ASSETS) {
    try {
      await downloadOne(asset)
      ok++
    } catch (e) {
      fail++
      console.error(`FAIL ${path.basename(asset.out)}: ${e.message}`)
    }
  }

  const credits = ASSETS.map(a => `- ${path.relative(path.join(__dirname, '..'), a.out)} — ${a.credit}`).join('\n')
  fs.writeFileSync(
    path.join(OUT_DIR, 'CREDITS.md'),
    `# Créditos de imágenes (Wikimedia Commons / CC)\n\nImágenes de referencia descargadas para diseño. Verificar licencia y autoría antes de producción comercial.\n\n${credits}\n`
  )
  console.log(`\nDone: ${ok} ok, ${fail} failed`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
