var express = require("express");
var router = express.Router();

router.get("/test", (req, res, next) => {
  res.json({
    confirmation: "success",
    message: "profile route works"
  });
});

module.exports = router;
