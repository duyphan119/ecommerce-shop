"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      // define association here
      Coupon.hasMany(models.Order, {
        foreignKey: "coupon_id",
        as: "orders",
      });
    }
  }
  Coupon.init(
    {
      name: DataTypes.STRING,
      percent: DataTypes.FLOAT,
      start: DataTypes.DATE,
      finish: DataTypes.DATE,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
