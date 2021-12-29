const router = require("express").Router();

const AuthController = require("../controllers/auth");
const SchemaValidator = require('../middlewares/joiValidator');
const joiValidator = SchemaValidator(true);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login)

module.exports = router;