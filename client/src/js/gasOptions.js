import { setSelect } from './utils'
import { inputControl, createOption } from './formElements'

// This generates the options for fuel type : GAS
export default function gasOptions(options = null) {
  // use create function to create each form element
  let octane = createOption("Octane %", octaneControl())
  octane.classList.add('options-selected')

  let select = octane.querySelector("SELECT")

  let price = createOption("Gas Price", inputControl("gasPrice", "$CAD per Litre", false, true))
  price.classList.add('options-selected')

  let lastChanged = createOption("Last Oil Changed", inputControl("lastOilChange", "Enter kilometers since last oil change", true, true))
  lastChanged.classList.add('options-selected')

  let fuelMileage = createOption("Fuel Mileage", inputControl("fuelMileage", "Litres / 100km", true, true))
  fuelMileage.classList.add('options-selected')

  if(options != null) {
    setSelect(select, options.octanePercentage)
    price.querySelector("INPUT").value = options.gasPrice
    lastChanged.querySelector("INPUT").value = options.lastOilChange
    fuelMileage.querySelector("INPUT").value = options.fuelMileage
  }

  return [octane, price, lastChanged, fuelMileage]
}

function octaneControl() {
  // here is the drop-down for the octane percentage selector
  let optionValues = document.createElement("SELECT")
  optionValues.setAttribute("name", "options[octanePercentage]")

  let select = document.createElement("DIV")
  select.classList.add("select")
  select.appendChild(optionValues)

  let regular = document.createElement("option")
  let premium = document.createElement("option")
  let superPremium = document.createElement("option")

  regular.value = "95"
  regular.text = "95"

  premium.value = "97"
  premium.text = "97"

  superPremium.value = "99"
  superPremium.text = "99"

  optionValues.add(regular)
  optionValues.add(premium)
  optionValues.add(superPremium)

  let octaneControl = document.createElement("DIV")
  octaneControl.classList.add("control")
  octaneControl.appendChild(select)

  let field = document.createElement("DIV")
  field.classList.add("field", "is-expanded")
  field.appendChild(octaneControl)

  return field
}
