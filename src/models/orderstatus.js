"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    static associate(models) {
      // define association here
      OrderStatus.hasMany(models.Order, {
        foreignKey: "order_status_id",
        as: "orders",
      });
    }
  }
  OrderStatus.init(
    {
      status: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderStatus",
    }
  );
  return OrderStatus;
};
