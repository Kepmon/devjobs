import type { APIRoute } from 'astro'
import { returnJobsToDisplay } from '../helpers/jobsData'

let searchParams: URLSearchParams

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  searchParams = data.searchParams

  return new Response(JSON.stringify(data))
}

export const GET: () => Promise<Response | undefined> = async () => {
  let paginatedJobs
  let isThereAnotherPage
  const pageNumber = Number((new URLSearchParams(searchParams)).get('page'))

  if (pageNumber > 0) {
    const { returnedJobs, anotherPage } = await returnJobsToDisplay(12, (pageNumber - 1) * 12)
    paginatedJobs = returnedJobs
    isThereAnotherPage = anotherPage
  }

  if (pageNumber === 0) {
    const { returnedJobs, anotherPage } = await returnJobsToDisplay(12, 0, new URLSearchParams(searchParams))
    paginatedJobs = returnedJobs
    isThereAnotherPage = anotherPage
  }

  return new Response(JSON.stringify({ paginatedJobs, isThereAnotherPage }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}