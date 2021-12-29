const router = require("express").Router();

const AuthController = require("../controllers/auth");
const joiValidator = require("../middlewares/joiValidator")

router.post("/register", joiValidator, AuthController.register);
router.post("/login", joiValidator, AuthController.login)

module.exports = router;