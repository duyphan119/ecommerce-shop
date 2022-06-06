"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      // define association here
      Size.hasMany(models.ProductDetail, {
        foreignKey: "size_id",
        as: "details",
      });
      Size.hasMany(models.SizeGuide, {
        foreignKey: "size_id",
        as: "guides",
      });
    }
  }
  Size.init(
    {
      value: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
