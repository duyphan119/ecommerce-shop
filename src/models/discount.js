"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      // define association here
    }
  }
  Discount.init(
    {
      percent: DataTypes.FLOAT,
      finish: DataTypes.DATE,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
