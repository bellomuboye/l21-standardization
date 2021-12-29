const jwt = require("jsonwebtoken");
const UserService = require("./../services/user")

const { ValidationError, AuthorizationError } = require("../../errors")

module.exports = class AuthMiddleware {
    static async isAuthenticated(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new AuthorizationError("token is required in authorization header")
            const decodedToken = jwt.decode(token)

            const user = await UserService.getUserbyId(decodedToken.user_id)
            if (!user) throw new AuthorizationError("invalid token")
            req.USER_ID = user._id;

            next()
        } catch (error) {
            next(error)
        }
    }

    static async isAdmin(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Invalid or no token")
            const decodedToken = jwt.decode(token)

            const user = await UserService.getUserbyId(decodedToken.user_id)
            if (!user || user.role !== 'admin') throw new Error("Unauthorized")
            req.USER_ID = user._id;

            next()
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "invalid request",
                data: error.toString()
            })
            next(error)
        }
    }

    static async isAdminOrOwner(req, res, next){
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Invalid or no token")
            const decodedToken = jwt.decode(token)

            const user = await UserService.getUserbyId(decodedToken.user_id)
            if (!user) {
                throw new Error("Unauthorized")
            } else if (user.role === 'user' && user._id !== req.params.user_id) {
                throw new Error("Unauthorized")
            }

            req.USER_ID = user._id;

            next()
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "invalid request",
                data: error.toString()
            })
            next(error)
        }
    }
}