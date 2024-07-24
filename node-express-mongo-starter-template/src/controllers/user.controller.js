const UserService = require("../services/user.service.js");

const UserController =  {
  signup: async(req, res, next) => {
    const data = req.body;
    // const {Firstname, Lastname,email,profilePicture,Mobile,Password}= data;
    try {
        const result = await UserService.signup(data);
        res.status(result.success ? 200 : 400).send(result);  

    } catch (error) {
      console.error('Error in UserController.signup:', error);
      res.status(500).send({
        data: null,
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  login : async(req,res,next)=>{
    const data = req.body;

    try {
        const result = await UserService.login(data);
        console.log("result",result)
        res.status(200).send(result);

    } catch (error) {
        console.log("Error while login")
        res.status(500).send({
            data: null,
            success: false,
            message: "Internal Server Error"
          });
    }
  }
}

module.exports = UserController;
