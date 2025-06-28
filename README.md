# Task-Management-Application-with-secure-multi-user-functionality-
This project is a Task Management Web Application Built using Node.js, Express.js, and MongoDB 

# 🚀 Features

- User Registration and Login
- Secure JWT Authentication
- Password Hashing with bcrypt
- Create, Read, Update, Delete (CRUD) Tasks
- Mark Tasks as Completed 
- Task Filtering: All / Completed / Pending
- Task Sharing with Other Users
- View Tasks Shared with You
- Only Task Owners Can Edit or Delete Tasks
- Shared Users Have View-Only Access
- Delete User and Cascade Delete Their Tasks
- Access Revoked When a User is Deleted

# 📦 Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt
- Testing: Postman

# :gear: Routes Involved
- /users/register
- /users/login
- /users/me
- /tasks
- /tasks
- /tasks/id
- /tasks/filter?filter=completed
- /tasks/filter?filter=completed
- /tasks/filter?filter=completed
- /tasks/id/share
- /tasks/id/unshare

# :pencil: ENV Variables Involved
- PORT 
- MONGO_URL
- JWT_SECRET_KEY
- DB_NAME

# :gem: Initiation
- Step 1:  install requirements: npm i bcrypt,cors,dotenv,express,jsonwebtoken,mongoose
- Step 2:  use .env variables 
- Step 2:  use npm start or node index.js to run the server
