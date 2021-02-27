"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "Users",
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: "UserProject",
      foreignKey: "userId",
      as: "projects",
      otherKey: "projectId",
    });
  };

  return User;
};
