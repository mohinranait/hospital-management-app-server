const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../config/secretEnv");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// get single user
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "not-found 404",
      });
    }

    res.send({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// get all users
const getAuthUser = async (req, res) => {
  const { email, role, id } = req?.authUser;
  try {
    let user = await User.findById({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "not-found 404",
      });
    }
    res.send({
      message: "authenticated",
      success: true,
      user,
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const createNewUser = async (req, res) => {
  console.log("User", req.body);
  try {
    const body = req.body;
    const { phone_number, password } = req.body;
    const soltRound = 10;

    // find existing user by Phone_number
    const existsUser = await User.findOne({ phone_number });
    if (existsUser) {
      res.send({
        success: false,
        message: "User already exists",
      });
      return;
    }

    // generate new hasing password
    const hasPassword = await bcrypt.hash(password, soltRound);

    // Create new user
    const user = await User.create({ ...body, password: hasPassword });
    res.status(200).send({
      message: "Created",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, phone_number, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({
        message: "not-found",
        success: false,
      });
    }

    // compare password
    const comparePassword = await bcrypt.compare(password, user?.password);
    if (!comparePassword) {
      res.status(500).send({
        message: "somthing wrong",
        success: false,
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user?._id,
        email: user?.email,
        role: user?.role,
        uniqueId: user?.uniqueId,
      },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // Set Access token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      samesite: "none",
    });

    // response user
    const resUser = await User.findById({ _id: user?._id }).select("-password");
    res.send({
      success: true,
      message: "login successfull",
      user: resUser,
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Logout User
const logOutUser = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        maxAge: 0,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({ success: true, message: "logout successfull" });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  loginUser,
  logOutUser,
  getAuthUser,
  getSingleUser,
};
