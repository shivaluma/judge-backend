module.exports = (sequelize, DataTypes) => {
  const Discuss = sequelize.define('Discuss', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'author_id',
      reference: {
        model: 'User',
        key: 'id',
      },
    },
    authorUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      field: 'author_username',
    },
    authorAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'author_avatar',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  });
  Discuss.associate = (models) => {
    Discuss.belongsTo(models.User, { foreignKey: 'authorId' });
    Discuss.belongsToMany(models.Tag, { through: 'Discuss_Tag' });
    Discuss.hasOne(models.View, { foreignKey: 'discussId' });
  };

  return Discuss;
};
