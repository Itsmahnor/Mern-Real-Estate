import express from "express";
import { test, updateUser } from "../Controller/user.controller.js";
import { VerifyToken } from "../utils/verifieduser.js";

const router = express.Router();

router.get("/test",test)
router.post("/uodate/:id",VerifyToken,updateUser)
export default router