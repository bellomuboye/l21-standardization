const router = require("express").Router();
const UserController = require("../controllers/user");

router.post("/", UserController.createUser)
router.get("/", UserController.getAllUsers)
router.get("/:user_id", UserController.getUserbyId)
router.put("/:user_id/disable", UserController.disableUser)
router.put("/:user_id/enable", UserController.enableUser)
router.delete("/:user_id", UserController.deleteUserbyId)

module.exports = router;