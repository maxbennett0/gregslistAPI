import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class JobsService {
  async update(jobId, jobData) {
    const original = await dbContext.Jobs.findById(jobId)
    if (!original) throw new BadRequest('no job at id: ' + jobId)

    original.jobTitle = jobData.jobTitle ? jobData.jobTitle : original.jobTitle
    original.company = jobData.company ? jobData.company : original.company
    original.rate = jobData.rate ? jobData.rate : original.rate
    original.hours = jobData.description ? jobData.hours : original.hours
    original.description = jobData.description ? jobData.description : original.description

    await original.save()
    return original
  }
  async remove(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) throw new BadRequest('no job at id ' + jobId + ' id')
    await job.remove()
    return `deleted ${job.jobTitle}`
  }
  async create(jobData) {
    const newJob = await dbContext.Jobs.create(jobData)
    return newJob
  }
  async getAll(query) {
    const jobs = await dbContext.Jobs.find(query)
    return jobs
  }

}

export const jobsService = new JobsService()