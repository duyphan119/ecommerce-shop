"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SizeGuides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      size_id: {
        type: Sequelize.INTEGER,
      },
      min_height: {
        type: Sequelize.INTEGER,
      },
      max_height: {
        type: Sequelize.INTEGER,
      },
      min_weight: {
        type: Sequelize.INTEGER,
      },
      max_weight: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SizeGuides");
  },
};
