import { allJobsDb } from '../xata'

const jobs = await allJobsDb.getAll()
const relevantJobsProperties = jobs.map((job) => ({
  company: job.company,
  contract: job.contract,
  description: job.description,
  id: job.id,
  location: job.location,
  logo: job.logo,
  logoBackground: job.logoBackground,
  position: job.position
}))

export const GET = () => {
  return new Response(JSON.stringify(relevantJobsProperties), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}