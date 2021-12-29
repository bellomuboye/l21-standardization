const router = require("express").Router();
const TransactionController = require("../controllers/transaction");
const { isAuthenticated, isAdmin } = require("../middlewares/auth")

router.post("/deposit", TransactionController.createDeposit)
router.post("/withdraw", isAuthenticated, TransactionController.createWithdrawal)
router.post("/transfer", isAuthenticated, TransactionController.createTransfer)
router.get("/:user_id", TransactionController.getTransactionsByUserId)
router.get("/", TransactionController.getAllTransactions)
router.get("/:transaction_id", TransactionController.getTransactionById)
router.delete("/:transaction_id/reverse", isAdmin, TransactionController.reverseTransaction)


module.exports = router;