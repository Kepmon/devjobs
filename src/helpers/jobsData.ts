import { allJobsDb } from '../xata'
import type { JobCardType } from '../types/jobs'
import { filterJobs } from './jobsForm'

const jobColumns = [
  'id',
  'logo.url',
  'logoBackground',
  'xata.createdAt',
  'contract',
  'position',
  'company',
  'location'
] as JobCardType

export const returnJobsToDisplay = async (size: number, offset: number, searchParams?: URLSearchParams) => {
  const paginatedJobs = await allJobsDb
    .filter(searchParams ? filterJobs(searchParams) : '')
    .select(jobColumns)
    .getPaginated({
      pagination: { size, offset }
    })

  const returnedJobs = paginatedJobs.records
  const anotherPage = paginatedJobs.hasNextPage()

  return { returnedJobs, anotherPage }
}