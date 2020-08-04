module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_banned',
    },
    role: {
      type: DataTypes.ENUM(
        'super_admin',
        'judge_admin',
        'forum_admin',
        'user',
        'premium_user'
      ),
      defaultValue: 'user',
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: 'date_of_birth',
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.SocialLogin, { foreignKey: 'userId' });
    User.hasMany(models.Discuss, { foreignKey: 'userId' });
    User.hasMany(models.DiscussVote, { foreignKey: 'userId' });
  };

  return User;
};
