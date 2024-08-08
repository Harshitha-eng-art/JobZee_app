import express from "express";
import { authorisation } from "../middlewares/auth.js";
import { emogetapplicattion, jobapplicationseeker, jobseekerdeleteapplication, postapplication } from "../controllers/applicationcontrooler.js";
const router=express.Router();
router.get("/employer/getall",authorisation,emogetapplicattion)
router.get("/jobseeker/getall",authorisation,jobapplicationseeker)
router.delete("/delete/:id",authorisation,jobseekerdeleteapplication)
router.post("/post",authorisation,postapplication)

export default router;