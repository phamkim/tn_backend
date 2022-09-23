const jwt = require("jsonwebtoken");

const make = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      process.env.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: process.env.TOKEN_TIME_LINE,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

const check = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

module.exports = {
  make: make,
  check: check,
};