"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });
      CartItem.belongsTo(models.ProductDetail, {
        foreignKey: "product_detail_id",
        as: "detail",
      });
    }
  }
  CartItem.init(
    {
      product_detail_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
