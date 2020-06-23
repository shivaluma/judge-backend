const db = require('../configs/database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const got = require('got');

exports.postSignUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword)
    return res.status(400).json({ message: 'Please input all fields.' });

  if (!validator.isEmail(email))
    return res.status(400).json({ message: 'Not a valid email.' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Password do not match.' });
  const hashedPassword = await bcrypt.hash(password, 12);
  db.getDb()
    .db()
    .collection('users')
    .insertOne({
      username,
      email,
      password: hashedPassword,
    })
    .then((_) =>
      res.status(201).json({ message: 'Create account successfully' })
    )
    .catch((err) =>
      res.status(400).json({
        message: 'Cannot create account',
        duplicate: err.keyValue,
      })
    );
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Please input all fields.' });
  try {
    const user = await db
      .getDb()
      .db()
      .collection('users')
      .findOne({ username });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const payload = {
      id: user._id,
      username: user.username,
      avatar: user.avatar,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
};

exports.postGoogle = async (req, res) => {
  const { ggAccessToken } = req.body;
  try {
    const query = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${ggAccessToken}`;
    const response = await got(`${query}`).json();
    console.log(response);
    const user = await db
      .getDb()
      .db()
      .collection('users')
      .findOne({
        $or: [{ googleId: response.sub }, { email: response.email }],
      });

    if (!user) {
      const user = db.getDb().db().collection('users').insertOne({
        username: null,
        email: response.email,
        password: 'nopassword',
        googleId: response.sub,
      });
      const payload = {
        id: user._id,
        username: user.username,
      };
      const accessToken = jwt.sign(payload, keys.secretOrKey);
      return res
        .status(200)
        .json({ message: 'Login successfully.', accessToken, user: payload });
    }

    if (user.googleId !== response.sub)
      return res.status(409).json({
        message:
          'There is an account with this email address, please login then bind to this google account.',
      });

    const payload = {
      id: user._id,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.postFacebook = async (req, res) => {
  const { id, fbAccessToken } = req.body;
  try {
    const query = `https://graph.facebook.com/${id}?fields=birthday,email,picture&access_token=${fbAccessToken}`;
    const response = await got(`${query}`).json();
    console.log(response);
    const user = await db
      .getDb()
      .db()
      .collection('users')
      .findOne({
        $or: [{ facebookId: response.id }, { email: response.email }],
      });

    if (!user) {
      db.getDb()
        .db()
        .collection('users')
        .insertOne({
          username: null,
          email: response.email,
          password: 'nopassword',
          facebookId: response.id,
        })
        .then((user) => {
          const payload = {
            id: user._id,
            username: user.username,
          };
          const accessToken = jwt.sign(payload, keys.secretOrKey);
          return res
            .status(200)
            .json({
              message: 'Login successfully.',
              accessToken,
              user: payload,
            });
        })
        .catch((err) =>
          res.status(400).json({
            message:
              'Cannot create account through login facebook, please try again',
          })
        );
    }

    if (user.facebookId !== response.id)
      return res.status(409).json({
        message:
          'There is an account with this email address, please login then bind to this facebook account.',
      });

    const payload = {
      id: user._id,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
