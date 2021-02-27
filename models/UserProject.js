"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define(
    "UserProject",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "UserProject",
    }
  );

  return UserProject;
};
