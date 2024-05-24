const { updateMemberForAdmin } = require("../controllers/MembersController");
const { isAuthCheck } = require("../middleware/isAuth");

const memberRoute = require("express").Router();

memberRoute.patch(`/member/update/:id`, isAuthCheck, updateMemberForAdmin);

module.exports = memberRoute;
