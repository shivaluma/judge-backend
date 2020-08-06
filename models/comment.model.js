module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    authorUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      field: 'author_username',
    },
    authorAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'author_avatar',
    },

    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Discuss, { foreignKey: 'discussId' });
    Comment.hasMany(models.Comment, { foreignKey: 'parentId' });
    Comment.belongsTo(models.Comment, { foreignKey: 'parentId' });
  };

  return Comment;
};
