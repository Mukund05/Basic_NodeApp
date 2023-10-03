# Basic Nodejs Project

## Overview
This Node.js project provides a simple and secure REST API with authentication, user management (CRUD operations),and a forget password feature. It uses MongoDB Atlas for data storage and Nodemailer for sending forget password emails.

## Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB Atlas connection in the `.env` file.
4. Configure email settings in the `.env` file.
   
## Configuration
Create a .env file in the project root.
1. Database Configuration: Replace 'MONGODB_URI' in .env with your actual MongoDB database URL and PORT.
2. Gmail Configuration:
Add your Gmail id and password to the .env file:
  TEST_EMAIL=your-email@gmail.com
  TEST_PASSWORD=your-email-password

## CRUD Operations
- Create User: POST `/user`
- Get User by ID: GET `/user/:id`
- Update User: PUT `/user/:id`
- Delete User: DELETE `/user/:id`

## Forget Password
- Send Forget Password Email: POST `/forgot-password`
- Reset Password: POST `/reset-password/:token`

## Deployment
1. Install the necessary module using `npm i`.
2. Now run the server using command `node index.js`.

##Additional Information
1. Passwords are hashed for security using bcrypt.
2. Uses MongoDB for data storage.
3. Implements a forget password feature with email notifications.

## How to Contribute
Fork the repository and submit pull requests.
