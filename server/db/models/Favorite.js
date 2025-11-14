module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'image_url'
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'favorites',
    underscored: true
  });

  return Favorite;
};
