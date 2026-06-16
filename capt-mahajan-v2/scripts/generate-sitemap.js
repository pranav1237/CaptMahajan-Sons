const fs = require('fs').promises
const path = require('path')

async function main() {
  const root = path.resolve(__dirname, '..')
  const publicDir = path.join(root, 'public')
  const dataDir = path.join(root, 'data')

  const products = JSON.parse(await fs.readFile(path.join(dataDir, 'products.local.json'), 'utf8'))
  const categories = JSON.parse(await fs.readFile(path.join(dataDir, 'categories.local.json'), 'utf8'))

  const urls = []
  urls.push({ loc: '/', priority: 1.0 })
  categories.forEach((c) => urls.push({ loc: `/products/${c.slug}`, priority: 0.8 }))
  products.forEach((p) => urls.push({ loc: `/products/${p.category}`, priority: 0.6 }))

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>https://example.com${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}\n</urlset>`

  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  await fs.writeFile(path.join(publicDir, 'robots.txt'), 'User-agent: *\nSitemap: https://example.com/sitemap.xml', 'utf8')
  console.log('Wrote public/sitemap.xml and robots.txt')
}

main().catch(err => { console.error(err); process.exit(1) })
