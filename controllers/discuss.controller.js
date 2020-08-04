const { Discuss, Tag, View, DiscussVote } = require('../models');
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
        defaults: { content: tag },
      });
      await discuss.addTag(newTag);
    });

    await View.findOrCreate({
      where: { discussId: discuss.id },
      defaults: { discussId: discuss.id },
    });

    res.status(201).json({
      message: 'Create discuss successfully',
      data: { discussId: discuss.id },
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Cannot create discuss',
    });
  }
};

exports.getAllDiscuss = async (req, res) => {
  const { page } = req.query;

  const { count, rows } = await Discuss.findAndCountAll({
    include: [Tag, View, DiscussVote],
    offset: 10 * (page - 1),
    limit: 10,
  });
  res.status(200).json({ rows: rows, count: count });
};

exports.getDiscuss = async (req, res) => {
  const discuss = await Discuss.findOne({
    where: { id: discussId },
  });
};

exports.putDiscussView = async (req, res) => {
  const { discussId } = req.body;

  const view = await View.findOne({
    where: { discussId: discussId },
  });
  view.view += 1;
  view.save();
  res.status(200).end();
};

exports.postVote = async (req, res) => {
  const user = req.user;
  const { discussId, vote } = req.body;
  console.log(discussId);
  console.log(user.id);
  try {
    const vote = DiscussVote.create({
      discussId: discussId,
      userId: user.id,
      typeVote: vote,
    });
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
