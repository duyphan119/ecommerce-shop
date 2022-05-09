"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      // define association here
      Gender.hasMany(models.GroupCategory, {
        foreignKey: "gender_id",
        as: "group_categories",
      });
    }
  }
  Gender.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gender",
    }
  );
  return Gender;
};
