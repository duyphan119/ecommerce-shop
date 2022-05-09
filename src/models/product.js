"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductDetail, {
        foreignKey: "product_id",
        as: "details",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Product.hasMany(models.Image, {
        foreignKey: "product_id",
        as: "images",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
