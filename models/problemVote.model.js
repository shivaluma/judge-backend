module.exports = (sequelize, DataTypes) => {
  const ProblemVote = sequelize.define(
    'ProblemVote',
    {
      typeVote: {
        type: DataTypes.ENUM('up', 'down'),
        allowNull: false,
        field: 'type_vote',
      },
    },
    {
      timestamps: false,
    }
  );

  ProblemVote.associate = (models) => {
    ProblemVote.belongsTo(models.User, { foreignKey: 'userId' });
    ProblemVote.belongsTo(models.Problem, {
      onDelete: 'cascade',
      foreignKey: { name: 'problemId', allowNull: false },
    });
  };

  return ProblemVote;
};
