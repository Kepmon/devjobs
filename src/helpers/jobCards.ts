import type { Job } from '../types/jobs'
import { returnTimeDifference } from './timeDifference'

const returnJobStaticData = (job: Job) => [
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
]

const setElementProperty = <T extends HTMLElement>(
  element: null | T,
  property: keyof T,
  value: T[keyof T]
) => {
  if (element == null) return

  element[property] = value
}

const renderJobCard = (
  job: Job,
  jobsContainer: HTMLDivElement,
  cardLinkNode: HTMLAnchorElement
) => {
  const cardLogoContainer = cardLinkNode.querySelector(
    '.card-logo'
  ) as null | HTMLDivElement

  if (cardLinkNode == null) return

  const jobStaticData = returnJobStaticData(job)
  setElementProperty(cardLinkNode, 'href', `job/${job.id}`)

  jobStaticData.forEach((pieceOfData) => {
    const htmlElement = cardLinkNode.querySelector(
      `[data-${pieceOfData.selector}="job-card"]`
    ) as null | HTMLElement

    setElementProperty(
      htmlElement,
      pieceOfData.property as keyof HTMLElement,
      pieceOfData.value
    )
  })

  if (cardLogoContainer != null) {
    cardLogoContainer.style.backgroundColor = job.logoBackground
  }

  cardLinkNode.setAttribute(
    'aria-label',
    `${job.position} at ${job.company}. The contract is ${job.contract} and the job is in ${job.location}. Click here to go to the job's details page.`
  )

  jobsContainer.append(cardLinkNode)
}

export const createNewJobCard = (jobs: Job[], clearContainer?: true) => {
  const jobsContainer = document.querySelector(
    '[data-container="jobs"]'
  ) as null | HTMLDivElement

  if (jobsContainer == null) return

  const cardLink = document.querySelector(
    '[data-link="job-card"]'
  ) as null | HTMLAnchorElement
  if (cardLink == null) return

  if (clearContainer) {
    jobsContainer.replaceChildren()
  }

  jobs.forEach((job, index) => {
    const cardLinkNode = cardLink.cloneNode(true) as HTMLAnchorElement

    renderJobCard(job, jobsContainer, cardLinkNode)

    if (index === 0) {
      cardLinkNode.focus()
    }
  })
}
