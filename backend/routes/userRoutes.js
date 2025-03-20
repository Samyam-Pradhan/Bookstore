const express = require("express");
const router = express.Router();
const {SignUp, SignIn} = require("../controllers/userController");

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);


module.exports = router;