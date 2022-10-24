'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        },
        onDelete: 'cascade',
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    totalLike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    content: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Now
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Now
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
