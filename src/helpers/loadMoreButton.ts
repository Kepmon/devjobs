import { createNewJobCard } from './jobCards'
import { returnExistingParams } from './jobParams'
import { addLoadingState } from './spinner'

const handleButtonClick = async (
  jobPagesCount: number,
  button: null | HTMLButtonElement
) => {
  const oldButtonContent = button?.innerHTML || ''

  const addOldContentBack = addLoadingState(button, oldButtonContent)

  // eslint-disable-next-line no-param-reassign
  jobPagesCount += 1

  const searchURL = returnExistingParams()
  searchURL.searchParams.set('page', jobPagesCount.toString())
  window.history.pushState({}, '', searchURL)

  const response = await fetch('/index.json', {
    method: 'POST',
    body: JSON.stringify({ searchParams: window.location.search }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jobs = await response.json()

  createNewJobCard(jobs.paginatedJobs)

  if (button != null) {
    button.dataset.next = jobs.isThereAnotherPage ? 'true' : 'false'
  }

  addOldContentBack()
}

export const addListenerToLoadButton = (
  jobPagesCount: number,
  button: HTMLButtonElement | null
) => {
  button?.addEventListener('click', async () => {
    await handleButtonClick(jobPagesCount, button)
  })
}
