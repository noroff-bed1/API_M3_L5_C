var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var db = require("../models");
var TodoService = require("../services/TodoService")
var todoService = new TodoService(db);
var jwt = require('jsonwebtoken')

const ensureAuth = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 
  if(!token)
  {
      res.status(200).json({success:false, message: "Error! Token was not provided."});
      return;
  }
  try {
    jwt.verify(token, process.env.TOKEN_SECRET );
  }
  catch(err) {
    res.status(200).json({success:false, message: err});
    return;
  }
  next();    
}

router.get('/', ensureAuth, async function(req, res, next) {
  // #swagger.tags = ['Todos']
  // #swagger.description = "Gets the list of all todos."
  var todos = await todoService.getAll()
  res.send(todos);
});

router.get('/:id', ensureAuth, async function(req, res, next) {
  // #swagger.tags = ['Todos']
  // #swagger.description = "Gets todo item of id provided in the path."
  var todos = await todoService.getOne(req.params.id)
  res.send(todos);
});

router.post('/', ensureAuth, jsonParser, async function(req, res, next) {
  // #swagger.tags = ['Todos']
  // #swagger.description = "Adds the todo based on parameters provided in the request's body"
  /* #swagger.parameters['body'] =  {
    "name": "body",
    "in": "body",
      "schema": {
        $ref: "#/definitions/Todo"
      }
    }
  */
  const {name, deadline, points} = req.body 
  await todoService.create(name, deadline, points);
  res.end();
});

router.delete('/:id', ensureAuth, jsonParser, async function(req, res, next) {
  // #swagger.tags = ['Todos']
  // #swagger.description = "Deletes a todo of ID provided in the path."
  await todoService.delete(req.params.id);
  res.end();
});

module.exports = router;
