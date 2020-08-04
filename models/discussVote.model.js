const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const DiscussVote = sequelize.define('DiscussVote', {
    typeVote: {
      type: DataTypes.ENUM('up', 'down'),
      allowNull: false,
      field: 'type_vote',
    },
  });

  DiscussVote.associate = (models) => {
    DiscussVote.belongsTo(models.User, { foreignKey: 'userId' });
    DiscussVote.belongsTo(models.Discuss, {
      foreignKey: 'discussId',
    });
  };

  return DiscussVote;
};
