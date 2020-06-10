const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./database');
const keys = require('./keys');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      db.getDb()
        .db()
        .collection('users')
        .findOne(
          { _id: db.ObjectId(jwt_payload.id) },
          { projection: { password: 0 } }
        )
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

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '796130238984-t9jd9p7s9178cngceio9ctipia1rumfm.apps.googleusercontent.com',
        clientSecret: 'c8YgpR3qv_Mxfwdf8EeUG2EX',
        callbackURL: '/api/auth/google/callback',
      },
      function (accessToken, refreshToken, profile, done) {
        db.getDb()
          .db()
          .collection('users')
          .findOne(
            { $or: [{ googleId: profile.id }, { email: profile._json.email }] },
            { projection: { password: 0 } }
          )
          .then((user) => {
            if (user && user.googleId !== profile.id) {
              return done(null, false, {
                message:
                  'There is an account with this email address, please login to the account and bind to this google account.',
              });
            }
            if (user) {
              return done(null, user);
            }
            console.log('create user');
            const temp = {
              username: 'test',
            };
            return done(null, temp);
          });
      }
    )
  );
};
