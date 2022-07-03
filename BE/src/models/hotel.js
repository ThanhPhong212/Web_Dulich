"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hotel.hasMany(models.Bookhotel, {
        foreignKey: "hotelId",
        as: "hotelData",
      });
    }
  }
  Hotel.init(
    {
      imgHTML: DataTypes.TEXT("long"),
      imgMark: DataTypes.TEXT("long"),
      imghtlHTML: DataTypes.TEXT("long"),
      imghtlMark: DataTypes.TEXT("long"),
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      convenientHTML: DataTypes.TEXT("long"),
      convenientMark: DataTypes.TEXT("long"),
      roomHTML: DataTypes.TEXT("long"),
      roomMark: DataTypes.TEXT("long"),
      overviewHTML: DataTypes.TEXT("long"),
      overviewMark: DataTypes.TEXT("long"),
      phoneNumber: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
