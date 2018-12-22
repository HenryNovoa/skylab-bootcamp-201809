require('dotenv').config()

const express = require('express')

const router = require('./routes')
const app = express()

const package = require('./package.json')
const cors = require('./utils/cors')


const { env: { PORT, JWT_SECRET } } = process

const { argv: [, , port = PORT || 8080] } = process

app.use(cors)

app.use('/api', router)

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))