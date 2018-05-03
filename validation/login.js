var Validator = require("validator");
var { isEmpty } = require("./is-empty");

module.exports = {
  validateLoginInput: data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email Field is required";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password Field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
