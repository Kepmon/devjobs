import type { Job, SearchQuery } from '../types/jobs'
import { returnCardsFromTemplate } from '../helpers/loadMoreButton'
import Fuse from 'fuse.js'

const jobsForm = document.querySelector('[data-form="jobs"]') as HTMLFormElement

const getInputValues = () => {
  const formDataInstance = new FormData(jobsForm)
  return Object.fromEntries(formDataInstance)
}

const checkFormValidity = () => {
  const { search, location, locationMobile, fullTime, fullTimeMobile } = getInputValues()

  const noInputFilled = search === '' && location === '' && locationMobile === '' && fullTime == null && fullTimeMobile == null
  if (noInputFilled) return false

  return true
}

const makeQueryLink = () => {
  const { search, location, locationMobile, fullTime, fullTimeMobile } = getInputValues()

  const searchURL = new URL('jobs', window.location.origin)
  if (search !== '') {
    searchURL.searchParams.set('job', search as string)
  }

  if (location !== '') {
    searchURL.searchParams.set('location', location as string)
  }
  
  if (locationMobile !== '') {
    searchURL.searchParams.set('location', locationMobile as string)
  }

  if (fullTime != null) {
    searchURL.searchParams.set('full-time', 'true')
  }
  
  if (fullTimeMobile != null) {
    searchURL.searchParams.set('full-time', 'true')
  }

  return searchURL
}

const filterJobs = async () => {
  const response = await fetch('/jobs.json')
  const jobs = await response.json()

  const urlParams = new URLSearchParams(window.location.search)

  const searchQueries = []
  const fuse = new Fuse(jobs, {
    keys: ['company', 'contract', 'description', 'location', 'position'],
    threshold: .3
  })

  const search = urlParams.get('job')
  const location = urlParams.get('location')
  const fullTime = urlParams.get('full-time')

  const areThereAnyParams = search != null || location != null || fullTime === 'true'

  if (!areThereAnyParams) return

  if (location != null) {
    searchQueries.push({ location: urlParams.get('location') })
  }
  
  if (fullTime === 'true') {
    searchQueries.push({ contract: 'full' })
  }

  if (search != null && searchQueries.length > 0) {
    searchQueries.push({
      $or: [{ company: search }, { description: search }, { position: search }]
    })
  }
  
  if (searchQueries.length > 0) {
    return fuse.search({
      $and: searchQueries as Partial<SearchQuery>[]
    })
  }

  if (search != null) {
    return fuse.search({
      $or: [{ company: search }, { description: search }, { position: search }]
    })
  }
}

export const loadFilteredJobs = async () => {
  const filteredJobs = await filterJobs()

  if (filteredJobs == null) return 0

  const jobsDiv = document.querySelector('[data-container="jobs"]')
  if (filteredJobs.length === 0) {
    const noJobsTemplate = document.querySelector('[data-template="no-jobs-message"]') as null | HTMLTemplateElement

    if (noJobsTemplate == null) return

    const noJobsTemplateClone = noJobsTemplate.content.cloneNode(true) as DocumentFragment
    jobsDiv?.append(noJobsTemplateClone)
    return 0
  }

  const filteredJobsIDs = filteredJobs.map((job) => (job.item as Job).id)

  const cardContainers = returnCardsFromTemplate()

  cardContainers.forEach((container, index) => {
    const jobID = container.dataset.id

    if (filteredJobsIDs?.some((id) => id === jobID)) {
      jobsDiv?.append(container)
    }
  })

  return filteredJobs.length
}

const handleSubmit = () => {
  const isFormValid = checkFormValidity()
  if (!isFormValid) return

  const searchURL = makeQueryLink()

  const isHomePage = window.location.pathname === '/'

  if (isHomePage) {
    window.location.assign(`jobs/${searchURL.search}`)
    return
  }
  window.location.assign(`${searchURL.search}`)
}

export const addListenerToForm = () => {
  jobsForm.addEventListener('submit',(e: Event) => {
    e.preventDefault()
    handleSubmit()
  })
}