# Basic Nodejs Project

## Overview
This Node.js project provides a simple and secure REST API with authentication, user management (CRUD operations),and a forget password feature. It uses MongoDB Atlas for data storage, Passport.js for user authentication, and Nodemailer for sending forget password emails.

## Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB Atlas connection in the `.env` file.
4. Configure email settings in the `.env` file.

## Authentication
- Passport.js is used for user authentication.
- Endpoints: `/register` for user registration, `/login` for user login.

## CRUD Operations
- Create User: POST `/user`
- Get User by ID: GET `/user/:id`
- Update User: PUT `/user/:id`
- Delete User: DELETE `/user/:id`

## Forget Password
- Send Forget Password Email: POST `/forgot-password`
- Reset Password: POST `/reset-password/:token`

## Deployment
1. Set up your MongoDB Atlas account and obtain the connection string.
2. Create a `.env` file with MongoDB URI, email user, email password, and base URL,PORT.
3. Deploy the application.

## How to Contribute
Fork the repository and submit pull requests.
