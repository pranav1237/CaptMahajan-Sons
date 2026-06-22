const fs = require('fs').promises
const path = require('path')
const fetch = global.fetch || require('node-fetch')

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = await res.arrayBuffer()
  await fs.writeFile(dest, Buffer.from(buffer))
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..')
  const dataDir = path.join(repoRoot, 'data')
  const publicDir = path.join(repoRoot, 'public')
  const prod = JSON.parse(await fs.readFile(path.join(dataDir, 'products.json'), 'utf8'))
  const cats = JSON.parse(await fs.readFile(path.join(dataDir, 'categories.json'), 'utf8'))

  const prodOut = []
  await ensureDir(path.join(publicDir, 'products'))
  await ensureDir(path.join(publicDir, 'categories'))

  for (const p of prod) {
    try {
      const url = p.image
      const ext = path.extname(new URL(url).pathname) || '.jpg'
      const filename = `${p.id}${ext}`
      const dest = path.join(publicDir, 'products', filename)
      console.log('Downloading', url, '->', dest)
      await download(url, dest)
      prodOut.push({ ...p, image: `/products/${filename}` })
    } catch (e) {
      console.error('Failed to download product', p.id, e.message)
      prodOut.push(p)
    }
  }

  const catsOut = []
  for (const c of cats) {
    try {
      const url = c.image
      if (url && url.startsWith('http')) {
        const ext = path.extname(new URL(url).pathname) || '.jpg'
        const filename = `cat-${c.id}${ext}`
        const dest = path.join(publicDir, 'categories', filename)
        console.log('Downloading', url, '->', dest)
        await download(url, dest)
        catsOut.push({ ...c, image: `/categories/${filename}` })
      } else {
        catsOut.push(c)
      }
    } catch (e) {
      console.error('Failed to download category', c.id, e.message)
      catsOut.push(c)
    }
  }

  await fs.writeFile(path.join(dataDir, 'products.local.json'), JSON.stringify(prodOut, null, 2))
  await fs.writeFile(path.join(dataDir, 'categories.local.json'), JSON.stringify(catsOut, null, 2))

  console.log('Done. Wrote products.local.json and categories.local.json')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
