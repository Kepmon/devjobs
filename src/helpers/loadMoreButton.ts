import type { Job } from "../types/jobs"
import { returnTimeDifference } from "./timeDifference"

let jobPagesCount = 1

const hideButtonIfNeeded = (
  isNextPage: boolean,
  button: HTMLButtonElement | null
) => {
  if (!isNextPage) return

  button?.classList.add('hide-button')
}

const setElementProperty = <T extends HTMLElement>(element: null | T, property: keyof T, value: T[keyof T]) => {
  if (element == null) return
  
  element[property] = value
}

const createNewJobCard = (jobs: Job[]) => {
  jobs.forEach((job) => {
    const jobsContainer = document.querySelector('[data-container="jobs"]')
    const newJobTemplate = document.querySelector('[data-template="new-job"]') as null | HTMLTemplateElement
    const newJobContent = newJobTemplate?.content.cloneNode(true) as null | DocumentFragment
    const cardLink = newJobContent?.querySelector('[data-link]') as null | HTMLAnchorElement

    if (cardLink == null) return
    
    const cardLogoContainer = cardLink.querySelector('.card-logo') as null | HTMLDivElement
    const cardLogoImg = cardLink.querySelector('[alt="company logo"]') as null | HTMLImageElement
    const datePosted = cardLink.querySelector('[data-wrapper="gray-text"] p:first-child') as null | HTMLParagraphElement
    const contract= cardLink.querySelector('[data-wrapper="gray-text"] p:nth-child(3)') as null | HTMLParagraphElement
    const jobHeading = cardLink.querySelector('[data-heading]') as null | HTMLHeadingElement
    const company = cardLink.querySelector('[data-company]') as null | HTMLParagraphElement
    const location = cardLink.querySelector('[data-location]') as null | HTMLParagraphElement
      
    setElementProperty(cardLink, 'href', `job/${job.id}`)
    setElementProperty(cardLogoImg, 'src', job.logo.at(0)?.url)
    setElementProperty(datePosted, 'textContent', returnTimeDifference(job.xata.createdAt))
    setElementProperty(contract, 'textContent', job.contract)
    setElementProperty(jobHeading, 'textContent', job.position)
    setElementProperty(company,'textContent',  job.company)
    setElementProperty(location, 'textContent', job.location)

    if (cardLogoContainer != null) {
      cardLogoContainer.style.backgroundColor = job.logoBackground
    }

    jobsContainer?.append(cardLink)
  })
}

const handleButtonClick = async (isNextPage: boolean, button: HTMLButtonElement) => {
  jobPagesCount++
  window.history.pushState({}, '', `?page=${jobPagesCount}`)

  hideButtonIfNeeded(isNextPage, button)

  await fetch('/index.json', {
    method: 'POST',
    body: JSON.stringify({ jobPagesCount }),
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
