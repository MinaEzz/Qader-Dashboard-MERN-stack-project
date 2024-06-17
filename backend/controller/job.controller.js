const Job = require("../models/job.model")
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")

const getAllJobs = async (req,res,next)=>{
    try {
        const jobs = await Job.find();
        if (!jobs || jobs.length === 0) {
          const error = new Error("No Jobs Found.");
          error.status = FAIL;
          error.code = 404;
          return next(error);
        }
        res.status(200).json({ status: SUCCESS, data: { jobs } });
      } catch (err) {
        const error = new Error(err.message);
        error.status = ERROR;
        error.code = 500;
        return next(error);
      }
}

const addJob = async (req,res,next)=>{
  const {title, description, location, expectedSalary, applyLink} = req.body
  try {
  const createdJob = new Job({title, description, location, expectedSalary, applyLink})
    await createdJob.save();
    res
      .status(201)
      .json({ status: SUCCESS, data: { job: createdJob } });
      
  } catch (err) {
      const error = new Error(err.message);
      error.status = ERROR;
      error.code = 500;
      return next(error);
      
  }
}

module.exports = {getAllJobs, addJob}