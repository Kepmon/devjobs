import type { Job } from "../types/jobs"

let jobPagesCount = 1

const hideButtonIfNeeded = (items: HTMLDivElement[] | Job[], selector: string) => {
  const loadMoreButton = document.querySelector(selector)

  if (items.length + 1 > jobPagesCount * 12) return

  loadMoreButton?.classList.add('hide-button')
}

export const loadMoreJobs = (selector: string) => {
  const jobsTemplate = document.querySelector('[data-template="jobs"]') as null | HTMLTemplateElement

  if (jobsTemplate == null) return

  const jobsTemplateClone = jobsTemplate.content.cloneNode(true) as DocumentFragment
  const jobsDiv = document.querySelector('[data-container="jobs"]')
  
  const cardContainers = [...jobsTemplateClone.querySelectorAll('.card-container')] as HTMLDivElement[]

  const startIndex = (jobPagesCount-1) * 12
  const endIndex = cardContainers.length + 1 > jobPagesCount * 12 ? jobPagesCount * 12 : cardContainers.length
  const newCardContainers = cardContainers.slice(startIndex, endIndex)

  newCardContainers.forEach((newCard) => {
    jobsDiv?.append(newCard)
  })

  hideButtonIfNeeded(cardContainers, selector)
}

export const addListenerToLoadButton = (selector: string) => {
  const loadMoreButton = document.querySelector(selector)

  loadMoreButton?.addEventListener('click', () => {
    jobPagesCount++
    loadMoreJobs(selector)
  })
}