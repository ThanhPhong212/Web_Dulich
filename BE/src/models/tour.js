"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour.belongsTo(models.Place, {
        foreignKey: "placeId",
        targetKey: "id",
        as: "placeData",
      });
      Tour.belongsTo(models.Allcode, {
        foreignKey: "domainId",
        targetKey: "keyMap",
        as: "domainM",
      });
      Tour.belongsTo(models.Allcode, {
        foreignKey: "addressId",
        targetKey: "keyMap",
        as: "addressData",
      });
      Tour.belongsTo(models.Allcode, {
        foreignKey: "timeId",
        targetKey: "keyMap",
        as: "timeData",
      });
      Tour.hasOne(models.Infotour, {
        foreignKey: "tourId",
      });
      Tour.hasMany(models.Booktour, {
        foreignKey: "tourId",
        as: "tourData",
      });
    }
  }
  Tour.init(
    {
      imgTourHTML: DataTypes.TEXT("long"),
      imgTourMark: DataTypes.TEXT("long"),
      name: DataTypes.STRING,
      startAddress: DataTypes.STRING,
      startDate: DataTypes.STRING,
      price: DataTypes.STRING,
      timeId: DataTypes.STRING,
      addressId: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      domainId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
