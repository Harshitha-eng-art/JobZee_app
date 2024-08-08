import express from "express";
import { getalljobs, updatejob } from "../controllers/jobcontroller.js";
import { postjob } from "../controllers/jobcontroller.js";
import { authorisation } from "../middlewares/auth.js";
import { getMyJobs } from "../controllers/jobcontroller.js";
import { deleteJob } from "../controllers/jobcontroller.js";
import { getSingleJob } from "../controllers/jobcontroller.js";
const router=express.Router();
router.get("/getall",getalljobs)
router.post("/post",authorisation,postjob)
router.get("/getmyjobs",authorisation,getMyJobs)
router.put("/update/:id",authorisation,updatejob)
router.delete("/delete/:id",authorisation,deleteJob)
router.get("/:id",authorisation,getSingleJob)

export default router;