const JwtStrategy = require('passport-jwt').Strategy;
const GoogleTokenStrategy = require('passport-token-google2').Strategy;
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
    new GoogleTokenStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile, accessToken);
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
