import { disableScroll } from './utils'
import Modal from './modal'

export default function displayControl(data) {
  let deleteIcon = document.createElement('I')
  deleteIcon.classList.add("fas", "fa-trash-alt", "fa-lg")

  let editIcon = document.createElement('I')
  editIcon.classList.add("fas", "fa-edit", "fa-lg")

  let boxDelete = document.createElement('DIV')
  boxDelete.classList.add("vehicle-box-delete")
  boxDelete.setAttribute("id", data._id.$oid)
  boxDelete.onclick = _deleteCarForm
  boxDelete.appendChild(deleteIcon)

  let boxEdit = document.createElement('DIV')
  boxEdit.onclick = _editCarForm
  boxEdit.classList.add("vehicle-box-edit")
  boxEdit.setAttribute("data", JSON.stringify(data))
  boxEdit.appendChild(editIcon)

  let make = data.make.toString()

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
  boxData.appendChild(_createCarElement('model', data.model))
  boxData.appendChild(_createCarElement('year', data.year))
  boxData.appendChild(_createCarElement('fuel', data.type))
  boxData.appendChild(_createCarElement('odometer', data.options.odometer))

  let boxTop = document.createElement('DIV')
  boxTop.classList.add("vehicle-box-top")
  boxTop.appendChild(boxDelete)
  boxTop.appendChild(boxEdit)
  boxTop.appendChild(boxData)

  let boxBottom = document.createElement('DIV')
  boxBottom.classList.add("vehicle-box-bottom")

  switch(data.urgency) {
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

  let filterAttribute = "\[\'" + data.urgency + "\'\]"
  // set data attributes
  displayUi.setAttribute('data-groups', filterAttribute)
  displayUi.setAttribute('data-id', data._id.$oid)
  displayUi.setAttribute('data-urgency', data.urgency)
  displayUi.setAttribute('data-date-added', data.dateCreated.date)
  displayUi.setAttribute('data-fuel-type', data.type)

  return displayUi
}

function _deleteCarForm(event) {
  // generate a new delete modal
  let data = event.currentTarget.getAttribute("id")
  let type = "delete"

  new Modal(type, JSON.stringify(data))

  disableScroll()
}

function _editCarForm(event) {
  // generate a new edit modal
  let data = event.currentTarget.getAttribute("data")

  let type = "edit"
  new Modal(type, data)

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
