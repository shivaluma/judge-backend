const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Discuss, { through: 'Discuss_Tag' });
  };
  return Tag;
};
