const sequelize = require('sequelize');
const { UUID } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    discussId: {
      primaryKey: true,
      type: DataTypes.UUID,
      reference: {
        model: 'Discuss',
        key: 'id',
      },
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });

  View.associate = (models) => {
    View.belongsTo(models.Discuss, { foreignKey: 'view_discuss' });
  };

  return View;
};
