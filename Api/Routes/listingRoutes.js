import express from "express";
import { createListing } from "../Controller/listing.controller.js";
import { VerifyToken } from "../utils/verifieduser.js";

const router = express.Router();

router.post('/create',VerifyToken,createListing)

export default router