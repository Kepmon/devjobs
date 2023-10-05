let jobPagesCount = 1

const hideButtonIfNeeded = (
  length: number,
  button: HTMLButtonElement | null
) => {
  if (length + 1 > jobPagesCount * 12) return

  button?.classList.add('hide-button')
}

export const returnCardsFromTemplate = () => {
  const jobsTemplate = document.querySelector(
    '[data-template="jobs"]'
  ) as null | HTMLTemplateElement

  if (jobsTemplate == null) return []

  const jobsTemplateClone = jobsTemplate.content.cloneNode(
    true
  ) as DocumentFragment

  return [
    ...jobsTemplateClone.querySelectorAll('[data-link="job-details"]')
  ] as HTMLDivElement[]
}

const loadMoreJobs = (button: HTMLButtonElement, length?: number) => {
  const jobsDiv = document.querySelector('[data-container="jobs"]')
  const cardContainers = returnCardsFromTemplate()

  if (cardContainers.length === 0) return

  const startIndex = (jobPagesCount - 1) * 12
  const endIndex =
    cardContainers.length + 1 > jobPagesCount * 12
      ? jobPagesCount * 12
      : cardContainers.length
  const newCardContainers = cardContainers.slice(startIndex, endIndex)

  newCardContainers.forEach((newCard) => {
    jobsDiv?.append(newCard)
  })

  hideButtonIfNeeded(length || cardContainers.length, button)
}

export const addListenerToLoadButton = (
  button: HTMLButtonElement | null,
  length?: number
) => {
  button?.addEventListener('click', () => {
    jobPagesCount += 1
    loadMoreJobs(button, length || undefined)
  })
}

export const addListenerToWindow = (button: HTMLButtonElement | null) => {
  const cardContainers = [
    ...document.querySelectorAll('.card-container')
  ] as HTMLDivElement[]

  hideButtonIfNeeded(cardContainers.length, button)
}
