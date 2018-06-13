// this is the html we are trying to create

// <div class="vehicle-box">
//   <div onclick="addNewCar()" class="vehicle-box-add">
//     <i class="fas fa-plus fa-6x"></i><br/>
//     <span><h1 style="color: #4a4a4a;" class="title">Add</span>
//   </div>
// </div>

export default function addUiControl() {
  let icon = document.createElement('I')
  icon.classList.add("fas", "fa-plus", "fa-6x")

  let h1 = document.createElement('H1')
  h1.classList.add("title")
  h1.style.color = "#4a4a4a"
  h1.textContent = "Add"

  let label = document.createElement('SPAN')
  label.appendChild(h1)

  let content = document.createElement('DIV')
  content.classList.add("vehicle-box-add")
  content.onclick = addNewCar
  content.appendChild(icon)
  content.appendChild(document.createElement('BR'))
  content.appendChild(label)

  let addUi = document.createElement('DIV')
  addUi.classList.add("vehicle-box")
  addUi.appendChild(content)

  return addUi
}

function addNewCar() {
  let add = document.getElementById('add-car')
  add.classList.add("is-active")
}
