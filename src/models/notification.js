"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, {
        foreignKey: "sender_id",
        as: "sender",
      });
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      notify_type: DataTypes.STRING,
      sender_id: DataTypes.INTEGER,
      href: DataTypes.STRING,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
