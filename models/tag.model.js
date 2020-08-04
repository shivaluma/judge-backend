const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Discuss, { through: 'Discuss_Tag' });
  };
  return Tag;
};
