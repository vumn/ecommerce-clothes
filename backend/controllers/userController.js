import User from '../models/User.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}
//  Route for user login
const loginUser = async (req, res) => {

}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Checking user exists or not
        const exists = await User.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        }

        // validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, 
            email,
            hashedPassword
        })
        const user = await newUser.save();
        
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    catch (error) {
        console.error("Error in registerUser", error);
        res.json({succes:false, message:error.message})
    }
}

// Route for admin login
const adminLogin = async (req, res) => {

}

export {loginUser, registerUser, adminLogin}