// the display control should end up looking like the below html
import { disableScroll, enableScroll, closeModal } from './utils'

export default function addControl(car) {
  let deleteIcon = document.createElement('I')
  deleteIcon.classList.add("fas", "fa-trash-alt", "fa-lg")

  let editIcon = document.createElement('I')
  editIcon.classList.add("fas", "fa-edit", "fa-lg")

  let boxDelete = document.createElement('DIV')
  boxDelete.onclick = _deleteCarForm
  boxDelete.classList.add("vehicle-box-delete")
  boxDelete.appendChild(deleteIcon)

  let boxEdit = document.createElement('DIV')
  boxEdit.onclick = _editCarForm
  boxEdit.classList.add("vehicle-box-edit")
  boxEdit.appendChild(editIcon)

  let make = car.make.toString()

  if(make.length > 6) {
    make = make.slice(0, 5)
    make += "..."
  }

  let carMake = document.createElement('DIV')
  carMake.classList.add("car-make")
  carMake.textContent = make

  let boxData = document.createElement('DIV')
  boxData.classList.add("car-data")
  boxData.appendChild(carMake)
  boxData.appendChild(_createCarElement('model', car.model))
  boxData.appendChild(_createCarElement('year', car.year))
  boxData.appendChild(_createCarElement('fuel', car.type))
  boxData.appendChild(_createCarElement('odometer', car.odometer))

  let boxTop = document.createElement('DIV')
  boxTop.classList.add("vehicle-box-top")
  boxTop.appendChild(boxDelete)
  boxTop.appendChild(boxEdit)
  boxTop.appendChild(boxData)

  let boxBottom = document.createElement('DIV')
  boxBottom.classList.add("vehicle-box-bottom")

  switch(car.urgency) {
    case 'high':
      boxBottom.style.backgroundColor = "hsl(348, 100%, 61%)"
      break;
    case 'medium':
      boxBottom.style.backgroundColor = "hsl(48, 100%, 67%)"
      break;
    case 'low':
      boxBottom.style.backgroundColor = "hsl(141, 71%, 48%)"
      break;
    default:
  }

  let displayUi = document.createElement('DIV')
  displayUi.classList.add("vehicle-box")
  displayUi.appendChild(boxTop)
  displayUi.appendChild(boxBottom)

  return displayUi
}

function _deleteCarForm() {
  let trash = document.getElementById('delete-car')
  trash.classList.add("is-active")
  document.getElementById('delete-cancel-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('delete-close-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('delete-submit-button').addEventListener('click', _sendDeleteRequest)
  disableScroll()
}

function _editCarForm() {
  let edit = document.getElementById('edit-car')
  edit.classList.add("is-active")
  document.getElementById('edit-cancel-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('edit-close-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('edit-submit-button').addEventListener('click', _sendEditRequest)
  disableScroll()
}

function _createCarElement(label, data) {
  let labelElement = document.createElement('P')
  labelElement.classList.add("car-element-label")
  labelElement.textContent = label

  let dataElement = document.createElement('P')
  dataElement.classList.add("car-element-data")
  dataElement.textContent = data

  let container = document.createElement('DIV')
  container.classList.add("car-element-container")
  container.appendChild(labelElement)
  container.appendChild(dataElement)

  // return generated ui element
  return container
}

function _sendDeleteRequest() {
  
}

function _sendEditRequest() {

}
