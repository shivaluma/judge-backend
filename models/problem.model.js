const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },

    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
    },

    hasSolution: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'has_solution',
    },

    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_premium',
    },
  });

  Problem.associate = (models) => {
    Problem.belongsTo(models.User, { foreignKey: 'authorId' });
    Problem.hasMany(models.Discuss, { foreignKey: 'problemId' });
    Problem.hasMany(models.Testcase, { foreignKey: 'problemId' });
  };

  return Problem;
};
