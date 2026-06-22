const next = require('next')
const http = require('http')

const port = process.env.PORT || 3000
const dev = true
const app = next({ dev, dir: process.cwd() })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
