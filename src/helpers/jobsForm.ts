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
    searchURL.searchParams.set('contract', 'Full Time')
  }

  if (contractMobile != null) {
    searchURL.searchParams.set('contract', 'Full Time')
  }

  return searchURL
}

interface SearchValues {
  $any: {
    company: { $iContains: string },
    position: { $iContains: string },
    description: { $iContains: string }
  }
  location: { $iContains: string }
  contract: { $iContains: string }
}

export const filterJobs = (urlParams: URLSearchParams) => {
  const params = Object.fromEntries(urlParams)
  const keys = Object.keys(params)
  const areThereAnyParams = keys.length > 0

  if (!areThereAnyParams) return

  let searchValues: Partial<SearchValues> = {}
  keys.forEach((key) => {
    if (key !== 'job') {
      searchValues[key as keyof Omit<SearchValues, '$any'>] = { $iContains: params[key] }
    }

    if (key === 'job') {
      const remainingColumns = ['company', 'position', 'description']
      const orCase: SearchValues['$any'] = {
        company: { $iContains: '' },
        position: { $iContains: '' },
        description: { $iContains: '' }
      }
      remainingColumns.forEach((column) => {
        orCase[column as keyof SearchValues['$any']] = { $iContains: params[key] }
      })

      searchValues['$any'] = orCase
    }
  })
  return searchValues
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
