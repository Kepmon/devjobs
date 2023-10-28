export const returnExistingParams = () => {
  const searchURL = new URL(window.location.origin)
  const exsitingParams = new URLSearchParams(window.location.search)
  const paramsObj = Object.fromEntries(exsitingParams)
  const paramsObjKeys = Object.keys(paramsObj)

  if (paramsObjKeys.length > 0) {
    paramsObjKeys.forEach((key) => {
      if (key === 'page') return

      searchURL.searchParams.set(key, paramsObj[key])
    })
  }

  return searchURL
}
