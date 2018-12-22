class StatusError extends Error {
    constructor(message, extra) {
        super()

        Error.captureStackTrace(this, this.constructor)

        this.name = 'StatusError'
        this.message = message

        if (extra) this.extra = extra
    }
}

module.exports = StatusError