const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = {
  signup: async (data) => {
    try {

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.Password, saltRounds);

      data.Password = hashedPassword;
      const newUser = new User(data);
      const response = await newUser.save();
      console.log('Response from save:', response); 
      return {
        data: response,
        success: true,
        message: "Signup Success",
        
      };
    } catch (error) {
      console.error('Error in signup:', error);
      return {
        data: null,
        success: false,
        message: "Signup Failed",
        
      };
    }
  },

  login :async (data) =>{
    try {
        const user = await User.findOne({ email: data.email });
        console.log("user,",user)
        if (!user) {
          return {
            data: null,
            success: false,
            message: "User not found"
          };
        }

        const match = await bcrypt.compare(data.Password,user.Password);
        if(!match){
            return {
                data: null,
                success: false,
                message: "password missmatch"
              };

        }
        const token = jwt.sign({ user_id : user._id, name : user.Firstname , email : user.email },"this_is_my_sectret_key")
        return{
            data : user,
            token : token,
            success:true,
            message : "login successfully"
        }

    } catch (error) {
        
    }
  }
};

module.exports = UserService;
