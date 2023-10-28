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

export const returnJobsToDisplay = async (size: number, offset: number, searchParams: URLSearchParams) => {
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

export const fetchJobs = async (searchParams: URLSearchParams, paginatedJobs?: true) => {
  const pageNumber =
  searchParams.get('page') != null ? Number(searchParams.get('page')) : 1

  if (pageNumber > 1) {
    return await returnJobsToDisplay(
      paginatedJobs != null ? 12 : 12 * pageNumber,
      paginatedJobs != null ? (pageNumber - 1) * 12 : 0,
      searchParams
    )
  }

  return await returnJobsToDisplay(12, 0, searchParams)
}
