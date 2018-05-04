var express = require("express");
var router = express.Router();
var passport = require("passport");
var controllers = require("../controllers");

router.get("/test", (req, res, next) => {
  res.json({
    confirmation: "success",
    message: "profile route works"
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var user = req.user;
    controllers.profile
      .findOne({ user: user.id })
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
      })
      .catch(err => {
        res.status(404).json({
          confirmation: "fail",
          message: err
        });
      });
  }
);

router.get("/all", (req, res, next) => {
  controllers.profile
    .find(null)
    .then(result => {
      res.json({
        confirmation: "success",
        result
      });
    })
    .catch(err => {
      res.status(404).json({
        confirmation: "fail",
        message: err
      });
    });
});

router.get("/handle/:handle", (req, res, next) => {
  var handle = req.params.handle;
  controllers.profile
    .findOne({ handle })
    .then(result => {
      res.json({
        confirmation: "success",
        result
      });
    })
    .catch(err => {
      res.status(404).json({
        confirmation: "fail",
        message: err
      });
    });
});

router.get("/user/:user_id", (req, res, next) => {
  var user_id = req.params.user_id;
  controllers.profile
    .findByUserId({ user: user_id })
    .then(result => {
      res.json({
        confirmation: "success",
        result
      });
    })
    .catch(err => {
      res.status(404).json({
        confirmation: "fail",
        message: err
      });
    });
});

router.post(
  "/:action",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var action = req.params.action;
    var formData = req.body;
    var user = req.user;
    if (action == "save") {
      controllers.profile
        .save(user, formData)
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
    if (action == "experience" || action == "education") {
      controllers.profile
        .add(user, formData, action)
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
    res.status(400).json({
      confirmation: "fail",
      message: `Action ${action} is invalid`
    });
  }
);

router.delete(
  "/:action/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var action = req.params.action;
    var id = req.params.id;
    var user = req.user;
    if (action == "experience" || action == "education") {
      controllers.profile
        .remove(user, id, action)
        .then(result => {
          res.json({
            confirmation: "success",
            result
          });
        })
        .catch(err => {
          res.status(404).json({
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
  }
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var user = req.user;
    controllers.profile
      .delete({ user: user.id })
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
      })
      .catch(err => {
        res.status(404).json({
          confirmation: "fail",
          message: err
        });
      });
  }
);

module.exports = router;
