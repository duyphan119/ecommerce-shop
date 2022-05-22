"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      // Cart.belongsToMany(models.ProductDetail, {
      //   through: models.CartItem,
      //   foreignKey: "product_detail_id",
      //   as: "details",
      // });
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "items",
      });
    }
  }
  Cart.init(
    {
      count: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
