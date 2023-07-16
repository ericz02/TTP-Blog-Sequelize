const express = require('express');
const app = express();
const port = 4000;
const session = require('express-session');
const bcrypt = require('bcryptjs');
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

// login a user
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }
    
    // if user exists, compare the password
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        req.session.userId = user.id;

        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred during the login process" });
  }
});

// destory session and logout user
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

// get all post
app.get("/posts", async (req, res) => {
  try {
    const allPost = await Post.findAll();
    res.status(200).json(allPost);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})

// get a specific post by id
app.get("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [Comment],
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});