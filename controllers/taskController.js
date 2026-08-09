const Task = require("../models/Task");


// GET all tasks
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        });
        res.json(tasks);

    } catch (error) {
        next(error);
    }
};


// CREATE task
const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            user: req.user.id
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
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

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
const updates = {};

if (req.body.title !== undefined) {
    updates.title = req.body.title;
}

if (req.body.completed !== undefined) {
    updates.completed = req.body.completed;
}

const task = await Task.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.user.id
    },
    updates,
    {
        new: true
    }
);


// DELETE task
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

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