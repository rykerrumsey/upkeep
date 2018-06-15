import { enableScroll, insertBefore } from './utils'
import { addCar, deleteCar, updateCar } from './requests'

export default function Modal(type, id) {
  this.type = type
  this.id = id
  this.show()
}

// public methods for Modal object
Modal.prototype.show = function() {
  this.element = this._buildModal()

  let after = document.querySelector('nav.navbar');

  this.element.classList.add("is-active")

  insertBefore(this.element, after)
}

// private methods for Modal object
Modal.prototype._closeModal = function() {
  let modal = document.getElementsByClassName("modal")[0]
  modal.classList.remove("is-active")
  modal.remove()
  enableScroll()
}

// builds the delete modal from scratch
Modal.prototype._buildModal = function() {
  switch(this.type) {
    case 'delete':
      return this._deleteModal()
    case 'add':
      return this._addModal()
    default:
  }
}

// generates a base modal to build from, returns an element
Modal.prototype._getBaseModal = function(title) {

  // these variables belong to the header of the modal
  let modalCardHeader = document.createElement('HEADER')
  modalCardHeader.classList.add("modal-card-head")

  let p = document.createElement("P")
  p.classList.add("modal-card-title")
  p.textContent = title

  // these variables belong to the body of the modal
  let button = document.createElement("BUTTON")
  button.classList.add("delete")
  button.setAttribute("aria-label", "close")
  button.onclick = this._closeModal

  modalCardHeader.appendChild(p)
  modalCardHeader.appendChild(button)

  let modalCardBody = document.createElement('SECTION')
  modalCardBody.classList.add("modal-card-body")

  // these variables belong to the footer of the modal
  let emptyDiv = document.createElement("DIV")
  emptyDiv.setAttribute("id", "form-spacer")

  let cancelButton = document.createElement("BUTTON")
  cancelButton.classList.add("button")
  cancelButton.setAttribute("id", "cancel")
  cancelButton.textContent = "Cancel"
  cancelButton.onclick = this._closeModal

  let modalCardFooter = document.createElement('FOOTER')
  modalCardFooter.classList.add("modal-card-foot")
  modalCardFooter.appendChild(emptyDiv)
  modalCardFooter.appendChild(cancelButton)

  let modalCard = document.createElement('DIV')
  modalCard.classList.add("modal-card")
  modalCard.appendChild(modalCardHeader)
  modalCard.appendChild(modalCardBody)
  modalCard.appendChild(modalCardFooter)

  let modalBackground = document.createElement('DIV')
  modalBackground.classList.add("modal-background")

  let modal = document.createElement("DIV")
  modal.setAttribute("id", this.id);
  modal.classList.add("modal")
  modal.appendChild(modalBackground)
  modal.appendChild(modalCard)

  return modal
}

Modal.prototype._deleteModal = function() {

  let content =
  `
    <div class="warning">
      <i class="fas fa-exclamation-circle fa-3x"></i>
      <span>Are you sure you want to delete this car?</span>
    </div>
  `
  // add content to base Modal
  let title = "Delete Car"
  let modal = this._getBaseModal(title)
  let modalBody = modal.getElementsByTagName("SECTION")[0]
  modalBody.innerHTML = content

  let deleteButton = document.createElement("BUTTON")
  deleteButton.classList.add("button", "is-danger", "submit-button-width")
  deleteButton.textContent = "Delete"
  deleteButton.onclick = _sendDeleteRequest

  let after = modal.querySelector("#cancel")
  insertBefore(deleteButton, after)

  var close = this._closeModal
  var id = this.id

  async function _sendDeleteRequest(event) {
    try {
      const response = await deleteCar(id)

      // implement notification for success

      console.log(response)
    } catch(error) {
      console.error(error)
    }

    // close the model
    close()

    //remove the car from the ui
    grid.removeOneCar(id)
  }

  return modal
}

Modal.prototype._addModal = function () {
  // never do this!!!!!
  // implemented for quickness
  let content =
  `<form id="addCar">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Type</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select">
              <select name="type">
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
                <option value="atomic">Atomic</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">VIN #</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-fullwidth">
            <input name="vin" class="input" type="text" placeholder="VIN Number">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Car</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control" style="width: auto;">
            <input name="make" class="input" type="text" placeholder="Make">
          </div>
        </div>
        <div class="field">
          <div class="control" style="width: auto">
            <input name="model" class="input" type="text" placeholder="Model">
          </div>
        </div>
        <div class="field">
          <div class="control" style="width: auto">
            <input name="year" class="input" type="text" placeholder="Year">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Odometer</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control" style="width: auto">
            <input name="odometer" class="input" type="text" placeholder="KM's">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Last Oil Change</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control" style="width: auto; margin-top: 10px;">
            <input name="lastchanged" class="input" type="text" placeholder="KM's">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Options</label>
      </div>
      <div class="field-body">
        <p style="line-height: 30px;">Coming Soon...</p>
      </div>
    </div>
  </form>`

  let title = "Add Car"
  let modal = this._getBaseModal(title)

  let addButton = document.createElement("BUTTON")
  addButton.classList.add("button", "is-success", "submit-button-width")
  addButton.textContent = "Add"
  addButton.onclick = _sendAddRequest

  let modalBody = modal.getElementsByTagName("SECTION")[0]
  modalBody.innerHTML = content

  let after = modal.querySelector("#cancel")
  insertBefore(addButton, after)

  var id = this.id
  var close = this._closeModal

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
    close()

    //reload all the cars into the new ui
    grid.addAllCars()
  }

  return modal
}


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
