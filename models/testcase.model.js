const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Testcase = sequelize.define('Testcase', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    input: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    output: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  });

  Testcase.assiociate = (models) => {
    Testcase.belongsTo(models.Problem, { foreignKey: 'problemId' });
  };

  return Testcase;
};
