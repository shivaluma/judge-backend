const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.ENUM('AC', 'WA', 'RE', 'TLE'),
      allowNull: false,
    },

    runtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.ENUM('cpp', 'c'),
      allowNull: false,
    },
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, { foreignKey: 'userId' });
    Submission.belongsTo(models.Problem, { foreignKey: 'problemId' });
  };

  return Submission;
};
