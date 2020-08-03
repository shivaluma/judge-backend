const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const DiscussVote = sequelize.define("DiscussVote", {
    discussId: {
      primaryKey: true,
      type: DataTypes.UUID,
      field: "discuss_id",
      reference: {
        model: "Discuss",
        key: "id",
      },
    },
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      field: "user_id",
      reference: {
        model: "User",
        key: "id",
      },
    },
    typeVote: {
      type: DataTypes.ENUM("up", "down"),
      allowNull: false,
      field: "type_vote",
    },
  });

  DiscussVote.associate = (models) => {
    DiscussVote.belongsTo(models.User, { foreignKey: "userId" });
  };

  DiscussVote.associate = (models) => {
    DiscussVote.belongsTo(models.Discuss, { foreignKey: "discussId" });
  };
  return DiscussVote;
};
