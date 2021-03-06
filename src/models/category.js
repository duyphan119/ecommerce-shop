"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.belongsTo(models.GroupCategory, {
        foreignKey: "group_category_id",
        as: "group_category",
      });
      Category.hasMany(models.Product, {
        foreignKey: "category_id",
        as: "products",
      });
      Category.hasMany(models.DiscountCategory, {
        foreignKey: "category_id",
        as: "discounts",
      });
      Category.hasMany(models.SizeGuide, {
        foreignKey: "category_id",
        as: "guides",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      slug: DataTypes.STRING,
      icon: DataTypes.STRING,
      group_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
