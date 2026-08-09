const validateTask = (req, res, next) => {
    // Only validate title if it was sent
    if ("title" in req.body) {
        if (!req.body.title || req.body.title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }
    }

    next();
};

module.exports = validateTask;