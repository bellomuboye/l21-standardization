require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TransactionService = require("../services/transaction");
const UserService = require("../services/user")

module.exports = class Tranasaction{
    static async createDeposit(req, res, next){
        const data = req.body;

        try{
            const transactionData = {
                amount: Math.abs(data.amount),
                recipient_id: data.recipient_id,
                sender_id: data.sender_id,
                type: "deposit"
            }

            const depositTransaction = await TransactionService.createTransaction(transactionData)
            const updateRecipientTransaction = await UserService.addUserTransactionbyId({user_id: depositTransaction.recipient_id, transaction_id: depositTransaction._id})

            res.status(201).send({
                message: "deposit created",
                data: {
                    amount: depositTransaction.amount,
                    sender_id: data.sender_id,
                    recipient_id: data.recipient_id,
                    type: "deposit",
                    transaction_id: depositTransaction._id
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "Deposit could not be created",
                data: error.toString(),
                stack: error.stack
            })
        }
    }
    static async createWithdrawal(req, res, next){
        const data = req.body;

        try{
            if (!req.USER_ID) throw new Error("Unauthorized")

            const transactionData = {
                amount: -Math.abs(data.amount),
                recipient_id: data.recipient_id,
                sender_id: req.USER_ID,
                type: "withdraw"
            }

            const withdrawTansaction = await TransactionService.createTransaction(transactionData)
            const updateSenderTransaction = await UserService.addUserTransactionbyId({user_id: withdrawTansaction.sender_id, transaction_id: withdrawTansaction._id})

            res.status(201).send({
                message: "withdraw created",
                data: {
                    amount: withdrawTansaction.amount,
                    sender_id: data.sender_id,
                    recipient_id: data.recipient_id,
                    type: "withdraw",
                    transaction_id: withdrawTansaction._id
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "withdraw could not be created",
                data: error.toString()
            })
        }
    }
    static async createTransfer(req, res, next){
        const data = req.body;

        try{
            if (!req.USER_ID) throw new Error("Unauthorized")
            if (data.recipient_id === data.sender_id) throw new Error("sender and recipient ids can not be the same")

            const transactionData = {
                amount: Math.abs(data.amount),
                recipient_id: data.recipient_id,
                sender_id: req.USER_ID,
                type: "transfer"
            }

            const transferTransaction = await TransactionService.createTransaction(transactionData)
            const updateSenderTransaction = await UserService.addUserTransactionbyId({user_id: transferTransaction.sender_id, transaction_id: transferTransaction._id})
            const updateRecipientTransaction = await UserService.addUserTransactionbyId({user_id: transferTransaction.recipient_id, transaction_id: transferTransaction._id})

            res.status(201).send({
                message: "transfer created",
                data: {
                    amount: transferTransaction.amount,
                    sender_id: data.sender_id,
                    recipient_id: data.recipient_id,
                    type: "transfer",
                    transaction_id: transferTransaction._id
                }
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "transfer could not be created",
                data: error.toString()
            })
        }
    }
    static async getTransactionsByUserId(req, res, next){
        const user_id = req.params.user_id || req.body.user_id
        try {
            const user = await UserService.getUserTransactions(user_id)
            if (!user) return res.status(404).send({error: true, message: "invalid user id"})

            res.send({
                message: "user's transactions gotten",
                data: user
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "user's transactions could not be gotten",
                data: error.toString()
            })
        }
    }
    static async getAllTransactions(req, res, next){
        try {
            if (!req.USER_ID) throw new Error("Unauthorized")
            const transactions = await TransactionService.getAllTransactions()
            if (!transactions) return res.status(404).send({error: true, message: "no users"})
            res.send({message: "all transactions gotten", data: transactions})
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to get transactions",
                data: error.toString()
            })
        }
    }

    static async getTransactionById(req, res, next) {
        const transaction_id = req.params.transaction_id || req.body.transaction_id;

        try {
            const transaction = await TransactionService.getTransactionById(transaction_id)
            if (!transaction) return res.status(404).send({error: true, message: "invalid transaction id"})
            res.send({
                message: "user gotten",
                data: transaction
            })
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to get transaction",
                data: error.toString()
            })
        }
    }

    static async reverseTransaction(req, res, next) {
        const transaction_id = req.params.transaction_id
        try {
            const transaction = await TransactionService.getTransactionById(transaction_id)
            if (!transaction) return res.status(404).send({error: true, message: "invalid transaction id"})
            if (transaction.type === "deceipt") {
                await UserService.deleteUserTransaction({user_id: transaction.recipient_id, transaction_id: transaction._id})
            } else if (transaction.type === "withdraw") {
                await UserService.deleteUserTransaction({user_id: transaction.sender_id, transaction_id: transaction._id})
            } else if (transaction.type === "transfer") {
                await UserService.deleteUserTransaction({user_id: transaction.recipient_id, transaction_id: transaction._id})
                await UserService.deleteUserTransaction({user_id: transaction.sender_id, transaction_id: transaction._id})
            } else throw new Error ("invalid transaction type")
            
            const deleteTransaction = await TransactionService.deleteTransactionById(transaction_id)
        } catch (error) {
            res.status(400).send({
                error: true,
                message: "unable to reverse transaction",
                data: error.toString()
            })
        }
    }
    
}