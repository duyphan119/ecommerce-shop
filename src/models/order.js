"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
      });
      Order.belongsTo(models.OrderStatus, {
        foreignKey: "order_status_id",
        as: "status",
      });
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Order.belongsTo(models.Coupon, {
        foreignKey: "coupon_id",
        as: "coupon",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      order_status_id: DataTypes.INTEGER,
      coupon_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
