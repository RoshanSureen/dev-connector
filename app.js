var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var webpack = require("webpack");
var config = require("./config/webpack.dev");
require("dotenv").config();
require("./utils/Passport")(passport);

// Database connection
mongoose.connect(process.env.DB_URL, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESSFULL");
  }
});

var index = require("./routes/index");
var user = require("./routes/user");
var profile = require("./routes/profile");
var api = require("./routes/api");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var compiler = webpack(config);

// setup live reoloading middleware
var webpackDevMiddleware = require("webpack-dev-middleware")(compiler, config.devServer);
app.use(webpackDevMiddleware);

// setup hot reloading on client-side
var webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
app.use(webpackHotMiddleware);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", index);
app.use("/user", user);
app.use("/profile", profile);
app.use("/api", api);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;