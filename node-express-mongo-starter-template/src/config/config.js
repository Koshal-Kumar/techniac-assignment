const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URL: process.env.MONGODB_URL,
};
