// the display control should end up looking like the below html
import { disableScroll, enableScroll, closeModal } from './utils'
import { deleteCar, updateCar } from './requests'
import Modal from './modal'
var currentData

export default function displayControl(data) {

  currentData = data

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
  boxData.appendChild(_createCarElement('odometer', data.odometer))

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

  return displayUi
}

function _deleteCarForm(event) {
  // generate a new delete modal
  let id = event.currentTarget.getAttribute("id")
  let type = "delete"

  new Modal(type, id)

  disableScroll()
}

function _editCarForm(event) {
  // generate a new delete modal
  let id = event.currentTarget.getAttribute("id")
  let type = "add"

  new Modal(type, id)

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

// async function _sendDeleteRequest(event) {
//   try {
//     console.log("this is the currentData.id var: " + currentData._id.$oid)
//     const response = await deleteCar(currentData._id.$oid)
//
//     // implement notification for success
//
//     console.log(response)
//   } catch(error) {
//     console.error(error)
//   }
//
//   // close the model
//   closeModal(event)
//
//   //reload all the cars into the new ui
//   grid.removeOneCar(currentData._id.$oid)
// }

// async function _sendEditRequest(event) {
//   let form = document.getElementById('editCar')
//   let formData = new FormData(form)
//
//   try {
//     const response = await updateCar(formData)
//
//     // implement notification for success
//     console.log(response)
//   } catch(error) {
//     console.error(error)
//   }
//
//   // reset the form for next time
//   form.reset()
//
//   // close the model
//   closeModal(event)
//
//   //reload all the cars into the new ui
//   grid.addAllCars()
// }
