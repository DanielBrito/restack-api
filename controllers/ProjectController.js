const projectService = require("../services/ProjectService");

const add = async (req, res) => {
  const { name, stack } = req.body;

  const result = await projectService.add({ name, stack });

  if (result) {
    return res.status(201).json(result);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await projectService.getById(id);

  if (result !== null) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: `Project ${id} not found` });
  }
};

const getAll = async (req, res) => {
  const result = await projectService.getAll();
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, stack } = req.body;

  const result = await projectService.update(id, name, stack);

  if (result === null) {
    return res.status(404).json({ message: `Project ${id} not found` });
  } else {
    return res.status(200).json({ message: `Project ${id} updated` });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const result = await projectService.remove(id);

  if (result === 0) {
    return res.status(404).json({ message: `Project ${id} not found` });
  } else {
    return res.status(200).json({ message: `Project ${id} removed` });
  }
};

const addUser = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  const result = await projectService.addUser(id, user);

  if (result === null) {
    return res
      .status(400)
      .json({ message: `Failed to add user ${user.id} to project ${id}` });
  } else {
    return res.status(200).json({ message: result });
  }
};

module.exports = { add, getById, getAll, update, remove, addUser };
