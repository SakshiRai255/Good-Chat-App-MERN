import express from "express";
import { getUser,updateUser,deleteUser,followUser,UnFollowUser,getAllUsers } from "../Controllers/userController.js";
import authMiddleware from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get("/:id",getUser)
router.get("/",getAllUsers)
router.put("/:id",authMiddleware,updateUser)
router.delete("/:id",authMiddleware,deleteUser)
router.put("/:id/follow",authMiddleware,followUser)
router.put("/:id/Unfollow",authMiddleware,UnFollowUser)

export default router