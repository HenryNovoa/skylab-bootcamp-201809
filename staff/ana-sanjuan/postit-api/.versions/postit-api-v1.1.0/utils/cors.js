function cors(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, GET, DELETE'
    })

    next()
}

module.exports = cors