const UserService = require("../services/user");
const AuthService = require("../services/auth")
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = class User{
    static async register(req, res, next){
        const data = req.body;

        try {
            if(data.role === 'admin') {return res.status(400).send({ error: true, message: "role must be user" })}
            
            const passwordHash = await bcrypt.hash(data.password, 10)
            const user = await UserService.createUser({
                email: data.email,
                passwordHash,
                full_name: data.full_name
            });

            const token = jwt.sign({ user_id: user._id}, JWT_SECRET_KEY, {expiresIn: 60 * 10 });

            res.status(201).send({
                message: "User created",
                data: {
                    token,
                    user_id: user._id,
                    email: user.email,
                    full_name: user.full_name
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "User could not be created",
                data: error.toString()
            })
        }
    }

    static async login(req, res, next){
        const data = req.body;

        try {
            const user = await UserService.getUserbyEmail(data.email)
            if (!user) return res.status(400).send({ error: true, message: "Invalid email or password" })
            const validPassword = await AuthService.validatePassword({password: data.password, passwordHash: user.password});
            if (!validPassword) return res.status(400).send({ error: true, message: "Invalid email or password" })

            const token = jwt.sign({ user_id: user._id}, JWT_SECRET_KEY, {expiresIn: 60 * 10 });

            res.status(200).send({
                message: "User signed in",
                data: {
                    token,
                    user_id: user._id,
                    email: user.email,
                    full_name: user.full_name
                }
            })
        } catch(error) {
            res.status(400).send({
                error: true,
                message: "unable to signin",
                data: error.toString()
            })
        }
    }
}