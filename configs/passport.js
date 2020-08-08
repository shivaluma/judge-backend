const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
const keys = require('./keys');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findOne({
        attributes: ['id', 'username', 'avatar', 'role'],
        where: {
          id: jwt_payload.id,
        },
      })
        .then((user) => {
          if (user) {
            console.log(user);
            return done(null, user);
          }
          return done(null, false, { message: 'Invalid token' });
        })
        .catch((_) => done(null, false, { message: 'Internal Server Error' }));
    })
  );
};
