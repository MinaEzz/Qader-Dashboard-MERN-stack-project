const Job = require("../models/job.model")
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")

const getAllJobs = async (req, res, next) => {
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

const addJob = async (req, res, next) => {
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

const updateJob = async (req, res, next) => {
  const {jobId} = req.params
  const body = req.body
  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, {$set: {...body}}, {new: true})
    if(!updatedJob){
      const error = new Error("Job Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { job: updatedJob } });
    
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
}

const deleteJob = async (req, res, next) => {
  const {jobId} = req.params
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      const error = new Error("Job Not Found.");
      error.status = FAIL;
      error.code = 404;
      return next(error);
    }
    res.status(200).json({ status: SUCCESS, data: { job: deletedJob } });
  } catch (err) {
    const error = new Error(err.message);
    error.status = ERROR;
    error.code = 500;
    return next(error);
  }
}

module.exports = {getAllJobs, addJob, updateJob, deleteJob}