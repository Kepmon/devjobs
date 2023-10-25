import { createNewJobCard } from "./jobCards"

let jobPagesCount = 1

const hideButtonIfNeeded = (
  isNextPage: boolean,
  button: HTMLButtonElement | null
) => {
  if (!isNextPage) return

  button?.classList.add('hide-button')
}

const handleButtonClick = async (isNextPage: boolean, button: HTMLButtonElement) => {
  jobPagesCount++
  history.pushState({}, '', `?page=${jobPagesCount}`)

  hideButtonIfNeeded(isNextPage, button)

  await fetch('/index.json', {
    method: 'POST',
    body: JSON.stringify({ searchParams: window.location.search }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const response = await fetch('/index.json')
  const jobs = await response.json()

  createNewJobCard(jobs)
}

export const addListenerToLoadButton = (
  isNextPage: boolean,
  button: HTMLButtonElement | null
) => {
  button?.addEventListener('click', async (e: Event) => {
    await handleButtonClick(isNextPage, button)
  })
}
