const hideElement = element => {
  element.style.display = 'none'
}

const showElement = (element, container) => {
  element.style.display = 'block'
  container.style.transform = 'none'
}

const hideAllChildren = element => {
  const children = element.children
  var i
  for (i = 0; i < children.length; i++) {
    hideElement(children[i])
  }
}

const setOverlayContentHandler = (overlayContainer, overlayContentContainer, id) => {
  const element = document.getElementById(id)
  const overlayElement = document.getElementById(id + '-overlay')

  element.onclick = () => {
    showElement(overlayElement, overlayContainer)
    window.location.hash = id
    window.scrollTo(0, 0)
  }
}

const bootstrap = () => {
  const overlayContainer = document.getElementById('overlay-container')
  const overlayContentContainer = document.getElementById('overlay-content-container')
  const closeOverlayButton = document.getElementById('overlay-close')
  const handleCloseOverlay = () => {
    location.hash = ''
    overlayContainer.style.transform = 'translateX(-100%)'
    setTimeout(() => {
      hideAllChildren(overlayContentContainer)
    }, 600)
  }

  hideAllChildren(overlayContentContainer)
  closeOverlayButton.onclick = handleCloseOverlay
  const ids = ['pig', 'cow', 'chick', 'fish']
  ids.forEach(setOverlayContentHandler.bind(null, overlayContainer, overlayContentContainer))

  window.onhashchange = function () {
    if (!location.hash) {
      handleCloseOverlay()
    }
  }
  const hash = location.hash
  console.log('hash: ', hash)
  if (hash) {
    const overlayElement = document.getElementById(hash.substr(1) + '-overlay')
    overlayElement && showElement(overlayElement, overlayContainer)
  }
}

bootstrap()
