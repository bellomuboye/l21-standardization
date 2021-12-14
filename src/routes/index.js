const router = require("express").Router();
const authRoutes = require("./auth")

router.get('/', (req, res)=> {
    res.json({message: 'connected'})
})
router.use('/auth', authRoutes)

module.exports = router;