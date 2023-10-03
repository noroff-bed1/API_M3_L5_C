var express = require('express');
require('dotenv').config()
var router = express.Router();
var jwt = require('jsonwebtoken')
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);

router.get('/', function(req, res, next) {
  // #swagger.tags = ['Home']
  // #swagger.description = "Home page of the application"
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  // #swagger.tags = ['Auth']
  // #swagger.description = "Renders the view from where user can log in to the application"
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  // #swagger.tags = ['Auth']
  // #swagger.description = "Renders the view from where user can log in to the application"
  res.render('login');
});

// Handling post request
router.post("/login", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = "Logs the user to the application. Both email and password need to be correct. After successful login, the JWT token is returned - use it later in Authorization header to access the other endpoints"
  /* #swagger.parameters['body'] =  {
    "name": "body",
    "in": "body",
      "schema": {
        $ref: "#/definitions/User"
      }
    }
  */
  let { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userService.getOneByEmail(email);
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.Password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {email: existingUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(200).json({
    success: true,
    data: {
      email: existingUser.email,
      token: token
    },
  });
});
 
// Handling post request
router.post("/signup", async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = "Creates a new account for the user. Both email and password need to be correct. After successful login, the JWT token is returned - use it later in Authorization header to access the other endpoints"
  /* #swagger.parameters['body'] =  {
    "name": "body",
    "in": "body",
      "schema": {
        $ref: "#/definitions/User"
      }
    }
  */
  const { email, password } = req.body;
  const newUser = {
    email,
    password,
  };
  await userService.create(email, password)
  let token;
  try {
    token = jwt.sign(
      { email: newUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(201).json({
    success: true,
    data: {
      email: newUser.email,
      token: token
    },
  });
});

module.exports = router;
