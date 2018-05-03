var jwt = require("jsonwebtoken");
var Promise = require("bluebird");

module.exports = {
  sign: (obj, secret) => {
    return jwt.sign(obj, secret, { expiresIn: 86400 }); // returns a new token
  },
  verify: (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decode);
      });
    });
  }
};
