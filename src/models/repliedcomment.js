"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RepliedComment extends Model {
    static associate(models) {
      RepliedComment.belongsTo(models.Comment, {
        foreignKey: "comment_id",
        as: "comment",
      });
      RepliedComment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  RepliedComment.init(
    {
      comment_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RepliedComment",
    }
  );
  return RepliedComment;
};
