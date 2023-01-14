import express from "express";
import { createPost,getPost,updatePost,deletePost,likePost,GetTimelinePost } from "../Controllers/PostController.js";
const router = express.Router();

router.post("/",createPost)
router.get("/:id",getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)
router.get("/:id/timeline",GetTimelinePost)

export default router