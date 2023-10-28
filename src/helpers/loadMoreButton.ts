import { createNewJobCard } from "./jobCards"
import { returnExistingParams } from "./jobParams"

const handleButtonClick = async (jobPagesCount: number, button: null | HTMLButtonElement) => {
  jobPagesCount++

  const searchURL = returnExistingParams()
  searchURL.searchParams.set('page', jobPagesCount.toString())
  history.pushState({}, '', searchURL)

  await fetch('/index.json', {
    method: 'POST',
    body: JSON.stringify({ searchParams: window.location.search }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  const response = await fetch('/index.json')
  const jobs = await response.json()
    
  if (button != null) {
    button.dataset.next = jobs.isThereAnotherPage ? 'true' : 'false'
  }

  createNewJobCard(jobs.paginatedJobs)
}

export const addListenerToLoadButton = (
  jobPagesCount: number,
  button: HTMLButtonElement | null
) => {
  button?.addEventListener('click', async () => {
    await handleButtonClick(jobPagesCount, button)
  })
}
