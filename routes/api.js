var express = require("express");
var router = express.Router();
var passport = require("passport");
var controllers = require("../controllers");

router.get("/test", (req, res, next) => {
  res.json({
    confirmation: "success",
    message: "api route works"
  });
});

router.get("/:resource", (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.status(400).json({
      confirmation: "fail",
      message: `Resource ${resource} is invalid`
    });
    return;
  }
  controller
    .get(null)
    .then(results => {
      res.json({
        confirmation: "success",
        results
      });
    })
    .catch(err => {
      res.status(404).json({
        confirmation: "fail",
        message: err
      });
    });
});

router.get("/:resource/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller == null) {
    res.status(400).json({
      confirmation: "fail",
      message: `Resource ${resource} is invalid`
    });
    return;
  }
  controller
    .getById(id)
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
  "/:resource",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
      res.status(400).json({
        confirmation: "fail",
        message: `Resource ${resource} is invalid`
      });
      return;
    }
    var user = req.user;
    var postData = req.body;
    controller
      .post(user, postData)
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
  }
);

router.delete(
  "/:resource/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    if (controller == null) {
      res.status(400).json({
        confirmation: "fail",
        message: `Resource ${resource} is invalid`
      });
      return;
    }
    var user = req.user;
    controller
      .delete(user, id)
      .then(result => {
        res.json({
          confirmation: "success",
          result
        });
      })
      .catch(err => {
        res.status(401).json({
          confirmation: "fail",
          message: err
        });
      });
  }
);

router.post(
  "/:resource/:action/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    var resource = req.params.resource;
    var action = req.params.action;
    var id = req.params.id;
    var user = req.user;
    var controller = controllers[resource];
    if (controller == null) {
      res.status(400).json({
        confirmation: "fail",
        message: `Resource ${resource} is invalid`
      });
      return;
    }
    if (action == "like" || action == "unlike") {
      controller
        .save(user, id, action)
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
    if (action == "comment") {
      var commentData = req.body;
      controller
        .addcomment(user, id, commentData)
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
  "/:resource/comment/:id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    var resource = req.params.resource;
    var id = req.params.id;
    var commentId = req.params.comment_id;
    var controller = controllers[resource];
    if (controller == null) {
      res.status(400).json({
        confirmation: "fail",
        message: `Resource ${resource} is invalid`
      });
      return;
    }
    controller
      .deletecomment(id, commentId)
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