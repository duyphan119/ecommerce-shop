"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Comment.belongsTo(models.Product, {
        foreignKey: "Product_id",
        as: "product",
      });
      Comment.hasMany(models.RepliedComment, {
        foreignKey: "comment_id",
        as: "replied_comments",
      });
    }
  }
  Comment.init(
    {
      rate: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
