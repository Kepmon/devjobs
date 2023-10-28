import type { APIRoute } from 'astro'
import { fetchJobs } from '../helpers/jobsData'

let searchParams: URLSearchParams

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  searchParams = new URLSearchParams(data.searchParams)

  return new Response(JSON.stringify(data))
}

export const GET: () => Promise<Response | undefined> = async () => {
  let paginatedJobs
  let isThereAnotherPage

  const { returnedJobs, anotherPage } = await fetchJobs(searchParams, true)

  paginatedJobs = returnedJobs != null ? returnedJobs : []
  isThereAnotherPage = anotherPage != null ? anotherPage : true

  return new Response(JSON.stringify({ paginatedJobs, isThereAnotherPage }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}