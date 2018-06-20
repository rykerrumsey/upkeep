import gasOptions from './gasOptions'
import electricOptions from './electricOptions'
import atomicOptions from './atomicOptions'

export function inputControl(name, placeholder, isLarge = false, isOption = false, isGroup = false) {
  let input = document.createElement("INPUT")
  input.setAttribute("placeholder", placeholder)
  input.setAttribute("type", "text")
  input.classList.add("input")

  if(isOption) {
    input.setAttribute("name", "options[" + name + "]")
  } else {
    input.setAttribute("name", name)
  }

  let inputControl = document.createElement("DIV")
  inputControl.classList.add("control")
  inputControl.appendChild(input)

  if(isGroup) {
    inputControl.style = "width: auto;"
  }

  if(isLarge) {
    inputControl.classList.add("two-lines")
  }

  let field = document.createElement("DIV")
  field.classList.add("field", "is-expanded")
  field.appendChild(inputControl)

  return field
}

export function fuelControl(inputs) {
  // here is the drop-down for the fuel type selector
  let optionValues = document.createElement("SELECT")
  optionValues.setAttribute("name", "type")
  optionValues.setAttribute("id", "fuel-type")

  let select = document.createElement("DIV")
  select.classList.add("select")
  select.appendChild(optionValues)

  let electric = document.createElement("option")
  let gas = document.createElement("option")
  let atomic = document.createElement("option")

  gas.value = "gas"
  gas.text = "Gas"

  electric.value = "electric"
  electric.text = "Electric"

  atomic.value = "atomic"
  atomic.text = "Atomic"

  optionValues.add(gas)
  optionValues.add(electric)
  optionValues.add(atomic)

  let fuelControl = document.createElement("DIV")
  fuelControl.classList.add("control")
  fuelControl.appendChild(select)

  let field = document.createElement("DIV")
  field.classList.add("field", "is-expanded")
  field.appendChild(fuelControl)

  return field
}

export function onFuelChange(event) {
  //hide options
  let oldOptions = document.querySelectorAll(".options-selected")
  oldOptions.forEach((element) => {
    element.parentNode.removeChild(element);
  })

  switch(event.target.value) {
    case 'gas':
      document.querySelector('form').append(...gasOptions())
      break
    case 'electric':
      document.querySelector('form').append(...electricOptions())
      break
    case 'atomic':
      document.querySelector('form').append(...atomicOptions())
      break
    default:
      console.log("Fuel selection is not available.")
  }
}

export function carControl(inputs) {
  let field = document.createElement("DIV")
  field.classList.add("field")

  for(let i = 0; i < inputs.length; i++) {
    let placeholder = inputs[i].toString()
    field.appendChild(inputControl(inputs[i], (placeholder.charAt(0).toUpperCase() + placeholder.slice(1)), false, true))
  }

  return field
}

export function createOption(labelString, controlElement = null) {
  let label = document.createElement("LABEL")
  label.classList.add("label")
  label.textContent = labelString

  let fieldLabel = document.createElement("DIV")
  fieldLabel.classList.add("field-label", "is-normal")
  fieldLabel.appendChild(label)

  let fieldBody = document.createElement("DIV")
  fieldBody.classList.add("field-body")

  if(controlElement) {
    fieldBody.appendChild(controlElement)
  }

  let fullOption = document.createElement("DIV")
  fullOption.classList.add("field", "is-horizontal")
  fullOption.appendChild(fieldLabel)
  fullOption.appendChild(fieldBody)

  return fullOption
}
