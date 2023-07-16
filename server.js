const express = require('express');
const app = express();
const port = 4000;
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { User } = require('./models');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.originalUrl}`)
  res.on("finish", () => {
    console.log(`Response status: ${res.statusCode}`)
  })
  next();
})

// built-in middleware provided by Express
app.use(express.json());

// session middleware provided by express-session package
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
)

const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Welcome to the best blog you have ever seen without a doubt!")
})

// create a new user
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.userId = user.id;
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
    
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.amp((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: error,
    });
  }
})

// get all post

// get specific post