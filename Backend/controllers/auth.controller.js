const db = require('../configs/database');
const bcrypt = require('bcrypt');
const validator = require('validator');
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

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Please input all fields.' });
  db.getDb()
    .db()
    .collection('users')
    .findOne({ username })
    .then((userDoc) => bcrypt.compare(password, userDoc.password))
    .then(() =>
      res
        .status(200)
        .json({ message: 'Login successfully.', token: 'Not implemented' })
    )
    .catch((err) =>
      res.status(401).json({ message: 'Invalid username or password.' })
    );
};
