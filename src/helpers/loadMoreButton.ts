import type { Job } from "../types/jobs"

let jobPagesCount = 1

const hideButtonIfNeeded = (length: number, selector: string) => {
  const loadMoreButton = document.querySelector(selector)

  if (length + 1 > jobPagesCount * 12) return

  loadMoreButton?.classList.add('hide-button')
}

export const returnCardsFromTemplate = () => {
  const jobsTemplate = document.querySelector('[data-template="jobs"]') as null | HTMLTemplateElement

  if (jobsTemplate == null) return []

  const jobsTemplateClone = jobsTemplate.content.cloneNode(true) as DocumentFragment
  
  return [...jobsTemplateClone.querySelectorAll('.card-container')] as HTMLDivElement[]
}

const loadMoreJobs = (selector: string, length?: number) => {
  const jobsDiv = document.querySelector('[data-container="jobs"]')
  const cardContainers = returnCardsFromTemplate()

  if (cardContainers.length === 0) return

  const startIndex = (jobPagesCount-1) * 12
  const endIndex = cardContainers.length + 1 > jobPagesCount * 12 ? jobPagesCount * 12 : cardContainers.length
  const newCardContainers = cardContainers.slice(startIndex, endIndex)

  newCardContainers.forEach((newCard) => {
    jobsDiv?.append(newCard)
  })

  hideButtonIfNeeded(length || cardContainers.length, selector)
}

export const addListenerToLoadButton = (selector: string, length?: number) => {
  const loadMoreButton = document.querySelector(selector)

  loadMoreButton?.addEventListener('click', () => {
    jobPagesCount++
    loadMoreJobs(selector, length || undefined)
  })
}

export const addListenerToWindow = (selector: string) => {
  const cardContainers = [...document.querySelectorAll('.card-container')] as HTMLDivElement[]

  hideButtonIfNeeded(cardContainers.length, selector)
}