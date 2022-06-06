"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SizeGuide extends Model {
    static associate(models) {
      SizeGuide.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      SizeGuide.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "size",
      });
    }
  }
  SizeGuide.init(
    {
      category_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      min_height: DataTypes.INTEGER,
      max_height: DataTypes.INTEGER,
      min_weight: DataTypes.INTEGER,
      max_weight: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SizeGuide",
    }
  );
  return SizeGuide;
};
