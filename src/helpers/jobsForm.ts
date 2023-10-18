import type { SearchQuery } from '../types/jobs'
import type { SelectedPick } from '@xata.io/client'
import type { AllJobsRecord } from '../xata'
import Fuse from 'fuse.js'

const getQueryParams = (searchParams: URLSearchParams) => {
  const search = searchParams.get('job')
  const location = searchParams.get('location')
  const contract = searchParams.get('contract')

  return { search, location, contract }
}

export const prePopulateForm = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const queryParams = getQueryParams(searchParams)
  
  for (const param in queryParams) {
    type Param = keyof typeof queryParams

    if (queryParams[param as Param] != null) {
      const input = document.querySelector(`[name="${param}"]`) as null | HTMLInputElement
      
      if (input != null && input.type === 'checkbox') {
        input.checked = true
      }
      
      if (input != null && input.type === 'search') {
        input.value = queryParams[param as Param] as string
      }
    }
  }
}

const getInputValues = (jobsForm: HTMLFormElement) => {
  const formDataInstance = new FormData(jobsForm)
  return Object.fromEntries(formDataInstance)
}

const checkFormValidity = (jobsForm: HTMLFormElement) => {
  const { search, location, locationMobile, contract, contractMobile } = getInputValues(jobsForm)

  const noInputFilled =
    search === '' &&
    location === '' &&
    locationMobile === '' &&
    contract == null &&
    contractMobile == null
  if (noInputFilled) return false

  return true
}

const makeQueryLink = (jobsForm: HTMLFormElement) => {
  const { search, location, locationMobile, contract, contractMobile } =
    getInputValues(jobsForm)

  const searchURL = new URL(window.location.origin)
  if (search !== '') {
    searchURL.searchParams.set('job', search as string)
  }

  if (location !== '') {
    searchURL.searchParams.set('location', location as string)
  }

  if (locationMobile !== '') {
    searchURL.searchParams.set('location', locationMobile as string)
  }

  if (contract != null) {
    searchURL.searchParams.set('contract', 'full')
  }

  if (contractMobile != null) {
    searchURL.searchParams.set('contract', 'full')
  }

  return searchURL
}

export const filterJobs = (
  urlParams: URLSearchParams,
  jobs: Readonly<SelectedPick<AllJobsRecord, ['*']>>[]
) => {
  const searchQueries = []
  const fuse = new Fuse(jobs, {
    keys: ['company', 'contract', 'description', 'location', 'position'],
    threshold: 0.3
  })

  const search = urlParams.get('job')
  const location = urlParams.get('location')
  const locationMobile = urlParams.get('locationMobile')
  const contract = urlParams.get('contract')
  const contractMobile = urlParams.get('contractMobile')

  const allPossibleParams = [
    search,
    location,
    locationMobile,
    contract,
    contractMobile
  ]
  const areThereAnyParams = allPossibleParams.some((param) => param != null)

  if (!areThereAnyParams) return

  if (location != null) {
    searchQueries.push({ location: urlParams.get('location') })
  }

  if (contract === 'full') {
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

const handleSubmit = (jobsForm: HTMLFormElement) => {
  const isFormValid = checkFormValidity(jobsForm)
  const invalidMessage = document.querySelector('[data-error="invalid-form"]')

  if (!isFormValid) {
    invalidMessage?.classList.remove('scale-0')
    invalidMessage?.classList.add('scale-100')
    return
  }

  invalidMessage?.classList.remove('scale-100')
  invalidMessage?.classList.add('scale-0')

  const searchURL = makeQueryLink(jobsForm)
  window.location.assign(`/${searchURL.search}`)
}

export const addListenerToForm = (jobsForm: HTMLFormElement) => {
  jobsForm.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    handleSubmit(jobsForm)
  })
}
