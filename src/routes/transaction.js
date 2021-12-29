const router = require("express").Router();
const TransactionController = require("../controllers/transaction");
const { isAuthenticated, isAdmin, isAdminOrOwner } = require("../middlewares/auth")
const joiValidator = require("../middlewares/joiValidator")

router.post("/deposit", joiValidator, TransactionController.createDeposit)
router.post("/withdraw", joiValidator, isAuthenticated, TransactionController.createWithdrawal)
router.post("/transfer", joiValidator, isAuthenticated, TransactionController.createTransfer)
router.get("/:user_id", isAdminOrOwner, TransactionController.getTransactionsByUserId)
router.get("/", TransactionController.getAllTransactions)
router.get("/:transaction_id", TransactionController.getTransactionById)
router.delete("/:transaction_id/reverse", isAdmin, TransactionController.reverseTransaction)


module.exports = router;