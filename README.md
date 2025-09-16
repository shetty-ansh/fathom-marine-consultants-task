# 🚢 Fathom Marine Consultants Task API

A RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** for managing **users** and **ships**.  
Includes JWT-based authentication, secure password handling, validation, and consistent error responses.

## 📌 Features

- 🔐 User registration and login with JWT tokens
- 🚢 CRUD operations for ships
- 📋 Ship details include crew, source, destination, travel status, and archived flag
- ✅ Validation for required fields (e.g., shipUID, name, email)
- 🛡️ Centralized error handling with custom `apiError`
- 🔒 Protected routes with JWT middleware
- 📚 Postman collection with request/response examples

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Environment**: dotenv for environment variables
- **CORS**: cors middleware for cross-origin requests

## 📦 Dependencies

### Runtime

- `express` – Web framework
- `mongoose` – MongoDB ODM
- `jsonwebtoken` – JWT token generation & verification
- `bcrypt` – Password hashing
- `dotenv` – Environment variable management
- `cors` – Cross-Origin Resource Sharing

### Development

- `nodemon` – Auto-restart server on changes

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shetty-ansh/fathom-marine-consultants-task.git
   cd fathom-marine-consultants-task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret_key
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   node index.js
   ```

## 📡 API Documentation

### 👤 User Management

#### Register New User

- **Endpoint**: `POST /auth/register`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "Bob Smith",
    "email": "bob.smith@example.com",
    "username": "bobsmith",
    "password": "SecurePass456!"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "message": "User Added Successfully",
    "user": {
      "_id": "68c8fb6e2be1067d3b876357",
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "username": "bobsmith",
      "role": "employee",
      "archived": false,
      "createdAt": "2025-09-16T05:53:50.720Z",
      "updatedAt": "2025-09-16T05:53:50.720Z"
    }
  }
  ```

#### User Login

- **Endpoint**: `POST /auth/login`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "username": "bobsmith",
    "password": "SecurePass456!"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "user": {
      "_id": "68c8fb6e2be1067d3b876357",
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "username": "bobsmith",
      "role": "employee",
      "archived": false
    },
    "accessToken": "<JWT_ACCESS_TOKEN>",
    "refreshToken": "<JWT_REFRESH_TOKEN>"
  }
  ```

### 🚢 Ship Management

#### Get All Ships

- **Endpoint**: `GET /ships`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (optional)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "68c86be3c8b87e572381ca97",
        "shipUID": "SHIP-002",
        "name": "Arctic Voyager",
        "email": "captain.voyager@polarline.com",
        "isTraveling": false,
        "isArchived": false,
        "crew": [
          { "name": "Henry Snow", "role": "Captain" },
          { "name": "Sasha Winters", "role": "Navigator" }
        ],
        "createdAt": "2025-09-15T19:41:23.599Z",
        "updatedAt": "2025-09-15T19:41:23.599Z"
      },
      {
        "_id": "68c86b06c8b87e572381ca93",
        "shipUID": "SHIP-001",
        "name": "Ocean Explorer",
        "source": "Port of Singapore",
        "destination": "Port of Dubai",
        "email": "captain@oceanexplorer.com",
        "isTraveling": true,
        "isArchived": false,
        "crew": [],
        "createdAt": "2025-09-15T19:37:42.718Z",
        "updatedAt": "2025-09-15T19:37:42.718Z"
      }
    ]
  }
  ```

#### Get Ship by ID

- **Endpoint**: `GET /ships/:id`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (optional)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "shipData": {
      "_id": "68c86b06c8b87e572381ca93",
      "shipUID": "SHIP-001",
      "name": "Ocean Explorer",
      "source": "Port of Singapore",
      "destination": "Port of Dubai",
      "email": "captain@oceanexplorer.com",
      "isTraveling": true,
      "isArchived": false,
      "crew": [],
      "createdAt": "2025-09-15T19:37:42.718Z",
      "updatedAt": "2025-09-15T19:37:42.718Z"
    }
  }
  ```

#### Create New Ship (Protected)

- **Endpoint**: `POST /ships`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "shipUID": "SHIP-003",
    "name": "Pacific Voyager",
    "email": "captain@pacific.com",
    "isTraveling": true,
    "source": "Port of Los Angeles",
    "destination": "Port of Tokyo"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Ship created",
    "ship": {
      "_id": "68c86be3c8b87e572381ca98",
      "shipUID": "SHIP-003",
      "name": "Pacific Voyager",
      "email": "captain@pacific.com",
      "isTraveling": true,
      "isArchived": false,
      "source": "Port of Los Angeles",
      "destination": "Port of Tokyo",
      "crew": [],
      "createdAt": "2025-09-15T19:41:23.599Z",
      "updatedAt": "2025-09-15T19:41:23.599Z"
    }
  }
  ```

#### Update Ship (Protected)

- **Endpoint**: `PUT /ships/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "name": "Ocean Explorer II",
    "isTraveling": false,
    "destination": "Port of Sydney"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Ship updated successfully",
    "data": {
      "_id": "68c86b06c8b87e572381ca93",
      "shipUID": "SHIP-001",
      "name": "Ocean Explorer II",
      "source": "Port of Singapore",
      "destination": "Port of Sydney",
      "email": "captain@oceanexplorer.com",
      "isTraveling": false,
      "isArchived": false,
      "crew": [],
      "createdAt": "2025-09-15T19:37:42.718Z",
      "updatedAt": "2025-09-16T06:45:30.123Z"
    }
  }
  ```

#### Delete Ship (Protected)

- **Endpoint**: `DELETE /ships/:id`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Ship deleted"
  }
  ```

## 🔐 Authentication & Authorization

- All protected routes require a valid JWT token in the `Authorization` header
- Token format: `Authorization: Bearer <JWT_TOKEN>`
- Access tokens expire in 1 day by default (configurable via `ACCESS_TOKEN_EXPIRY`)
- Refresh tokens expire in 10 days by default (configurable via `REFRESH_TOKEN_EXPIRY`)

## 🚀 Deployment

1. Set up a MongoDB database (e.g., MongoDB Atlas)
2. Configure environment variables in production
3. Install production dependencies:
   ```bash
   npm install --production
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. For production, consider using PM2 or similar process manager

## 👨‍💻 Author

**Ansh Shetty**  
[GitHub Profile](https://github.com/shetty-ansh)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.