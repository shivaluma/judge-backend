const { Discuss, Tag, View, DiscussVote } = require('../models');
const { Op } = require('sequelize');

exports.postDiscuss = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  try {
    let discuss = await Discuss.create({
      userId: user.id,
      authorUsername: user.username,
      authorAvatar: user.avatar,
      title: title,
      content: content,
    });

    tags.forEach(async (tag) => {
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

    return res.status(201).json({
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
  if (!page)
    return res
      .status(400)
      .json({ message: 'Cannot get the page number, please try again.' });
  const { count, rows } = await Discuss.findAndCountAll({
    distinct: 'id',
    attributes: [
      'id',
      'title',
      'updatedAt',
      'createdAt',
      'authorUsername',
      'authorAvatar',
    ],
    include: [
      { model: Tag, attributes: ['content'] },
      { model: View, attributes: ['view'] },
    ],
    offset: 10 * (page - 1),
    limit: 10,
  });
  res.status(200).json({ posts: rows, count: count });
};

exports.getDiscuss = async (req, res) => {
  const { discussId } = req.params;
  const discuss = await Discuss.findByPk(discussId, {
    include: [
      { model: Tag, attributes: ['content'] },
      { model: View, attributes: ['view'] },
    ],
  });

  return res.status(200).json({ discuss: discuss });
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
  const { discussId, voteType } = req.body;

  try {
    DiscussVote.create({
      discussId: discussId,
      userId: user.id,
      typeVote: voteType,
    });
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
