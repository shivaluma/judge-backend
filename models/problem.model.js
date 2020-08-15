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
    },

    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  Problem.associate = (models) => {
    Problem.belongsTo(models.User, { foreignKey: 'authorId' });
  };

  return Problem;
};
