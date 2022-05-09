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
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
