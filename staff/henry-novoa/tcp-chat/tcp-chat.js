const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date()

    // expected format YYYY-MM-DD hh:mm

    socket.end(formattedDate)
})

server.listen(port)

// $ nc localhost 8080