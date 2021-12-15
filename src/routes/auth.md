# Register

Registers user
Can't register user with admin role, Check [`POST /api/users`](src/routes/user.md)
Returns token used for Authorization

**URL** : `/api/register/`
**Method** : `POST`
**Auth required** : NO

**Request Data constraints**

```json
{
    "email": "[unique valid email address]",
    "password": "[password in plain text]",
    "full_name": "[names separated by space"
}
```

**Request Data Example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234",
    "full_name": "Bell Omuboye"
}
```

## Success Response

**Code** : `201`

**Content example**
```json
{
    "message": "User created",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFiOWMxMGY2YzMyMjVkMjQzYzZjZjFkIiwiaWF0IjoxNjM5NTYzNTM1LCJleHAiOjE2Mzk1NjQxMzV9.T8pdwtR-L4IU7GjJsWmZtP0gz3S3wFQ46l2DQfju-CE",
        "user_id": "61b9c10f6c3225d243c6cf1d",
        "email": "campbel.omuboye@gmail.com",
        "full_name": "Bell Omuboye"
    }
}
```

## Error Response

**Condition** : If 'email' already exists
**Code** : `400`
**Content** :
```json
{
    "error": true,
    "message": "User could not be created",
    "data": "Error: MongoServerError: E11000 duplicate key error collection: l21-standardization.users index: email_1 dup key: { email: \"campbel.omuboye@gmail.com\" }"
}
```


# Login

Logs in user

**URL** : `/api/auth/login`
**Method** : `POST`
**Auth required** : NO

**Request Data constraints**

```json
{
    "email": "[unique valid email address]",
    "password": "[password in plain text]",
```

**Request Data Example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234",
}
```

## Success Response

**Code** : `200`
**Content example**
```json
{
    "message": "User signed in",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFiOWMxMGY2YzMyMjVkMjQzYzZjZjFkIiwiaWF0IjoxNjM5NTYzOTE2LCJleHAiOjE2Mzk1NjQ1MTZ9.yf_Pm5a96x9op8NbA6HGh0ER7sM46wmCG_srUVYtCXg",
        "user_id": "61b9c10f6c3225d243c6cf1d",
        "email": "campbel.omuboye@gmail.com",
        "full_name": "Bell Omuboye"
    }
}
```

## Error Response

**Condition** : If 'email' or 'password' is wrong
**Code** : `400`
**Content** :
```json
{
    "error": true,
    "message": "Invalid email or password"
}
```

**Generic Error**
**Code** : `400`
**Content** :
```json
{
    "error": true,
    "message": "unable to signin",
    "data": ["error message"]
}
```