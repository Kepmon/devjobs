const jobsForm = document.querySelector('[data-form="jobs"]') as HTMLFormElement

const getInputValues = () => {
  const formDataInstance = new FormData(jobsForm)
  return Object.fromEntries(formDataInstance)
}

const checkFormValidity = () => {
  const { search, location, fullTime } = getInputValues()

  const noInputFilled = search === '' && location === '' && fullTime == null
  if (noInputFilled) return false

  return true
}

const makeQueryLink = () => {
  const { search, location, fullTime } = getInputValues()

  const searchURL = new URL('jobs', window.location.origin)
  if (search !== '') {
    searchURL.searchParams.set('job', search as string)
  }

  if (location !== '') {
    searchURL.searchParams.set('location', location as string)
  }

  if (fullTime != null) {
    searchURL.searchParams.set('full-time', 'true')
  }

  return searchURL
}

const handleSubmit = (e: Event) => {
  e.preventDefault()

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

export const addListenerToForm = (jobsPrefix?: true) => {
  jobsForm.addEventListener('submit', handleSubmit)
}