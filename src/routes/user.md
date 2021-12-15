# Add User

Creates a new user
Can create user with admin role
Returns token used for Authorization

**URL** : `/api/users`
**Method** : `POST`
**Auth required** : YES
    Header - Authorization - [token from register or signin]
    Must be ADMIN

**Request Data constraints**
```json
{
    "email": "[unique valid email address]",
    "password": "[password in plain text]",
    "full_name": "[names separated by space",
    "role" : "['user' or 'admin'. default: 'user']
}
```

**Request Data Example**
```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234",
    "full_name": "Bell Omuboye",
    "role": "user"
}
```

## Success Response
**Code** : `201`
**Content example**
```json
{
    "message": "User created",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFiOWM0ODY2MDNjYTVkNDNhYWFiNTk5IiwiaWF0IjoxNjM5NTY0NDIyLCJleHAiOjE2Mzk1NjUwMjJ9.s0EbjdAnDXffz3_X3GplsGalTbYolCxkJBiREYabjbA",
        "user_id": "61b9c486603ca5d43aaab599",
        "email": "campbell.omuboye@gmail.com",
        "full_name": "Kalada Ikiroma",
        "role": "user"
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

**Generic Error**
**Code** : `400`
**Content** :
```json
{
    "error": true,
    "message": "user could not be created",
    "data": ["error message"]
}
```


# View User

Gets user's details

**URL** : `/api/users/:user_id`
**Method** : `GET`
**Auth required** : YES
    Header - Authorization - [token from register or signin]
    Must be ADMIN

**Request Data constraints**
`req.params.user_id`

**Request Data Example**
`/api/users/61b9c486603ca5d43aaab599`


## Success Response
**Code** : `201`
**Content example**
```json
{
    "message": "user gotten",
    "data": {
        "user_id": "61b9c486603ca5d43aaab599",
        "email": "campbell.omuboye@gmail.com",
        "full_name": "Kalada Ikiroma",
        "status": "enabled",
        "role": "user"
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

**Generic Error**
**Code** : `400`
**Content** :
```json
{
    "error": true,
    "message": "user could not be created",
    "data": ["error message"]
}
```