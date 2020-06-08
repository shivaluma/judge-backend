const db = require('../configs/database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
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
    console.log(user);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const payload = {
      id: user._id,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
};
