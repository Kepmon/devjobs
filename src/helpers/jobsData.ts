import type { JobCardType } from '../types/jobs'
import { filterJobs } from './jobsForm'
import { allJobsDb } from '../xata'

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

export const returnJobsToDisplay = async (
  size: number,
  offset: number,
  searchParams: URLSearchParams
) => {
  try {
    const paginatedJobs = await allJobsDb
      .filter(searchParams ? filterJobs(searchParams) : '')
      .select(jobColumns)
      .getPaginated({
        pagination: { size, offset }
      })

    const returnedJobs = paginatedJobs.records
    const anotherPage = paginatedJobs.hasNextPage()

    return { returnedJobs, anotherPage, isError: false }
  } catch (err) {
    return {
      returnedJobs: [],
      anotherPage: false,
      isError: true
    }
  }
}

export const fetchJobs = async (
  searchParams: URLSearchParams,
  paginatedJobs?: true
) => {
  const resultsPerPage = 12
  const pageNumber =
    searchParams.get('page') != null ? Number(searchParams.get('page')) : 1

  if (pageNumber > 1) {
    const jobs = await returnJobsToDisplay(
      paginatedJobs != null ? resultsPerPage : resultsPerPage * pageNumber,
      paginatedJobs != null ? (pageNumber - 1) * resultsPerPage : 0,
      searchParams
    )

    return jobs
  }

  const jobs = await returnJobsToDisplay(resultsPerPage, 0, searchParams)
  return jobs
}
