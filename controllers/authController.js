const User = require("../models/temp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
const registerUser = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {

        next(error);

    }

};



// Login User
const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            message: "Login successful",
            token
        });


    } catch (error) {

        next(error);

    }

};


module.exports = {
    registerUser,
    loginUser
};