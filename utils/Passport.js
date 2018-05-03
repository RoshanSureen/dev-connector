var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var controllers = require("../controllers");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      controllers.user
        .getById(jwt_payload.id, false)
        .then(user => {
          if (!user) return done(null, false);
          return done(null, user);
        })
        .catch(err => {
          console.log("passport authentication Error: " + err);
          return;
        });
    })
  );
};
