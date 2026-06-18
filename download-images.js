#!/usr/bin/env node
/**
 * Downloads all 24 plant photos from Pexels into public/images/.
 * Usage:
 *   PEXELS_KEY=your_key_here node download-images.js
 *
 * Get a free key at: https://www.pexels.com/api/new/
 */

import { createWriteStream, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'
import path from 'path'
import { fileURLToPath } from 'url'

const KEY = process.env.PEXELS_KEY
if (!KEY) {
  console.error('\n❌  Set your Pexels API key first:\n')
  console.error('   PEXELS_KEY=your_key_here node download-images.js\n')
  console.error('   Get a free key at: https://www.pexels.com/api/new/\n')
  process.exit(1)
}

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'images')
mkdirSync(DIR, { recursive: true })

const IMAGES = [
  // Hero
  { file: 'hero.jpg',               orient: 'landscape', query: 'tropical houseplants monstera overhead dark green' },

  // Magazine strip (portrait panels)
  { file: 'strip-fig.jpg',          orient: 'portrait',  query: 'weeping fig indoor plant apartment morning light' },
  { file: 'strip-fern.jpg',         orient: 'portrait',  query: 'boston fern hanging plant bathroom tropical' },
  { file: 'strip-elephant.jpg',     orient: 'portrait',  query: 'alocasia elephant ear plant moody dark' },
  { file: 'strip-cactus.jpg',       orient: 'portrait',  query: 'cactus succulents terracotta pot windowsill' },

  // Editorial features
  { file: 'editorial-monstera.jpg', orient: 'portrait',  query: 'monstera deliciosa leaves golden light closeup' },
  { file: 'editorial-pothos.jpg',   orient: 'portrait',  query: 'pothos plant cascading shelf vines boho' },
  { file: 'editorial-zz.jpg',       orient: 'landscape', query: 'ZZ plant dark background dramatic light' },

  // Shop product shots (portrait cards)
  { file: 'shop-monstera.jpg',      orient: 'portrait',  query: 'monstera plant black pot studio neutral' },
  { file: 'shop-pothos.jpg',        orient: 'portrait',  query: 'golden pothos terracotta pot clean background' },
  { file: 'shop-fig.jpg',           orient: 'portrait',  query: 'ficus benjamina white ceramic pot studio' },
  { file: 'shop-zz.jpg',            orient: 'portrait',  query: 'zamioculcas ZZ plant dark matte pot' },
  { file: 'shop-fern.jpg',          orient: 'portrait',  query: 'boston fern hanging white ceramic pot' },
  { file: 'shop-elephant.jpg',      orient: 'portrait',  query: 'alocasia elephant ear white pot product' },
  { file: 'shop-cactus.jpg',        orient: 'portrait',  query: 'columnar cactus terracotta pot studio' },
  { file: 'shop-fiddle.jpg',        orient: 'portrait',  query: 'fiddle leaf fig ficus lyrata tall black pot' },

  // Care strip
  { file: 'care-light.jpg',         orient: 'landscape', query: 'plant leaves dramatic sunbeams window light green' },
  { file: 'care-water.jpg',         orient: 'landscape', query: 'water drops tropical leaves macro fresh green' },
  { file: 'care-pot.jpg',           orient: 'landscape', query: 'ceramic terracotta plant pots collection earthy' },

  // Lifestyle gallery
  { file: 'gallery-1.jpg',          orient: 'landscape', query: 'monstera living room apartment interior lifestyle' },
  { file: 'gallery-2.jpg',          orient: 'landscape', query: 'fiddle leaf fig reading chair golden light cozy' },
  { file: 'gallery-3.jpg',          orient: 'landscape', query: 'succulents kitchen windowsill sunlight home' },
  { file: 'gallery-4.jpg',          orient: 'landscape', query: 'couple indoor plants living room greenery' },
  { file: 'gallery-5.jpg',          orient: 'landscape', query: 'home office desk plants books natural light' },
]

async function search(query, orientation) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=${orientation}`
  const res = await fetch(url, { headers: { Authorization: KEY } })
  if (!res.ok) throw new Error(`Pexels API ${res.status}: ${await res.text()}`)
  const data = await res.json()
  if (!data.photos?.length) throw new Error(`No photos found for: "${query}"`)
  return data.photos[0].src.large2x
}

async function download(imgUrl, file) {
  const res = await fetch(imgUrl)
  if (!res.ok) throw new Error(`Download failed ${res.status}`)
  const dest = path.join(DIR, file)
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest))
}

async function run() {
  console.log(`\n🌿  Downloading ${IMAGES.length} plant photos to public/images/\n`)
  let ok = 0, fail = 0

  for (const { file, orient, query } of IMAGES) {
    try {
      process.stdout.write(`  ↓ ${file.padEnd(28)} `)
      const imgUrl = await search(query, orient)
      await download(imgUrl, file)
      console.log('✓')
      ok++
      // Pexels free tier: 200 req/hour — small delay to be polite
      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      console.log(`✗  ${err.message}`)
      fail++
    }
  }

  console.log(`\n${ok === IMAGES.length ? '✅' : '⚠️ '} Done — ${ok}/${IMAGES.length} downloaded${fail ? `, ${fail} failed` : ''}\n`)
  if (fail) {
    console.log('Re-run the script to retry failed images, or drop your own JPGs into public/images/\n')
  }
}

run().catch(err => { console.error('\n❌ Fatal:', err.message); process.exit(1) })
