// the add control should end up looking like the html below
import { disableScroll } from './utils'
import Modal from './modal'

export default function addControl() {
  let icon = document.createElement('I')
  icon.classList.add("fas", "fa-plus", "fa-6x")

  let h1 = document.createElement('H1')
  h1.classList.add("title")
  h1.textContent = "Add"

  let label = document.createElement('SPAN')
  label.appendChild(h1)

  let content = document.createElement('DIV')
  content.classList.add("vehicle-box-add")
  content.onclick = _addCarForm
  content.appendChild(icon)
  content.appendChild(document.createElement('BR'))
  content.appendChild(label)

  let addUi = document.createElement('DIV')
  addUi.classList.add("vehicle-box")
  addUi.appendChild(content)

  let filterAttribute = "\[\'high\', \'medium\', \'low\'\]"
  addUi.setAttribute('data-groups', filterAttribute)

  return addUi
}

function _addCarForm(event) {
  // generate a new delete modal
  let id = event.currentTarget.getAttribute("id")
  let type = "add"

  new Modal(type, id)

  disableScroll()
}
