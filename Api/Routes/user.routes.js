import express from "express";
import { deleteUser, test, updateUser } from "../Controller/user.controller.js";
import { VerifyToken } from "../utils/verifieduser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", VerifyToken, updateUser); 
router.delete("/delete/:id", VerifyToken, deleteUser); 

export default router;
