import createError from "http-errors";
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import logger from "morgan";
import historyApiFallback from "connect-history-api-fallback";
import webpack from "webpack";
import expressStaticGzip from "express-static-gzip";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import "dotenv/config";
require("../utils/Passport")(passport);

import config from "../webpack.config.js";
import index from "../routes/index";
import user from "../routes/user";
import profile from "../routes/profile";
import api from "../routes/api";

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(
  process.env.DB_URL,
  (err, res) => {
    if (err) {
      console.log("DB CONNECTION FAILED: " + err);
    } else {
      console.log("DB CONNECTION SUCCESSFULL");
    }
  }
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

if (!isProd) {
  const compiler = webpack(config);
  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  );
  const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);

  console.log("Middleware enabled");
  app.use(express.static(path.join(__dirname, '../dist')));
} else {
  app.use(
    expressStaticGzip(path.join(__dirname, "../dist"), {
      enableBrotli: true
    })
  );
}

app.use("/", index);
app.use("/user", user);
app.use("/profile", profile);
app.use("/api", api);

if (isProd) {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () =>
  console.log(
    `Enviroment variebale is ${process.env.NODE_ENV} && Server running on port ${port}`
  )
);