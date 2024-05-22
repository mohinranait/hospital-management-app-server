const { getAllUsers, createNewUser, loginUser } = require("../controllers/UserController");

const userRoute = require("express").Router();

userRoute.get('/user', getAllUsers);
userRoute.post('/user', createNewUser);
userRoute.post('/user/login', loginUser);

module.exports = userRoute

