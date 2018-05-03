var Validator = require("validator");
var { isEmpty } = require("./is-empty");

module.exports = {
  validateRegisterInput: data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = "Name must be between 2 and 30 charecters";
    }

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name Field is required";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email Field is required";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password Field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password Field is required";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm Password Field is required";
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords do-not match";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
