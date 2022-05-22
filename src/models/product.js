"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
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
      Product.hasMany(models.ProductMaterial, {
        foreignKey: "product_id",
        as: "materials",
      });
      Product.hasMany(models.Comment, {
        foreignKey: "product_id",
        as: "comments",
      });
      Product.hasMany(models.Discount, {
        foreignKey: "product_id",
        as: "discounts",
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
