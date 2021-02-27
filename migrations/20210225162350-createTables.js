"use strict";

module.exports = {
  up: async (queryInterface, Types) => {
    await queryInterface
      .createTable("Users", {
        id: {
          primaryKey: true,
          type: Types.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        name: { type: Types.STRING, allowNull: false },
        email: { type: Types.STRING, allowNull: false, unique: true },
        password: { type: Types.STRING, allowNull: false },
        createdAt: {
          allowNull: false,
          type: Types.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Types.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Types.DATE,
        },
      })
      .then(() => {
        return queryInterface.createTable("Projects", {
          id: {
            primaryKey: true,
            type: Types.INTEGER,
            autoIncrement: true,
            allowNull: false,
          },
          name: { type: Types.STRING, allowNull: false },
          stack: { type: Types.STRING, allowNull: false },
          createdAt: {
            allowNull: false,
            type: Types.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Types.DATE,
          },
          deletedAt: {
            allowNull: true,
            type: Types.DATE,
          },
        });
      })
      // Many to Many association:
      .then(() => {
        return queryInterface.createTable("UserProject", {
          id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: Types.INTEGER,
          },
          userId: {
            type: Types.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Users",
              key: "id",
              as: "users",
            },
          },
          projectId: {
            type: Types.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Projects",
              key: "id",
              as: "projects",
            },
          },
          createdAt: {
            allowNull: false,
            type: Types.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Types.DATE,
          },
          deletedAt: {
            allowNull: true,
            type: Types.DATE,
          },
        });
      });
  },

  down: async (queryInterface) => {
    return queryInterface.dropAllTables();
  },
};
