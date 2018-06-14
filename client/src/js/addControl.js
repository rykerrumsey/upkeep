// the add control should end up looking like the html below
import { disableScroll, enableScroll, closeModal} from './utils'
import { addCar } from './requests'

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
  content.onclick = _newCarForm
  content.appendChild(icon)
  content.appendChild(document.createElement('BR'))
  content.appendChild(label)

  let addUi = document.createElement('DIV')
  addUi.classList.add("vehicle-box")
  addUi.appendChild(content)

  return addUi
}

function _newCarForm() {
  let add = document.getElementById('add-car')
  add.classList.add("is-active")
  document.getElementById('add-cancel-button').addEventListener('click', closeModal.bind(this))
  document.getElementById('add-close-button').addEventListener('click', closeModal.bind(this))
  document.getElementById('add-submit-button').addEventListener('click', _sendAddRequest)
  disableScroll()
}

// get all the cars from the server and reset form and close modal
async function _sendAddRequest(event) {
  let form = document.getElementById('addCar')
  let formData = new FormData(form)

  try {
    const response = await addCar(formData)

    // implement notification for success
    console.log(response)
  } catch(error) {
    console.error(error)
  }

  // reset the form for next time
  form.reset()

  // close the model
  closeModal(event)

  //reload all the cars into the new ui
  grid.addAllCars()
}
