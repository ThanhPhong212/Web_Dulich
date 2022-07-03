"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Hotels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imgHTML: {
        type: Sequelize.TEXT("long"),
      },
      imgMark: {
        type: Sequelize.TEXT("long"),
      },
      imghtlHTML: {
        type: Sequelize.TEXT("long"),
      },
      imghtlMark: {
        type: Sequelize.TEXT("long"),
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      convenientHTML: {
        type: Sequelize.TEXT("long"),
      },
      convenientMark: {
        type: Sequelize.TEXT("long"),
      },
      roomHTML: {
        type: Sequelize.TEXT("long"),
      },
      roomMark: {
        type: Sequelize.TEXT("long"),
      },
      overviewHTML: {
        type: Sequelize.TEXT("long"),
      },
      overviewMark: {
        type: Sequelize.TEXT("long"),
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Hotels");
  },
};
