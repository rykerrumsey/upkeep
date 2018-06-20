import { inputControl, createOption } from './formElements'
import { setSelect } from './utils'

// This generates the options for fuel type : ATOMIC
export default function atomicOptions(options = null) {
  let halfLife = createOption("Half-life", inputControl("halfLife", "Days until half-life", false, true))
  halfLife.classList.add('options-selected')

  let totalDays = createOption("Total Days", inputControl("totalDays", "Number of days ran", false, true))
  totalDays.classList.add('options-selected')

  let coreType = createOption("Core Type", coreControl())
  let coreSelect = coreType.querySelector("SELECT")
  coreType.classList.add('options-selected')

  let canWarpSpeed = createOption("Warp Speed Capable", warpControl())
  canWarpSpeed.classList.add('options-selected')

  if(options) {
    halfLife.querySelector("INPUT").value = options.halfLife
    totalDays.querySelector("INPUT").value = options.totalDays
    setSelect(coreSelect, options.coreType)

    if(options.warpRadio == "true") {
      canWarpSpeed.querySelector("input[value=true]").checked = true
    } else {
      canWarpSpeed.querySelector("input[value=false]").checked = true
    }
  }

  return [halfLife, totalDays, coreType, canWarpSpeed]
}

function warpControl() {
  let radioNo = document.createElement("INPUT")
  radioNo.setAttribute("type", "radio")
  radioNo.setAttribute("name", "options[warpRadio]")
  radioNo.setAttribute("value", false)
  radioNo.checked = true

  let radioYes = document.createElement("INPUT")
  radioYes.setAttribute("type", "radio")
  radioYes.setAttribute("name", "options[warpRadio]")
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
  optionValues.setAttribute("name", "options[coreType]")

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
