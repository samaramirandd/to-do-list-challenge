const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/tasks", controller.getTasks);
router.post("/tasks", controller.createTask);
router.patch("/tasks/:id", controller.toggleTask);
router.delete("/tasks/:id", controller.deleteTask);

module.exports = router;
