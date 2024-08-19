const usersModel = require("../models/userModel");

//*POST user create Data
const userController = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        // Check if the user already exists
        const existingUser = await usersModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const userData = new usersModel(req.body);
        await userData.save();
        console.log("User saved successfully.");
        res.status(201).json({ msg: "User created data added successfully to the database" });

    } catch (error) {
        res.status(500).json({ message: error.message }); // কোডে কোনো ত্রুটি পাওয়া গেলে
    }
};
module.exports = {userController};