const { errorMonitor } = require("stream");
const User = require("../models/user");

module.exports = class UserService {
    static async getAllUsers(){
        try {
            const allUsers = await User.find().select("-password");
            return allUsers;
        } catch (error) {
            throw new Error(error)
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

            if(data.role) newUser.role = data.role

           const response = await new User(newUser).save();
           return response;
        } catch (error) {
            throw new Error(error)
        } 

    }

    static async updateUserbyId(data){
        try {
            const updatedUser = await User.findByIdAndUpdate(
                data.user_id,
                { $set: {...data.changes} },
                { new: true }
            )
            return updatedUser
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteUserbyId(userId){
        try {
            const response = await User.findByIdAndDelete(userId);
            return response;
        } catch (error) {
            throw new Error(error)
        }

    }
}