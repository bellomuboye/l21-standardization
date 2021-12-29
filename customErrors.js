class ValidationError extends Error {
    constructor(message, data) {
        super();
        this.name = this.constructor.name

        this.error = true
        this.message = message,
        this.data = data
        this.statusCode = 400
    }
}

class AuthorizationError extends Error {
    constructor(message, data) {
        super()
        this.name = this.constructor.name
        
        this.error = true
        this.message = message
        this.data = data
        this.statusCode = 400
    }
}

module.exports = {
    ValidationError,
    AuthorizationError
}