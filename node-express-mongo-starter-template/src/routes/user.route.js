const express = require("express");
const UserController = require("../controllers/user.controller");

const Router = express.Router();

Router.post("/user/signup",UserController.signup)
Router.post("/user/login",UserController.login)
module.exports = Router;