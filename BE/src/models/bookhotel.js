"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookhotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookhotel.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusHt",
      });
      Bookhotel.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerHt",
      });
      Bookhotel.belongsTo(models.Hotel, {
        foreignKey: "hotelId",
        targetKey: "id",
        as: "hotelData",
      });
    }
  }
  Bookhotel.init(
    {
      hotelId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      statusId: DataTypes.STRING,
      datestart: DataTypes.STRING,
      dateend: DataTypes.STRING,
      yeucau: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookhotel",
    }
  );
  return Bookhotel;
};
