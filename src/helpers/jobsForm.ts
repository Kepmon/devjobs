import type { JobResponse } from '../types/jobs'
import { createNewJobCard } from './jobCards'
import { addLoadingState } from './spinner'

type SearchValues = {
  $any: {
    company: { $iContains: string }
    position: { $iContains: string }
    description: { $iContains: string }
  }
  location: { $iContains: string }
  contract: { $iContains: string }
}

const getQueryParams = (searchParams: URLSearchParams) => {
  const search = searchParams.get('job')
  const location = searchParams.get('location')
  const locationMobile = searchParams.get('locationMobile')
  const contract = searchParams.get('contract')
  const contractMobile = searchParams.get('contractMobile')

  return { search, location, locationMobile, contract, contractMobile }
}

export const prePopulateForm = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const queryParams = getQueryParams(searchParams)
  const queryParamsKeys = Object.keys(queryParams)

  queryParamsKeys.forEach((param) => {
    type Param = keyof typeof queryParams

    if (queryParams[param as Param] != null) {
      const inputs = [
        ...document.querySelectorAll(`[name^="${param}"]`)
      ] as (null | HTMLInputElement)[]

      inputs.forEach((input) => {
        if (input != null && input.type === 'checkbox') {
          input.checked = true
        }

        if (input != null && input.type === 'search') {
          input.value = queryParams[param as Param] as string
        }
      })
    }
  })
}

const getInputValues = (jobsForm: HTMLFormElement) => {
  const formDataInstance = new FormData(jobsForm)
  return Object.fromEntries(formDataInstance)
}

const checkFormValidity = (jobsForm: HTMLFormElement) => {
  const { search, location, locationMobile, contract, contractMobile } =
    getInputValues(jobsForm)

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

  if (contract != null || contractMobile != null) {
    searchURL.searchParams.set('contract', 'full time')
  }

  return searchURL
}

export const filterJobs = (urlParams: URLSearchParams) => {
  const params = Object.fromEntries(urlParams)
  const keys = Object.keys(params)
  const areThereAnyParams = keys.length > 0

  if (!areThereAnyParams) return {}

  const searchValues: Partial<SearchValues> = {}
  keys.forEach((key) => {
    if (key === 'location' || key === 'contract') {
      searchValues[key as keyof Omit<SearchValues, '$any'>] = {
        $iContains: params[key]
      }
    }

    if (key === 'locationMobile') {
      searchValues[key as keyof Omit<SearchValues, '$any'>] = {
        $iContains: params.location
      }
    }

    if (key === 'contractMobile') {
      searchValues[key as keyof Omit<SearchValues, '$any'>] = {
        $iContains: params.contract
      }
    }

    if (key === 'job') {
      const remainingColumns = ['company', 'position', 'description']
      const orCase: SearchValues['$any'] = {
        company: { $iContains: '' },
        position: { $iContains: '' },
        description: { $iContains: '' }
      }
      remainingColumns.forEach((column) => {
        orCase[column as keyof SearchValues['$any']] = {
          $iContains: params[key]
        }
      })

      searchValues.$any = orCase
    }
  })
  return searchValues
}

const returnSearchButton = () => {
  const isDialogOpen = document
    .querySelector('[data-dialog="filter-jobs"]')
    ?.hasAttribute('open')
  const searchIconButton = document.querySelector(
    '[data-button="search-icon"]'
  ) as null | HTMLButtonElement
  const searchTextButtons = [
    ...document.querySelectorAll('[data-button="search-text"]')
  ] as HTMLButtonElement[]
  const searchTextButton = isDialogOpen
    ? searchTextButtons[1]
    : searchTextButtons[0]
  const isSearchIconButtonShown =
    searchIconButton != null
      ? window.getComputedStyle(searchIconButton).display === 'block'
      : false
  return isSearchIconButtonShown && !isDialogOpen
    ? searchIconButton
    : searchTextButton
}

const handleFormValidation = (jobsForm: HTMLFormElement) => {
  const previouslyFocusedElement = document.activeElement as
    | null
    | HTMLInputElement
    | HTMLButtonElement

  const invalidMessage = document.querySelector(
    '[data-error="invalid-form"]'
  ) as null | HTMLParagraphElement
  const isFormValid = checkFormValidity(jobsForm)

  if (!isFormValid && invalidMessage != null) {
    invalidMessage?.classList.remove('scale-0')
    invalidMessage?.classList.add('scale-100')

    if (previouslyFocusedElement != null) {
      previouslyFocusedElement.setAttribute(
        'aria-label',
        'You need to fill at least one input in'
      )
      setTimeout(() => {
        if (previouslyFocusedElement.closest('button') != null) {
          previouslyFocusedElement.setAttribute(
            'aria-label',
            'click here to submit the form'
          )
          return
        }

        previouslyFocusedElement.removeAttribute('aria-label')
      }, 1000)
    }

    return isFormValid
  }

  invalidMessage?.classList.remove('scale-100')
  invalidMessage?.classList.add('scale-0')
  return isFormValid
}

const handleDialog = () => {
  const dialog = document.querySelector(
    '[data-dialog="filter-jobs"]'
  ) as null | HTMLDialogElement

  if (dialog != null && dialog.hasAttribute('open')) {
    dialog.close()
  }
}

const handleNoJobInfo = (jobs: JobResponse) => {
  if (jobs.paginatedJobs.length === 0) {
    const noJobInfo = document.querySelector(
      '[data-displayed]'
    ) as null | HTMLDivElement

    noJobInfo?.setAttribute('data-displayed', 'true')
  }
}

const handleLoadButton = (isThereAnotherPage: boolean) => {
  const loadButton = document.querySelector(
    '[data-button="load"]'
  ) as null | HTMLButtonElement
  if (loadButton != null) {
    loadButton.dataset.next = isThereAnotherPage ? 'true' : 'false'
  }
}

const handleSubmit = async (jobsForm: HTMLFormElement) => {
  const isFormValid = handleFormValidation(jobsForm)
  if (!isFormValid) return

  const searchButton = returnSearchButton()
  if (searchButton != null) {
    const oldButtonContent = searchButton?.innerHTML
    const addOldContentBack = addLoadingState(searchButton, oldButtonContent)

    const searchURL = makeQueryLink(jobsForm)
    window.history.pushState({}, '', searchURL)

    const response = await fetch('/index.json', {
      method: 'POST',
      body: JSON.stringify({ searchParams: searchURL.search }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jobResponse = (await response.json()) as JobResponse

    handleNoJobInfo(jobResponse)
    handleLoadButton(jobResponse.isThereAnotherPage)
    handleDialog()
    createNewJobCard(jobResponse.paginatedJobs, true)
    addOldContentBack()
  }
}

export const addListenerToForm = (jobsForm: HTMLFormElement) => {
  jobsForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault()
    await handleSubmit(jobsForm)
  })
}

export const addListenerToDoubledInputs = () => {
  const locationInputs = [
    ...document.querySelectorAll('[name^="location"]')
  ] as HTMLInputElement[]
  const contractInputs = [
    ...document.querySelectorAll('[name^="contract"]')
  ] as HTMLInputElement[]
  const allDoubledInputs = [...locationInputs, ...contractInputs]

  if (allDoubledInputs.length > 0) {
    allDoubledInputs.forEach((input) => {
      input.addEventListener('input', () => {
        const doubledInput = allDoubledInputs.find(
          (secondInput) =>
            secondInput.name !== input.name &&
            secondInput.name.includes(input.name.replace('Mobile', ''))
        )

        if (doubledInput != null && input.type === 'checkbox') {
          doubledInput.checked = input.checked
          return
        }

        if (doubledInput != null) {
          doubledInput.value = input.value
        }
      })
    })
  }
}

export const addListenerToWindow = () => {
  window.addEventListener('resize', () => {
    const dialog = document.querySelector(
      '[data-dialog="filter-jobs"]'
    ) as null | HTMLDialogElement
    const isDialogDisplayed =
      dialog != null
        ? window.getComputedStyle(dialog).display === 'block'
        : true

    if (isDialogDisplayed) return

    dialog?.close()
  })
}
