const express = require("express");
const router = express.Router();
const {addJob, getAllJobs, updateJob, deleteJob} = require("../controller/job.controller")

router.route("/").get(getAllJobs).post(addJob)
router.route("/:jobId").patch(updateJob).delete(deleteJob)





module.exports = router;


