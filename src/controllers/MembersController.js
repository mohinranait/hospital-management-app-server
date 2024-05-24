const User = require("../models/UserModel");

const getAllMembers = async (req, res) => {
  try {
    const users = User.find({});
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {}
};

const updateMemberForAdmin = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    console.log("req ID: ", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "not-found 404",
      });
    }

    res.send({
      success: true,
      user,
      message: "updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllMembers,
  updateMemberForAdmin,
};
