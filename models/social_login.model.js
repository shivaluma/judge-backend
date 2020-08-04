const { User } = require('../models');

module.exports = (sequelize, DataTypes) => {
  const SocialLogin = sequelize.define('SocialLogin', {
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id',
      references: {
        model: 'Users', // 'persons' refers to table name
        key: 'id', // 'id' refers to column name in persons table
      },
    },
    providerKey: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'provider_key',
    },
    providerType: {
      type: DataTypes.ENUM('google', 'facebook', 'github'),
      allowNull: false,
    },
    verifyToken: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  SocialLogin.associate = (models) => {
    SocialLogin.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return SocialLogin;
};
