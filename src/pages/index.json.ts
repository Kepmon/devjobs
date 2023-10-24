import type { JobCardType, PageParam } from '../types/jobs'
import { allJobsDb } from '../xata'

interface RequestData {
  json: () => Promise<PageParam>
}

let pageParam: PageParam

export const POST = async ({ request }: { request: RequestData }) => {
  const data = await request.json()
  pageParam = data

  return new Response(JSON.stringify(data))
}

export const GET = async () => {
  const jobColumns = ['id', 'logo.url', 'logoBackground', 'xata.createdAt', 'contract', 'position', 'company', 'location'] as JobCardType
  const paginatedJobs = await allJobsDb.select(jobColumns).getPaginated({
    pagination: { size: 12, offset: (pageParam.jobPagesCount - 1) * 12 }
  })

  return new Response(JSON.stringify(paginatedJobs.records), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}