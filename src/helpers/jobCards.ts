import type { Job } from "../types/jobs"
import { returnTimeDifference } from "./timeDifference"

const returnJobStaticData = (job: Job) => ([
  {
    selector: 'logo',
    property: 'src',
    value: job.logo.at(0)?.url
  },
  {
    selector: 'first-gray-p',
    property: 'textContent',
    value: returnTimeDifference(job.xata.createdAt)
  },
  {
    selector: 'third-gray-p',
    property: 'textContent',
    value: job.contract
  },
  {
    selector: 'heading',
    property: 'textContent',
    value: job.position
  },
  {
    selector: 'company',
    property: 'textContent',
    value: job.company
  },
  {
    selector: 'location',
    property: 'textContent',
    value: job.location
  }
])

const setElementProperty = <T extends HTMLElement>(element: null | T, property: keyof T, value: T[keyof T]) => {
  if (element == null) return
  
  element[property] = value
}

const renderJobCard = (job: Job, jobsContainer: null | HTMLDivElement, newJobTemplate: null | HTMLTemplateElement) => {
  const newJobContent = newJobTemplate?.content.cloneNode(true) as null | DocumentFragment
  const cardLink = newJobContent?.querySelector('[data-template="link"]') as null | HTMLAnchorElement
  const cardLogoContainer = cardLink?.querySelector('.card-logo') as null | HTMLDivElement

  if (cardLink == null) return

  const jobStaticData = returnJobStaticData(job)
  jobStaticData.forEach((pieceOfData) => {
    const htmlElement = cardLink.querySelector(`[data-template="${pieceOfData.selector}"]`) as null | HTMLElement

    setElementProperty(cardLink, 'href', `job/${job.id}`)
    setElementProperty(htmlElement, (pieceOfData.property as keyof HTMLElement), pieceOfData.value)
  })

  if (cardLogoContainer != null) {
    cardLogoContainer.style.backgroundColor = job.logoBackground
  }

  jobsContainer?.append(cardLink)
}

export const createNewJobCard = (jobs: Job[], clearContainer?: true) => {
  const jobsContainer = document.querySelector('[data-container="jobs"]') as null | HTMLDivElement
  const newJobTemplate = document.querySelector('[data-template="new-job"]') as null | HTMLTemplateElement

  if (clearContainer) {
    jobsContainer?.replaceChildren()
  }
  
  jobs.forEach((job) => {
    renderJobCard(job, jobsContainer, newJobTemplate)
  })
}