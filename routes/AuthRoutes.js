const { Router } = require("express");

const userController = require("../controllers/UserController");
const loginController = require("../controllers/LoginController");
const projectController = require("../controllers/ProjectController");

const { requireAuth } = require("../middlewares/AuthMiddleware");

const router = Router();

// Session:
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);

// User:
router.post("/signup", userController.add);
router.get("/user/:id", userController.getById);
router.get("/user", userController.getAll);
router.put("/user/:id", requireAuth, userController.update);
router.delete("/user/:id", requireAuth, userController.remove);

// Project:
router.post("/project", requireAuth, projectController.add);
router.get("/project", projectController.getAll);
router.get("/project/:id", projectController.getById);
router.put("/project/:id", requireAuth, projectController.update);
router.delete("/project/:id", requireAuth, projectController.remove);

// Association:
router.post("/project/:id/add_user", requireAuth, projectController.addUser);
router.post("/user/:id/add_project", requireAuth, userController.addProject);

module.exports = router;
