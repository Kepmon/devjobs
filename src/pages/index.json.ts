import type { APIRoute } from 'astro'
import { fetchJobs } from '../helpers/jobsData'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  const searchParams = new URLSearchParams(data.searchParams)

  const { returnedJobs, anotherPage } = await fetchJobs(searchParams, true)

  const paginatedJobs = returnedJobs != null ? returnedJobs : []
  const isThereAnotherPage = anotherPage != null ? anotherPage : true

  return new Response(JSON.stringify({ paginatedJobs, isThereAnotherPage }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
