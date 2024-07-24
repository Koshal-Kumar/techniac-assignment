const AppService = require("../services/app.service");

const AppController =  {
  home: (req, res, next) => {
      res.send(AppService.home());
  }
}

module.exports = AppController;
