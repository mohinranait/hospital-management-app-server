const User = require("../models/UserModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../config/secretEnv");

// get all users
const getAllUsers = async (req,res) => {
    res.send('user Router')
}

const createNewUser = async (req,res) => {
    try {
        const body  = req.body;
        const {phone_number,password} = req.body;
        const soltRound = 10;

        // find existing user by Phone_number
        const existsUser = await User.findOne({phone_number});
        if(existsUser){
            res.send({
                success:false,
                message: "User already exists"
            })
            return;
        }

        // generate new hasing password
        const hasPassword = await bcrypt.hash(password,soltRound)

        // Create new user
        const user = await User.create({...body, password:hasPassword}); 
        res.status(200).send({
            message: "Created",
            success: false,
            user
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const {phone_number, password} = req.body;
        const user = await User.findOne({phone_number});
        if(!user){
            res.status(404).send({
                message: "not-found",
                success: false,
            })
        }

        // compare password
        const comparePassword = await bcrypt.compare(password, user?.password);
        if(!comparePassword){
            res.status(500).send({
                message: "somthing wrong",
                success: false,
            })
        }

        // Create JWT 
        const token = jwt.sign({id:user?._id, email: user?.email, role:user?.role, uniqueId:user?.uniqueId }, jwtSecret, {expiresIn:'1d'} )

        // Set Access token
        res.cookie("access_token",token,{
            httpOnly:true,
            secure:true,
            samesite:'none',
        })
      
        // response user
        const resUser = await User.findById({_id: user?._id}).select("-password");
        res.send({
            success:true,
            message:"login successfull",
            user:resUser,
            access_token:token
        })


    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    loginUser
}