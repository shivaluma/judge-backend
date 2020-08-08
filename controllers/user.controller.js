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
