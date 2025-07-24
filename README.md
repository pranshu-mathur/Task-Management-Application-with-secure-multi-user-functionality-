# TASK MANAGEMENT APPLICATION:-
This Task Management Application is a secure, multi-user backend service built using 
Node.js, Express.js, and MongoDB. It enables users to register, authenticate, and manage 
tasks with features like task sharing, role-based access, and filtering. The application 
uses JWT tokens for stateless authentication and bcrypt for password encryption to ensure 
data privacy and user security.


# Features of Task Management Application:-
- User registration and secure login
- CRUD operations on tasks
- Task sharing with other users
- Filtering tasks by status (pending/completed)
- Access control: only task owners can edit/delete
- Automatic deletion of associated tasks when a user is removed

# Routes:-
## 1. User Routes:-
- [POST] /users/register
- [POST] /users/login
- [DELETE] /users/me
- [GET] /users/all

## 2. Task Routes:-
- [GET] /tasks/
- [GET] /tasks/:id
- [GET] /tasks/filter?filter=completed
- [GET] /tasks/filter?filter=pending
- [POST] /tasks/
- [PATCH] /tasks/:id
- [PATCH] /tasks/:id/share
- [PATCH] /tasks/:id/unshare
- [DELETE] /tasks/:id

# Steps:
- 1. Use npm start or node index to start the project
- 2. Pre-requirements for the project include -> bcrypt,dotenv,express,jsonwebtoken,mongoose
- 3. install all pre-requirements using npm i command


