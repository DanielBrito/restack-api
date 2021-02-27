const db = require("../models/index");

const UserProject = db.UserProject;
const User = db.User;
const Project = db.Project;

const add = async (name, email, password) => {
  try {
    const newUser = User.build({ name, email, password });

    await newUser.save();

    console.log("User saved");

    const userData = {
      id: newUser.dataValues.id,
      name: newUser.dataValues.name,
      email: newUser.dataValues.email,
    };

    return userData;
  } catch (err) {
    console.log(err.message);
    return err.parent.detail;
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
      },
      include: [
        {
          model: Project,
          as: "projects",
          through: { attributes: [] },
          attributes: ["id", "name", "stack"],
          all: true,
        },
      ],
    });

    if (user === null) {
      console.log("User not found");
    } else {
      console.log("User found");
    }

    return user;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
      },
      include: [
        {
          model: Project,
          as: "projects",
          through: { attributes: [] },
          attributes: ["id", "name", "stack"],
          all: true,
        },
      ],
    });

    console.log("Retrieving found users");

    return users;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const update = async (id, name, email, password) => {
  try {
    const updatedUser = await User.update(
      {
        name: name,
        email: email,
        password: password,
      },
      { where: { id: id } }
    );

    if (updatedUser[0] === 0) {
      console.log("User not found");
    } else {
      console.log("User updated");
    }

    return updatedUser;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const remove = async (id) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: id,
      },
    });

    if (deletedUser === 0) {
      console.log("User not found");
    } else {
      console.log("User removed");
    }

    return deletedUser;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

const addProject = async (id, project) => {
  const user = await User.findByPk(id);

  if (user === null) {
    console.log("User not found");
    return null;
  } else {
    console.log("User found");
  }

  const projectResult = await Project.findByPk(project.id);

  if (projectResult === null) {
    console.log("Project not found");
    return null;
  } else {
    console.log("Project found");
  }

  const userProject = { userId: id, projectId: project.id };

  const newUserProject = await UserProject.build(userProject);

  newUserProject.save();

  console.log("Project added to user");

  return newUserProject;
};

module.exports = { add, getById, getAll, update, remove, addProject };
