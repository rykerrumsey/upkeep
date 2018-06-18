export function atomicOptions() {
  let halfLife = createOption("Half-life", inputControl("halfLife", "Days until half-life"))
  halfLife.classList.add('options-selected')

  let totalDays = createOption("Total Days", inputControl("totalDays", "Number of days ran"))
  totalDays.classList.add('options-selected')

  let isotope = createOption("Core Type", coreControl())
  isotope.classList.add('options-selected')

  let canWarpSpeed = createOption("Warp Speed Capable", warpControl())
  canWarpSpeed.classList.add('options-selected')

  return [halfLife, totalDays, isotope, canWarpSpeed]
}

function warpControl() {
  let radioNo = document.createElement("INPUT")
  radioNo.setAttribute("type", "radio")
  radioNo.setAttribute("name", "warpRadio")
  radioNo.setAttribute("value", false)
  radioNo.checked = true

  let radioYes = document.createElement("INPUT")
  radioYes.setAttribute("type", "radio")
  radioYes.setAttribute("name", "warpRadio")
  radioYes.setAttribute("value", true)

  let no = document.createElement("LABEL")
  no.classList.add("radio")
  no.appendChild(radioNo)
  no.insertAdjacentHTML("beforeend", "No")

  let yes = document.createElement("LABEL")
  yes.classList.add("radio")
  yes.appendChild(radioYes)
  yes.insertAdjacentHTML("beforeend", "Yes")

  let warpControl = document.createElement("DIV")
  warpControl.classList.add("control")
  warpControl.appendChild(no)
  warpControl.appendChild(yes)

  let field = document.createElement("DIV")
  field.classList.add("field")
  field.appendChild(warpControl)

  return field
}

function coreControl() {
  // here is the drop-down for the octane percentage selector
  let optionValues = document.createElement("SELECT")
  optionValues.setAttribute("name", "coreType")

  let select = document.createElement("DIV")
  select.classList.add("select")
  select.appendChild(optionValues)

  let crystal = document.createElement("option")
  let vallium = document.createElement("option")
  let fatBoy = document.createElement("option")

  crystal.value = "crystal"
  crystal.text = "Crystal"

  vallium.value = "vallium"
  vallium.text = "Vallium"

  fatBoy.value = "fatBoy";
  fatBoy.text = "Fat Boy";

  optionValues.add(crystal)
  optionValues.add(vallium)
  optionValues.add(fatBoy)

  let coreControl = document.createElement("DIV")
  coreControl.classList.add("control")
  coreControl.appendChild(select)

  let field = document.createElement("DIV")
  field.classList.add("field", "is-expanded")
  field.appendChild(coreControl)

  return field
}

export function electricOptions() {
  // use create function to create each form element
  let totalHours = createOption("Total Hours", inputControl("totalHours", "Enter total battery hours"))
  totalHours.classList.add('options-selected')

  let maxHours = createOption("Max Hours", inputControl("maxHours", "Enter maximum battery hours", true))
  maxHours.classList.add('options-selected')

  let fuelMileage = createOption("Fuel Mileage", inputControl("fuelMileage", "Litres / 100km", true))
  fuelMileage.classList.add('options-selected')

  return [totalHours, maxHours, fuelMileage]
}

export function gasOptions() {
  // use create function to create each form element
  let octane = createOption("Octane %", octaneControl())
  octane.classList.add('options-selected')

  let price = createOption("Gas Price", inputControl("gasPrice", "$CAD per Litre"))
  price.classList.add('options-selected')

  let lastChanged = createOption("Last Oil Changed", inputControl("lastOilChange", "Enter kilometers since last oil change", true))
  lastChanged.classList.add('options-selected')

  let fuelMileage = createOption("Fuel Mileage", inputControl("fuelMileage", "Litres / 100km", true))
  fuelMileage.classList.add('options-selected')

  return [octane, price, lastChanged, fuelMileage]
}

function octaneControl() {
  // here is the drop-down for the octane percentage selector
  let optionValues = document.createElement("SELECT")
  optionValues.setAttribute("name", "octanePercentage")

  let select = document.createElement("DIV")
  select.classList.add("select")
  select.appendChild(optionValues)

  let regular = document.createElement("option")
  let premium = document.createElement("option")
  let superPremium = document.createElement("option")

  regular.value = "95"
  regular.text = "Regular"

  premium.value = "97"
  premium.text = "Premium"

  superPremium.value = "99";
  superPremium.text = "Super Premium";

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

export function inputControl(name, placeholder, isLarge = false, isGroup = false) {
  let input = document.createElement("INPUT")
  input.setAttribute("name", name)
  input.setAttribute("placeholder", placeholder)
  input.setAttribute("type", "text")
  input.classList.add("input")

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
  fullOption.classList.add("field", "is-horizontal") //, "option-list"
  fullOption.appendChild(fieldLabel)
  fullOption.appendChild(fieldBody)

  return fullOption
}
