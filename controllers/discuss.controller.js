const { Discuss, Tag } = require("../models");
const { Op } = require("sequelize");

exports.postDiscuss = async (req, res) => {
  const { title, content, tag } = req.body;
  const user = req.user;

  let discuss;
  try {
    discuss = await Discuss.create({
      authorId: user.id,
      authorUsername: user.username,
      authorAvatar: user.avatar,
      title: title,
      content: content,
    });
    res.status(201).json({ message: "Create discuss successfully" });
  } catch (err) {
    return res.status(400).json({
      message: "Cannot create discuss",
      duplicate: {
        [err.errors[0].path.split(".")[1]]: true,
      },
    });
  }
  for (t of tag) {
    const newtag = await Tag.create({ content: t });
    console.log(newtag);
    console.log(await discuss.addTag(t));
  }
  try {
    res.status(201).json({ message: "Create tags successfully" });
  } catch (err) {
    return res.status(400).json({
      message: "Cannot create tags",
    });
  }
};

exports.getAllDiscuss = async (req, res) => {
  const { count, rows } = await Discuss.findAndCountAll({
    offset: 1,
    limit: 2,
  });
  console.log(count);
  console.log(rows);
};
