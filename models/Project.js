"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "Projects",
    }
  );

  Project.associate = (models) => {
    Project.belongsToMany(models.User, {
      through: "UserProject",
      foreignKey: "projectId",
      as: "users",
      otherKey: "userId",
    });
  };

  return Project;
};
