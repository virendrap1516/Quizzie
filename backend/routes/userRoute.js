const express = require('express');
const userController  = require('../controllers/userController');
const {isAuthenticatedUser} = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.get("/me",isAuthenticatedUser, userController.getUserDetails);
router.get("/logout",userController.logoutUser);

module.exports = router;