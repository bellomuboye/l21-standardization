const Joi = require('joi');

const email = Joi.string().email()
const password = Joi.string().min(7)
const fullname = Joi.string().regex(/^[A-Z]+ [A-Z]+$/i)
const role = Joi.string().valid('user', 'admin')
const amount = Joi.number()

const registrationDataSchema = Joi.object().keys({
    email: email.required(),
    password: password.required(),
    full_name: fullname.required(),
    role: role
})

const loginDataSchema = Joi.object().keys({
    email: email.required(),
    password: password.required()
})

const createUserDataSchema = registrationDataSchema

const depositTransactionDataSchema = Joi.object().keys({
    amount: amount.required(),
    recipient_id: Joi.string().required(),
    sender_id: Joi.string(),
    type: Joi.string().valid('deposit')
})

const withdrawalTransactionDataSchema = Joi.object().keys({
    amount: amount.required(),
    recipient_id: Joi.string(),
    sender_id: Joi.string().required(),
    type: Joi.string().valid('withdraw')
})

const transferTransactionData = Joi.object().keys({
    amount: amount.required(),
    recipient_id: Joi.string().required(),
    sender_id: Joi.string().required(),
    type: Joi.string().valid('transfer')
})

module.exports = {
    '/api/auth/register': registrationDataSchema,
    '/api/auth/login': loginDataSchema,
    '/api/users/': createUserDataSchema,
    '/api/transactions/deposit': depositTransactionDataSchema,
    '/api/transactions/withdraw' : withdrawalTransactionDataSchema,
    '/api/transactions/transfer' : transferTransactionData
}