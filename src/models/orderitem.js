"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      OrderItem.belongsTo(models.ProductDetail, {
        foreignKey: "product_detail_id",
        as: "detail",
      });
    }
  }
  OrderItem.init(
    {
      order_id: DataTypes.INTEGER,
      product_detail_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      product_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
