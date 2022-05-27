"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Banner.init(
    {
      page: DataTypes.STRING,
      url: DataTypes.STRING,
      href: DataTypes.STRING,
      isShow: DataTypes.BOOLEAN,
      position: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Banner",
    }
  );
  return Banner;
};
