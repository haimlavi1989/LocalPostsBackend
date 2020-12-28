
# LocalPostsBackend
The backEnd part for showing local posts of people around your location.
Built using modern technologies: node.js, express, mongoDB, mongoose.
```
-RESTful API design and development with advanced features: filtering, sorting, pagination
-Complete modern authentication with JWT: user sign up, log in, password reset.
-Authorization (user roles).
-Security: best practices, encryption, sanitization, rate limiting.
-Using the MVC (Model-View-Controller) architecture.
-Express: routing, middleware, sending responses.
-Mongoose: Data models, CRUD operations, data validation, and middleware.
-Advanced Mongoose features: modeling geospatial data.
-Uploading files and image processing.
-Sending emails with Mailtrap and Sendgrid.
```

## Demo API

The API is served at **https://localpostsbackend.herokuapp.com/api/v1/posts**

## Installation and Running the App

Clone the repo, then: 

npm install
node server.js / npm run dev

The app will be served at `localhost:3000`.

## Local Setup

To setup the API locally, you will need to run MongoDB. Create a `config.env` file and populate it with the following values:
```
NODE_ENV=development
PORT=3000

DATABASE=<database>
DATABASE_PASSWOR=<database_password>
DATABASE_USER=<database_user>

JWT_SECRET=<jwt_secret>
JWT_EXPIRES_IN=<jwt_expires_in>
```

## Available Routes

#### **POST** `/api/v1/posts`
* add a new post message. Requires a valid JWT with admin or user scope. Accepts:
```
      "subject": "Losts & Founds",
      "photo": "",
      "description": "",
      "location": { "type": "Point", "coordinates": [31.5203721, 34.5931699] }
```
Returns a JWT

#### **GET** `/api/v1/posts` 
* Returns all posts in the database. 

#### **GET**  `/api/v1/posts/{id}`
* Returns a specific `post` in the database.

#### **PATCH** `/api/v1/posts` 
* Updates a posts. Requires a valid JWT with `admin` or `user` scope.

#### **DELETE** `/api/v1/posts/{id}`
* Deletes a post with a specific `id`. Requires a valid JWT with `admin` or `user` scope.


& more..
