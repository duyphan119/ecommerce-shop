"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      // define association here
      Discount.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Discount.init(
    {
      finish: DataTypes.DATE,
      product_id: DataTypes.INTEGER,
      new_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
