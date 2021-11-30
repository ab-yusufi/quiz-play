const express = require("express");
const router = express.Router();

const {
    getUserById,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    blockUnblockUser
} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin, isNotBlocked} = require("../middlewares/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, getUser);
router.get("/users/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.delete("/user/:userId", isSignedIn, isAuthenticated, deleteUser);

router.put("/user/block/:userId", isSignedIn, isAuthenticated, isAdmin, blockUnblockUser);

module.exports = router;