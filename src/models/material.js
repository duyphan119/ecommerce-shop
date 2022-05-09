"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      // define association here
    }
  }
  Material.init(
    {
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Material",
    }
  );
  return Material;
};
