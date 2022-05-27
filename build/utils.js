const net = require('net')
const checkAvailablePort = ({ port, host } = {}) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(port, host, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
  })
}
async function getPort({ port, host } = {}) {
  port = port ?? 443
  host = host ?? '127.0.0.1'
  let flag = true
  while (flag) {
    try {
      await checkAvailablePort({ port, host })
      flag = false
    } catch (error) {
      port++
    }
  }
  return {
    port,
    host,
  }
}
module.exports = {
  getPort,
}
