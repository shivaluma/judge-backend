const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    tagContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Tag;
};
