export const addLoadingState = (
  button: null | HTMLButtonElement,
  previousButtonContent: string
) => {
  const spinnerTemplate = document.querySelector(
    '[data-template="spinner"]'
  ) as null | HTMLTemplateElement

  if (spinnerTemplate != null && button != null) {
    const spinnerDocumentFragment = spinnerTemplate.content.cloneNode(
      true
    ) as DocumentFragment
    const spinner = spinnerDocumentFragment.querySelector('[data-spinner]')

    button.setAttribute('disabled', '')

    if (spinner != null) {
      const isPreviousContentAnSvg =
        previousButtonContent.slice(0, 4) === '<svg'

      const innerContent = `<div class="flex gap-2 items-center justify-center">${
        spinner.outerHTML
      } ${!isPreviousContentAnSvg ? 'Loading...' : ''}</div>`

      button.innerHTML = innerContent
    }
  }

  return () => {
    if (button != null) {
      button.innerHTML = previousButtonContent
      button.removeAttribute('disabled')
    }
  }
}
