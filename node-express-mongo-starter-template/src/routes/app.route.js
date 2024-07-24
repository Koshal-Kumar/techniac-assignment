const express = require("express");
const AppController = require("../controllers/app.controller");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes
Router.use("/", AppController.home)

module.exports = Router;