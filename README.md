# Blogging Platform Application


## Installation Guide

### Cloning the repository

```shell
git clone git@github.com:ericz02/TTP-Blog-Sequelize.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
SESSION_SECRET=

```

### Start the app

```shell
npm start
```

## Available commands

Running commands with npm `npm [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `start`         | Starts a development instance of the app |

<br>

## Project Description

This is a CRUD web application for a blogging platform, built using Node.js, Express, and Sequelize. The application incorporates database relationships using Sequelize and implements user authentication and authorization.

## Objective

The objective of this project is to create a fully functional blogging platform with the following features:

- User registration and login
- User authentication and authorization
- CRUD operations for blog posts
- CRUD operations for comments
- Database relationships between users, posts, and comments
- Advanced querying and manipulation operations (bonus task)

## Project Tasks

### Task 1: Database Setup and Relationships

1. Set up a PostgreSQL database for the project.
2. Create the necessary tables: Users, Posts, and Comments, with appropriate columns and relationships.
3. Generate the models, migrations, and database tables using Sequelize.
4. Implement the following relationships using Sequelize:
   - One-to-Many: A User can have multiple Posts and Comments.
   - One-to-Many: A Post can have multiple Comments.
   - Many-to-One: A Comment belongs to a User and a Post.
5. Define the associations between the models in Sequelize.
6. Test the relationships by creating sample data and performing queries to retrieve associated records.

### Task 2: User Registration and Login

1. Implement user registration functionality using hashed passwords and bcryptjs.
2. Create an API endpoint to handle user registration.
3. Implement user login functionality, creating a session cookie upon successful login.
4. Create an API endpoint for user login.
5. Test the user registration and login endpoints using Postman.

### Task 3: User Authentication and Authorization

1. Protect routes that require authentication by implementing middleware that checks for a valid session cookie.
2. Create middleware functions to validate the session cookie and ensure user authentication.
3. Apply the middleware to the appropriate routes.
4. Test the authentication and authorization flow using Postman, ensuring only authenticated users can access protected routes.

### Task 4: CRUD Operations for Posts

1. Implement CRUD operations for the Posts resource.
2. Create API endpoints to handle the following operations:
   - Create a new Post.
   - Retrieve all Posts.
   - Retrieve a specific Post by ID.
   - Update a Post.
   - Delete a Post.
3. Ensure that only authenticated users can perform CRUD operations on Posts.
4. Test the CRUD operations using Postman.

### Task 5: CRUD Operations for Comments

1. Implement CRUD operations for the Comments resource.
2. Create API endpoints to handle the following operations:
   - Create a new Comment.
   - Retrieve all Comments for a specific Post.
   - Retrieve a specific Comment by ID.
   - Update a Comment.
   - Delete a Comment.
3. Ensure that only authenticated users can perform CRUD operations on Comments.
4. Test the CRUD operations using Postman.

### (BONUS) Task 6: Advanced Queries and Manipulation

1. Implement advanced querying and manipulation operations for the database relationships:
   - Retrieve all Posts with their associated User and Comments.
   - Retrieve all Comments for a specific User.
   - Retrieve all Comments for a specific Post.
   - Add a Comment to a Post.
   - Remove a Comment from a Post.
2. Create API endpoints to perform the above operations.
3. Test the advanced queries and manipulation using Postman.

## Submission

Please submit the following for your project:

1. Complete Node.js application code with models, migrations, routes, and controllers. (your GitHub Repo)
2. Documentation or README file explaining the project structure, how to set up and run the application, and the functionality of each API endpoint.
3. Screenshots or Postman collections demonstrating the successful testing of all CRUD operations, database relationships, authentication, and authorization.

