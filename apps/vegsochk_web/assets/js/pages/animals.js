const hideElement = element =>
  element.style.display = 'none'

const showElement = element =>
  element.style.display = 'block'

const hideAllChildren = element => {
  const children = element.children;
  var i;
  for (i = 0; i < children.length; i++) {
    hideElement(children[i])
  }
}

const setOverlayContentHandler = (overlayContainer, overlayContentContainer, id) => {
  const element = document.getElementById(id)
  const overlayElement = document.getElementById(element.dataset.targetOverlay)

  element.onclick = () => {
    overlayContainer.style.width = "100%";
    hideAllChildren(overlayContentContainer);
    showElement(overlayElement);
  }
}

const bootstrap = () => {
  const overlayContainer = document.getElementById('overlay-container');
  const overlayContentContainer = document.getElementById('overlay-content-container');
  const closeOverlayButton = document.getElementById('overlay-close');
  closeOverlayButton.onclick = () => {
    overlayContainer.style.width = "0%";
  }
  const ids = ['pig', 'cow'];
  ids.forEach(setOverlayContentHandler.bind(null, overlayContainer, overlayContentContainer));
}


bootstrap();
