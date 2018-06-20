export function setSelect(element, value) {
  for(var i, j = 0; i = element.options[j]; j++) {
    if(i.value == value) {
        element.selectedIndex = j;
        break;
    }
  }
}

// when the user cancels out of a form close the modal
export function closeModal(event) {
  let closeElement = event.target.closest("section > div")
  closeElement.classList.remove("is-active")
  enableScroll()
}

export function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

export function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

export function insertBefore(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode);
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  let keys = {37: 1, 38: 1, 39: 1, 40: 1}
  if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
  }
}
