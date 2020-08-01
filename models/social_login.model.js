module.exports = (sequelize, DataTypes) => {
  const SocialLogin = sequelize.define('SocialLogin', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
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
  });
  return SocialLogin;
};
