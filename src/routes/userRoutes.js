const {
  getAllUsers,
  createNewUser,
  loginUser,
  logOutUser,
  getAuthUser,
  getSingleUser,
} = require("../controllers/UserController");
const { isAuthCheck } = require("../middleware/isAuth");

const userRoute = require("express").Router();

userRoute.get("/users", getAllUsers);
userRoute.get("/auth", isAuthCheck, getAuthUser);
userRoute.post("/user/register", createNewUser);
userRoute.post("/user/login", loginUser);
userRoute.post("/user/logout", logOutUser);
userRoute.get("/user/:id", getSingleUser);

module.exports = userRoute;
