export function setLocalStorage(key, value) {
  const existingData = JSON.parse(localStorage.getItem(key)) || {}
  existingData[value.it] = value.elements
  localStorage.setItem(key, JSON.stringify(existingData))
}

export function getLocalStorage(key, itToFind) {
  const existingData = JSON.parse(localStorage.getItem(key))
  if (existingData) {
    const elements = existingData[itToFind]
    if (elements) {
      return elements
    }
  }
  return null
}

export function getAllLocalStorage(key, itToExclude) {
  const existingData = JSON.parse(localStorage.getItem(key))
  if (existingData) {
    const allElements = {}
    for (const it in existingData) {
      if (it !== itToExclude) {
        const elements = existingData[it]
        if (elements) {
          allElements[it] = elements
        }
      }
    }
    return allElements
  }
  return null
}
