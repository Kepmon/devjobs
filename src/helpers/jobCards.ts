import type { Job } from "../types/jobs"
import { returnTimeDifference } from "./timeDifference"

const setElementProperty = <T extends HTMLElement>(element: null | T, property: keyof T, value: T[keyof T]) => {
  if (element == null) return
  
  element[property] = value
}

export const createNewJobCard = (jobs: Job[], clearContainer?: true) => {
  const jobsContainer = document.querySelector('[data-container="jobs"]')
  const newJobTemplate = document.querySelector('[data-template="new-job"]') as null | HTMLTemplateElement
  
  if (clearContainer) {
    jobsContainer?.replaceChildren()
  }
  
  jobs.forEach((job) => {
    const newJobContent = newJobTemplate?.content.cloneNode(true) as null | DocumentFragment
    const cardLink = newJobContent?.querySelector('[data-link]') as null | HTMLAnchorElement

    if (cardLink == null) return

    const cardLogoContainer = cardLink.querySelector('.card-logo') as null | HTMLDivElement
    const cardLogoImg = cardLink.querySelector('[alt="company logo"]') as null | HTMLImageElement
    const datePosted = cardLink.querySelector('[data-wrapper="gray-text"] p:first-child') as null | HTMLParagraphElement
    const contract = cardLink.querySelector('[data-wrapper="gray-text"] p:nth-child(3)') as null | HTMLParagraphElement
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