"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Cart, {
        foreignKey: "user_id",
        as: "cart",
      });
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "users",
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "comments",
      });
      User.hasMany(models.RepliedComment, {
        foreignKey: "user_id",
        as: "replied_comments",
      });
      User.hasMany(models.ProductUser, {
        foreignKey: "user_id",
        as: "product_users",
      });
      User.hasMany(models.Notification, {
        foreignKey: "sender_id",
        as: "notifications",
      });
    }
  }
  User.init(
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
