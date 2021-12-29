const router = require("express").Router();

const AuthController = require("../controllers/auth");
const joiValidate = require("../middlewares/joiValidator")
const schemas = require("../middlewares/joiSchemas")

router.post("/register", joiValidate(schemas.registrationDataSchema, 'body'), AuthController.register);
router.post("/login", AuthController.login)

module.exports = router;