const { Discuss, Tag } = require('../models');
const { Op } = require('sequelize');

exports.postDiscuss = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  try {
    let discuss = await Discuss.create({
      authorId: user.id,
      authorUsername: user.username,
      authorAvatar: user.avatar,
      title: title,
      content: content,
    });

    tags.forEach(async (tag) => {
      console.log(tag);
      const [newTag] = await Tag.findOrCreate({
        where: { content: tag },
        defaults: {
          content: tag,
        },
      });
      await discuss.addTag(newTag);
    });

    res.status(201).json({ message: 'Create discuss successfully' });
  } catch (err) {
    return res.status(400).json({
      message: 'Cannot create discuss',
    });
  }
};

exports.getAllDiscuss = async (req, res) => {
  const { page } = req.query;

  const { count, rows } = await Discuss.findAndCountAll({
    include: [Tag],
    offset: 10 * (page - 1),
    limit: 10,
  });
};
