let jobPagesCount = 1

const hideButtonIfNeeded = (
  isNextPage: boolean,
  button: HTMLButtonElement | null
) => {
  if (!isNextPage) return

  button?.classList.add('hide-button')
}

const loadMoreJobs = (isNextPage: boolean, button: HTMLButtonElement) => {
  jobPagesCount++
  window.location.assign(`?page=${jobPagesCount}`)

  hideButtonIfNeeded(isNextPage, button)
}

export const addListenerToLoadButton = (
  isNextPage: boolean,
  button: HTMLButtonElement | null
) => {
  button?.addEventListener('click', (e: Event) => {
    loadMoreJobs(isNextPage, button)
  })
}
