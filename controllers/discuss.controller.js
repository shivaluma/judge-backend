const {
  Discuss,
  Tag,
  View,
  DiscussVote,
  Comment,
  sequelize,
} = require('../models');
const { Op, literal, QueryTypes } = require('sequelize');
const logger = require('../configs/logger').logger;

exports.getDiscusses = async (req, res) => {
  const { page, search, orderBy } = req.query;
  let orderType = 'DESC';
  let orderColumn = 'createdAt';
  switch (orderBy) {
    case 'newest_to_oldest':
      orderType = 'DESC';
      break;
    case 'oldest_to_newest':
      orderType = 'ASC';
      break;
    case 'most_vote':
      orderColumn = literal('allVote');
      break;
    case 'recent_activity':
      orderColumn = literal('activity');
      break;
  }
  if (!page)
    return res
      .status(400)
      .json({ message: 'Cannot get the page number, please try again.' });
  const { count, rows } = await Discuss.findAndCountAll({
    distinct: true,
    subQuery: false,
    attributes: [
      'id',
      'title',
      'updatedAt',
      'createdAt',
      'authorUsername',
      'authorAvatar',
      [
        literal(
          `COUNT (DISTINCT (CASE WHEN DiscussVotes.type_vote = 'up' THEN 1 END))`
        ),
        'upVote',
      ],
      [
        literal(
          `COUNT (DISTINCT (CASE WHEN DiscussVotes.type_vote = 'down' THEN 1 END))`
        ),
        'downVote',
      ],
      [
        literal(
          `COUNT (DISTINCT(CASE WHEN DiscussVotes.type_vote = 'down' OR DiscussVotes.type_vote = 'up' THEN 1 END))`
        ),
        'allVote',
      ],
      [
        literal(
          `(SELECT MAX(updatedAt) FROM Comments WHERE discussId = Discuss.id)`
        ),
        'activity',
      ],
    ],
    where: {
      title: {
        [Op.like]: '%' + search + '%',
      },
    },
    order: [[orderColumn, orderType]],
    include: [
      { model: View, attributes: ['view'] },
      {
        model: DiscussVote,
        attributes: [],
      },
      {
        model: Tag,
        where: {
          content: ['java', 'oop', 'cdf', 'vsdv', 'faw'],
        },
        attributes: ['content'],
      },
    ],
    group: ['Discuss.id'],
    having: [{}, literal(`count(\`Tags->Discuss_Tag\`.\`TagId\`) >= 5`)],
    offset: 10 * (page - 1),
    limit: 10,
  });
  logger.debug(rows, count);
  return res.status(200).json({ posts: rows, count: count.length });
};

exports.getDiscuss = async (req, res) => {
  const { discussId } = req.params;
  const discuss = await Discuss.findByPk(discussId, {
    attributes: [
      'title',
      'content',
      'createdAt',
      'updatedAt',
      'authorAvatar',
      'authorUsername',
      [
        literal(`COUNT(CASE WHEN DiscussVotes.type_vote = 'up' THEN 1 END)`),
        'upVote',
      ],
      [
        literal(`COUNT(CASE WHEN DiscussVotes.type_vote = 'down' THEN 1 END)`),
        'downVote',
      ],
    ],
    include: [
      {
        model: Tag,
        attributes: ['content'],
      },
      { model: View, attributes: ['view'] },
      { model: DiscussVote, attributes: [] },
    ],
    group: ['Discuss.id', 'Tags.id', 'View.id'],
  });

  return res.status(200).json({ discuss: discuss });
};

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
      const [newTag] = await Tag.findCreateFind({
        where: { content: tag },
        defaults: { content: tag },
      });
      await discuss.addTag(newTag);
    });

    await View.findCreateFind({
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

exports.updateDiscuss = async (req, res) => {
  const { title, content, tags, previousTags } = req.body;
  const user = req.user;
  const { discussId } = req.params;
  const discuss = await Discuss.findByPk(discussId, {
    where: {
      userId: user.id,
    },
  });

  if (discuss) {
    discuss.title = title;
    discuss.content = content;

    previousTags
      .filter((val) => !tags.includes(val))
      .forEach(async (tag) => {
        const toRemove = await Tag.findOne({
          where: { content: tag },
        });
        await discuss.removeTag(toRemove);
      });

    tags.forEach(async (tag) => {
      const [newTag] = await Tag.findCreateFind({
        where: { content: tag },
        defaults: { content: tag },
      });
      await discuss.addTag(newTag);
    });
    await discuss.save();
    return res.status(200).end();
  } else {
    return res.status(404).json({ message: 'Cannot find disucss!' });
  }
};

exports.deleteDiscuss = async (req, res) => {
  const { discussId } = req.params;
  const user = req.user;

  const discuss = await Discuss.findByPk(discussId, {
    where: {
      userId: user.id,
    },
  });

  if (discuss) {
    await discuss.destroy();
    return res.status(200).end();
  } else {
    return res.status(404).json({ message: 'Cannot find disucss!' });
  }
};

exports.putDiscussView = async (req, res) => {
  const { discussId } = req.params;

  const view = await View.findOne({
    where: { discussId: discussId },
  });
  view.view += 1;
  view.save();
  res.status(200).end();
};

exports.postVote = async (req, res) => {
  const user = req.user;
  const { typeVote } = req.body;
  const { discussId } = req.params;

  try {
    const [vote, isNew] = await DiscussVote.findCreateFind({
      where: {
        discussId: discussId,
        userId: user.id,
      },
      defaults: {
        discussId: discussId,
        userId: user.id,
        typeVote: typeVote,
      },
    });

    if (!isNew) {
      vote.typeVote = typeVote;
      await vote.save();
    }

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

exports.getVote = async (req, res) => {
  const user = req.user;
  const { discussId } = req.params;
  if (!discussId)
    return res
      .status(400)
      .json({ message: 'Cannot get the discussId, please try again.' });

  const vote = await DiscussVote.findOne({
    where: {
      discussId: discussId,
      userId: user.id,
    },
  });
  return res.status(200).json({ vote: vote });
};

exports.postComment = async (req, res) => {
  const user = req.user;
  const { discussId } = req.params;
  const { content, parentId } = req.body;
  if (!discussId)
    return res
      .status(400)
      .json({ message: 'Cannot get the discussId, please try again.' });

  if (!content) {
    return res.status(400).json({ message: 'Content cannot be empty.' });
  }

  try {
    const comment = await Comment.create({
      discussId,
      content,
      authorAvatar: user.avatar,
      authorUsername: user.username,
      parentId,
    });
    return res.status(201).json({ data: comment });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There is an error on the server. Please try again.' });
  }
};

exports.getComment = async (req, res) => {
  const { discussId } = req.params;
  const { page, parentId, sort } = req.query;

  if (!discussId)
    return res
      .status(400)
      .json({ message: 'Cannot get the discussId, please try again.' });

  if (!page) {
    return res.status(400).json({ message: 'No page chosen.' });
  }

  try {
    const commentPerPage = parentId !== 'null' ? 3 : 10;

    const { count, rows } = await Comment.findAndCountAll({
      subQuery: false,

      attributes: {
        include: [[literal(`COUNT(childs.id)`), 'subComment']],
      },
      where: {
        discussId,
        parentId: parentId === 'null' ? null : parentId,
      },
      include: [{ model: Comment, as: 'childs', attributes: [] }],
      group: ['Comment.id'],
      offset: commentPerPage * (page - 1),
      limit: commentPerPage,
      order: [
        ['createdAt', sort], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ],
    });
    return res.status(201).json({
      data: {
        count: count.length,
        comments: rows,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There is an error on the server. Please try again.' });
  }
};

exports.updateComment = async (req, res) => {
  const { discussId, commentId } = req.params;
  const user = req.user;
  const { content } = req.body;

  const comment = await Comment.findByPk(commentId, {
    where: {
      userId: user.id,
      discussId: discussId,
    },
  });
  if (comment) {
    comment.content = content;
    await comment.save();
    return res.status(200).end();
  } else {
    return res.status(404).json({ message: 'Cannot find comment!' });
  }
};

exports.deleteComment = async (req, res) => {
  const { discussId, commentId } = req.params;
  const user = req.user;

  const comment = await Comment.findByPk(commentId, {
    where: {
      userId: user.id,
      discussId: discussId,
    },
  });

  if (comment) {
    await comment.destroy();
    return res.status(200).end();
  } else {
    return res.status(404).json({ message: 'Cannot find comment!' });
  }
};

exports.getTags = async (req, res) => {
  const { tag } = req.query;
  const tagQuery = tag || '';
  try {
    const t = await sequelize.transaction();
    const records = await sequelize.query(
      `select SQL_CALC_FOUND_ROWS t.*, count(dt.discussId) as count
from Tags t
left outer join Discuss_Tag dt
on t.id = dt.TagId
where t.content like '%${tagQuery}%'
group by t.id
order by count(dt.discussId) DESC
limit 10;

`,
      {
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );

    const [count] = await sequelize.query(`SELECT FOUND_ROWS() as total;`, {
      type: QueryTypes.SELECT,
      transaction: t,
    });

    t.commit();
    return res.status(200).json({ tags: records, total: count.total });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ message: err });
  }
};
