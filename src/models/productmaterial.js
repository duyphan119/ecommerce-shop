"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductMaterial extends Model {
    static associate(models) {
      ProductMaterial.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      ProductMaterial.belongsTo(models.Material, {
        foreignKey: "material_id",
        as: "material",
      });
    }
  }
  ProductMaterial.init(
    {
      product_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductMaterial",
    }
  );
  return ProductMaterial;
};
