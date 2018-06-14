// the display control should end up looking like the below html

// <div class="vehicle-box">
//   <div class="vehicle-box-top">
//     <div onclick="deleteCar()" class="vehicle-box-delete">
//       <i class="fas fa-trash-alt fa-lg"></i>
//     </div>
//     <div onclick="editCar()" class="vehicle-box-edit">
//       <i class="fas fa-edit fa-lg"></i>
//     </div>
//   </div>
//   <div class="vehicle-box-bottom"></div>

import { disableScroll, enableScroll, closeModal } from './utils'

export default function addControl() {

  let deleteIcon = document.createElement('I')
  deleteIcon.classList.add("fas", "fa-trash-alt", "fa-lg")

  let editIcon = document.createElement('I')
  editIcon.classList.add("fas", "fa-edit", "fa-lg")

  let boxDelete = document.createElement('DIV')
  boxDelete.onclick = deleteCar
  boxDelete.classList.add("vehicle-box-delete")
  boxDelete.appendChild(deleteIcon)

  let boxEdit = document.createElement('DIV')
  boxEdit.onclick = editCar
  boxEdit.classList.add("vehicle-box-edit")
  boxEdit.appendChild(editIcon)

  let boxTop = document.createElement('DIV')
  boxTop.classList.add("vehicle-box-top")
  boxTop.appendChild(boxDelete)
  boxTop.appendChild(boxEdit)

  let boxBottom = document.createElement('DIV')
  boxBottom.classList.add("vehicle-box-bottom")

  let displayUi = document.createElement('DIV')
  displayUi.classList.add("vehicle-box")
  displayUi.appendChild(boxTop)
  displayUi.appendChild(boxBottom)

  return displayUi
}

function deleteCar() {
  let trash = document.getElementById('delete-car')
  trash.classList.add("is-active")
  document.getElementById('delete-cancel-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('delete-close-button').addEventListener('click', closeModal.bind(this));
  disableScroll()
}

function editCar() {
  let edit = document.getElementById('edit-car')
  edit.classList.add("is-active")
  document.getElementById('edit-cancel-button').addEventListener('click', closeModal.bind(this));
  document.getElementById('edit-close-button').addEventListener('click', closeModal.bind(this));
  disableScroll()
}
