const db = require("../models/index");

const UserProject = db.UserProject;
const User = db.User;
const Project = db.Project;

const add = async (project) => {
  const { name, stack } = project;

  try {
    const newProject = Project.build({ name, stack });

    await newProject.save();

    console.log("Project saved");

    const createdProject = {
      id: newProject.id,
      name: newProject.name,
      stack: newProject.stack,
    };

    return createdProject;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const getById = async (id) => {
  try {
    const project = await Project.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          as: "users",
          through: { attributes: [] },
          attributes: ["id", "name", "email"],
          all: true,
        },
      ],
    });

    if (project === null) {
      console.log("Project not found");
    } else {
      console.log("Project found");
    }

    return project;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const getAll = async () => {
  try {
    const projects = await Project.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          as: "users",
          through: { attributes: [] },
          attributes: ["id", "name", "email"],
          all: true,
        },
      ],
    });

    return projects;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const update = async (id, name, stack) => {
  try {
    const updatedProject = await Project.update(
      {
        name: name,
        stack: stack,
      },
      { where: { id: id } }
    );

    if (updatedProject[0] === 0) {
      console.log("Project not found");
      return null;
    } else {
      console.log("Project updated");
    }

    return updatedProject;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const remove = async (id) => {
  try {
    const deletedProject = await Project.destroy({
      where: {
        id: id,
      },
    });

    if (deletedProject === 0) {
      console.log("Project not found");
    } else {
      console.log("Project removed");
    }

    return deletedProject;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const addUser = async (id, user) => {
  const project = await Project.findByPk(id);

  if (project === null) {
    console.log("Project not found");
    return null;
  } else {
    console.log("Project found");
  }

  const userResult = await User.findByPk(user.id);

  if (userResult === null) {
    console.log("User not found");
    return null;
  } else {
    console.log("User found");
  }

  const projectUser = { userId: user.id, projectId: id };

  const newProjectUser = await UserProject.build(projectUser);

  newProjectUser.save();

  console.log("User added to project");

  return newProjectUser;
};

module.exports = { add, getById, getAll, update, remove, addUser };
