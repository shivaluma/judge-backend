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
