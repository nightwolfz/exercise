import http from 'http'
import Koa from 'koa'
import config from './config'
import routes from './routes'

const app = new Koa()
const server = http.createServer(app.callback())

// Routes
app.use(routes.routes())
app.use(async(ctx) => {
  ctx.body = `Just a placeholder. Maybe a documentation page here.`
})

server.listen(config.http.port, () => {
  console.info('[server] listening to', config.http.port)
})

export default server
