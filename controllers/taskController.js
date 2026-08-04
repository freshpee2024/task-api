const Task = require("../models/Task");


// GET all tasks
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);

    } catch (error) {
        next(error);
    }
};


// CREATE task
const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json({
            message: "Task added successfully",
            task
        });

    } catch (error) {
        next(error);
    }
    
};


// GET one task
const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
         next(error);
    }
};


// UPDATE task
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                completed: req.body.completed
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        next(error);
    }
    
};


// DELETE task
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};