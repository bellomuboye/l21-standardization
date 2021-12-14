const UserService = require("../services/user");

module.exports = class User{
    static async apiGetAllUsers(req, res, next){
        try {
            const users = await UserService.getAllUsers();
            if(!users) res.status(404).json("There are no users yet!")
            res.json({status: "Mad child", users});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}