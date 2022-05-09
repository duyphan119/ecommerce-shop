"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      // define association here
      Color.hasMany(models.ProductDetail, {
        foreignKey: "color_id",
        as: "details",
      });
    }
  }
  Color.init(
    {
      value: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Color",
    }
  );
  return Color;
};
