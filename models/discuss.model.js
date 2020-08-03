module.exports = (sequelize, DataTypes) => {
  const Discuss = sequelize.define("Discuss", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "author_id",
      reference: {
        model: "User",
        key: "id",
      },
    },
    authorUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "author_username",
    },
    authorAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "author_avatar",
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "view_count",
    },
    upVote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "up_vote",
    },
    downVote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "down_vote",
    },
  });
  Discuss.associate = (models) => {
    Discuss.belongsTo(models.User, { foreignKey: "authorId" });
  };
  Discuss.associate = (models) => {
    Discuss.belongsToMany(models.Tag, { through: "Discuss_Tag" });
  };
  return Discuss;
};
