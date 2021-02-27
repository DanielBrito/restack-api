const bcrypt = require("bcrypt");

const userService = require("../services/UserService");

const add = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await userService.add(name, email, hashedPassword);

  if (result.hasOwnProperty("id")) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json({ message: result });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await userService.getById(id);

  if (result !== null) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: `User ${id} not found` });
  }
};

const getAll = async (req, res) => {
  const result = await userService.getAll();
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await userService.update(id, name, email, hashedPassword);

  if (result[0] === 0) {
    return res.status(404).json({ message: `User ${id} not found` });
  } else {
    return res.status(200).json({ message: `User ${id} updated` });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const loggedUser = req.cookies.user;

  const user = await userService.getById(id);
  const result = await userService.remove(id);

  if (result === 0) {
    return res.status(404).json({ message: `User ${id} not found` });
  } else {
    // Removing user credentials after self-deletion:
    if (loggedUser === user.email) {
      res.cookie("jwt", "", { maxAge: 1 });
      res.cookie("user", "", { maxAge: 1 });

      return res
        .status(200)
        .json({ message: `User ${loggedUser} self-removed` });
    }

    return res.status(200).json({ message: `User ${user.email} removed` });
  }
};

const addProject = async (req, res) => {
  const { id } = req.params;
  const { project } = req.body;

  const result = await userService.addProject(id, project);

  if (result === null) {
    return res
      .status(400)
      .json({ message: `Failed to add project ${project.id} to user ${id}` });
  } else {
    return res.status(200).json({ message: result });
  }
};

module.exports = { add, getById, getAll, update, remove, addProject };
