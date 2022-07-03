"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booktour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booktour.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusData",
      });
      Booktour.belongsTo(models.Allcode, {
        foreignKey: "pay",
        targetKey: "keyMap",
        as: "payData",
      });
      Booktour.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerData",
      });
      Booktour.belongsTo(models.Tour, {
        foreignKey: "tourId",
        targetKey: "id",
        as: "tourData",
      });
    }
  }
  Booktour.init(
    {
      tourId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      statusId: DataTypes.STRING,
      startdate: DataTypes.STRING,
      pay: DataTypes.STRING,
      price: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booktour",
    }
  );
  return Booktour;
};
