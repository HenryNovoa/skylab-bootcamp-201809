const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const mins = date.getMinutes()

    const formattedDate = `${year}-${digits(month)}-${digits(day)} ${digits(hours)}:${digits(mins)}\n`

    socket.end(formattedDate)
})

function digits(num) {
    return num < 10 ? `0${num}` : `${num}`
}

server.listen(port)
