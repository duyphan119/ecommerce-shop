"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupCategory extends Model {
    static associate(models) {
      // define association here
      GroupCategory.hasMany(models.Category, {
        foreignKey: "group_category_id",
        as: "categories",
      });
      GroupCategory.belongsTo(models.Gender, {
        foreignKey: "gender_id",
        as: "gender",
      });
    }
  }
  GroupCategory.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      gender_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GroupCategory",
    }
  );
  return GroupCategory;
};
