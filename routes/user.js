var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var passport = require("passport");
var controllers = require("../controllers");
var utils = require("../utils");

router.get("/test", (req, res, next) => {
  res.json({
    confirmation: "success",
    message: "user route works"
  });
});

router.post("/:action", (req, res, next) => {
  var action = req.params.action;
  var credentials = req.body;
  if (action == "register") {
    controllers.user
      .post(credentials, false)
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
      })
      .catch(err => {
        res.status(400).json({
          confirmation: "fail",
          message: err
        });
      });
    return;
  }
  if (action == "login") {
    controllers.user
      .findOne(credentials, false)
      .then(result => {
        // create a signed token
        var payload = {
          id: result.id,
          name: result.name,
          avatar: result.avatar
        };
        var token = utils.JWT.sign(payload, process.env.TOKEN_SECRET);

        res.json({
          confirmation: "success",
          result,
          token: "Bearer " + token
        });
      })
      .catch(err => {
        res.status(400).json({
          confirmation: "fail",
          message: err
        });
      });
    return;
  }
  res.status(400).json({
    confirmation: "fail",
    message: `Action ${action} is invalid`
  });
});

router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      confirmation: "success",
      user: req.user
    });
  }
);

module.exports = router;
