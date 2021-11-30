const express = require("express");
const router = express.Router();

const {
    getUserById,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser
} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin, isNotBlocked} = require("../middlewares/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, getUser);
router.get("/users", isSignedIn, isAuthenticated, isAdmin, getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.delete("/user/:userId", isSignedIn, isAuthenticated, deleteUser);

router.put("/user/:userId/block", isSignedIn, isAuthenticated, isAdmin, blockUser);
router.put("/user/:userId/unblock", isSignedIn, isAuthenticated, isAdmin, unblockUser);

module.exports = router;