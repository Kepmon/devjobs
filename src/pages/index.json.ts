import type { APIRoute } from 'astro'
import type { JobCardType } from '../types/jobs'
import { allJobsDb } from '../xata'
import { filterJobs } from '../helpers/jobsForm'

let searchParams: URLSearchParams

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  searchParams = data.searchParams

  return new Response(JSON.stringify(data))
}

export const GET: APIRoute = async () => {
  let paginatedJobs
  const jobColumns = ['id', 'logo.url', 'logoBackground', 'xata.createdAt', 'contract', 'position', 'company', 'location'] as JobCardType
  const pageNumber = Number((new URLSearchParams(searchParams)).get('page'))

  if (pageNumber > 0) {
    paginatedJobs = await allJobsDb.select(jobColumns).getPaginated({
      pagination: { size: 12, offset: (pageNumber - 1) * 12 }
    })
  }

  if (pageNumber === 0) {
    const params = filterJobs(new URLSearchParams(searchParams))
    paginatedJobs = await allJobsDb
      .filter(params)
      .select(jobColumns)
      .getPaginated({
        pagination: { size: 12, offset: 0 }
      })
  }

  return new Response(JSON.stringify(paginatedJobs != null ? paginatedJobs.records : {}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}