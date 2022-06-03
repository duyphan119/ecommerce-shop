"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscountCategory extends Model {
    static associate(models) {
      DiscountCategory.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  DiscountCategory.init(
    {
      category_id: DataTypes.INTEGER,
      percent: DataTypes.INTEGER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "DiscountCategory",
    }
  );
  return DiscountCategory;
};
