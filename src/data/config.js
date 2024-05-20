require("dotenv").config();

const config = {
  general: {
    version: "1.0.0",
    prefix: "!",
    token: process.env.token,
  },
};

module.exports = config;
