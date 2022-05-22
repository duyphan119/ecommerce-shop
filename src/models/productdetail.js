"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    static associate(models) {
      // define association here
      ProductDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      ProductDetail.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "color",
      });
      ProductDetail.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "size",
      });
      ProductDetail.hasMany(models.CartItem, {
        foreignKey: "product_detail_id",
        as: "items",
      });
    }
  }
  ProductDetail.init(
    {
      product_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      sku: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductDetail",
    }
  );
  return ProductDetail;
};
