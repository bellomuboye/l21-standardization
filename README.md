# Bell Omuboye
# Learnable 21 Standardization

## Authentication Endpoints

* [Register](src/routes/auth.md) : `POST /api/auth/register`
* [Login](src/routes/auth.md) : `POST /api/auth/login`

## User Endpoints
* [Add user](src/routes/user.md) : `POST /api/users` [ADMIN]
* [View user](src/routes/user.md) : `GET /api/users/:user_id`
* [View all users](src/routes/user.md) : `GET api/users` [ADMIN]
* [Delete user](src/routes/user.md) : `DELETE api/users/:user_id` [ADMIN]
* [Enable user](src/routes/user.md) : `PUT api/users/:user_id/enable`[ADMIN]
* [Disable user](src/routes/user.md) : `PUT api/users/:user_id/disable` [ADMIN]

## Transactions Endpoints
* [Deposit](src/routes/transaction.md) : `POST api/transactions/deposit`
* [Withdraw](src/routes/transaction.md) : `POST api/transactions/withdraw`
* [Transfer](src/routes/transaction.md) : `POST api/transactions/transfer`
* [View a user's transactions](src/routes/transaction.md) : `GET api/transactions/:user_id`
* [View aLL transaction](src/routes/transaction.md) : `GET /api/transactions` [ADMIN]
* [View a transaction details](src/routes/transaction.md) : `GET /api/transactions/transaction_id`
* [Reverse Transaction](src/routes/transaction.md) : `DELETE /api/transactions/:transaction_id/reverse`