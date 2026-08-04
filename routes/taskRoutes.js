const express = require("express");
const validateTask = require("../middleware/validateTask");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");


// Routes

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.get("/:id", protect, getTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;