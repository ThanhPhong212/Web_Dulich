"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Infotour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Infotour.belongsTo(models.Tour, {
        foreignKey: "tourId",
      });
    }
  }
  Infotour.init(
    {
      tourId: DataTypes.INTEGER,
      motaHTML: DataTypes.TEXT("long"),
      motaMark: DataTypes.TEXT("long"),
      anhHTML: DataTypes.TEXT("long"),
      anhMark: DataTypes.TEXT("long"),
      thongtinHTML: DataTypes.TEXT("long"),
      thongtinMark: DataTypes.TEXT("long"),
      dieuleHTML: DataTypes.TEXT("long"),
      dieuleMark: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Infotour",
    }
  );
  return Infotour;
};
