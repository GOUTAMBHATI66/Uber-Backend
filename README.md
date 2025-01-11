# User Registration API

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and generates an authentication token for the user.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters (required).
  - `lastName`: A string with a minimum length of 3 characters (optional).
- `email`: A valid email address (required).
- `password`: A string with a minimum length of 8 characters (required).

Example:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and generates an authentication token for the user.

### Request Body:
The request body should be a JSON object with the following fields:

- `email`: A valid email address (required).
- `password`: A string with a minimum length of 8 characters (required).

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:
The response will be a JSON object containing the generated authentication token and the user details.

Example:
```json
{
  "generatedToken": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Endpoint: `/users/profile`

### Method: GET

### Description:
This endpoint is used to get the profile of the logged-in user. It requires authentication.

### Headers:
- `Authorization`: Bearer token (required)

### Response:
The response will be a JSON object containing the user details.

Example:
```json
{
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Endpoint: `/users/logout`

### Method: GET

### Description:
This endpoint is used to log out the user. It requires authentication.

### Headers:
- `Authorization`: Bearer token (required)

### Response:
The response will be a JSON object confirming the logout.

Example:
```json
{
  "message": "Successfully logged out"
}
```

# Captain Registration API

## Endpoint: `/captains/register`

### Method: POST

### Description:
This endpoint is used to register a new captain. It validates the input data, hashes the password, creates a new captain in the database, and generates an authentication token for the captain.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A valid email address (required).
- `password`: A string with a minimum length of 8 characters (required).
- `vehical`: An object containing:
  - `vehicalType`: A string with values 'car', 'auto', or 'bike' (required).
  - `capacity`: A number with a minimum value of 1 (required).
  - `color`: A string with a minimum length of 3 characters (required).
  - `plate`: A string with a minimum length of 3 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehical": {
    "vehicalType": "car",
    "capacity": 4,
    "color": "red",
    "plate": "ABC123"
  }
}
```

### Response:
The response will be a JSON object containing the generated authentication token and the captain details.

Example:
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehical": {
      "vehicalType": "car",
      "capacity": 4,
      "color": "red",
      "plate": "ABC123"
    }
  }
}
```