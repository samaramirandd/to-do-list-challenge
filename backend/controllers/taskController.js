const Task = require("../models/Task");

// GET /tasks
exports.getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    try{
        const task = await Task.create({
            title: req.body.title
        });
        res.status(201).json(task);
    } catch(error) {
        res.status(400).json({ message: "Invalid task data" });
    }
};

// PATCH /tasks/:id
exports.toggleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(404).json({ message: "Task not found" });
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });  
    } catch (error) {
        res.status(404).json({ message: "Task not found" });
    }
};