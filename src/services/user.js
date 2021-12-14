const { errorMonitor } = require("stream");
const User = require("../models/user");

module.exports = class UserService {
    static async getAllUsers(){
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.log(`Could not fetch articles ${error}`)
        }
    }

    static async getUserbyId(userId){
        try {
            const response = await User.findById({_id: userId});
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getUserbyEmail(email){
        try {
            const response = await User.findOne({ email: email });
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    static async createUser(data){
        try {
            const newUser = {
                email: data.email,
                password: data.passwordHash,
                full_name: data.full_name
            }
           const response = await new User(newUser).save();
           return response;
        } catch (error) {
            throw new Error(error)
        } 

    }
}