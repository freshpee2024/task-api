require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());

app.use("/tasks", taskRoutes);

app.use("/auth", authRoutes);

app.use(errorHandler);

const PORT = 3000;

app.get("/", (req, res) => {

    res.send("Hello Peter, this is your first backend server!");

});

app.get("/about", (req, res) => {

    res.send("This is the About Page");

});

app.get("/contact", (req, res) => {

    res.send("Contact Peter at petermensah8962@gmail.com");

});

app.get("/profile", (req, res) => {

    res.json({

        name: "Peter Mensah",

        role: "Frontend Developer",

        country: "Ghana"

    });

});

app.post("/test-task", async (req, res) => {
    try {
        const task = await Task.create({
            title: "My First MongoDB Task"
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});