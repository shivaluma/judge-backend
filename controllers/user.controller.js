const { User } = require('../models');
const { Op } = require('sequelize');
exports.getMe = (req, res) => {
  return res.status(200).json(req.user);
};

exports.getUser = async (req, res) => {
  const { query } = req.query;
  const queryText = !query ? '' : query;
  const list = await User.findAll({
    attributes: ['username', 'id'],
    where: {
      username: {
        [Op.like]: queryText + '%',
      },
    },
    limit: 10,
  });

  return res.status(200).json({ list: list });
};

exports.postChangePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword | newPassword | confirmPassword)
    return res.status(400).json({ message: 'Please input all fields.' });

  try {
    const user = await User.findOne({
      where: {
        username: req.user.username,
      },
    });

    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) return res.status(401).json({ message: 'Invalid password.' });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurs, please contact the administrator for help.',
    });
  }

  if (newPassword != confirmPassword)
    return res.status(403).json({ message: 'Password do not match' });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findOne({
      where: {
        username: req.user.username,
      },
    });
    user.password = hashedPassword;

    res.status(201).json({ message: 'Change password successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurs, please contact the administrator for help.',
    });
  }
};
