import User from '../models/User.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}
//  Route for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        
        if (!user) {
            return res.json({success:false, message: "User does not exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true, token})
        }
        else {
            res.json({success:false, message: "Invalid password"});
        }
    }
    catch (error) {
        console.error("Error in loginUser", error);
        res.json({succes:false, message:error.message});
    }
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
            password:hashedPassword
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
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        }
        else {
            res.json({success:false, message:"Invalid email or password"})
        }
    } catch (error) {
        console.error("Error in adminLogin", error);
        res.json({succes:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}