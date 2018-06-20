import { inputControl, createOption } from './formElements'

// This generates the options for fuel type : ELECTRIC
export default function electricOptions(options = null) {
  // use create function to create each form element
  let totalHours = createOption("Total Hours", inputControl("totalHours", "Enter total battery hours", false, true))
  totalHours.classList.add('options-selected')

  let maxHours = createOption("Max Hours", inputControl("maxHours", "Enter maximum battery hours", true, true))
  maxHours.classList.add('options-selected')

  let fuelMileage = createOption("Fuel Mileage", inputControl("fuelMileage", "Litres / 100km", true, true))
  fuelMileage.classList.add('options-selected')

  if(options) {
    totalHours.querySelector("INPUT").value = options.totalHours
    maxHours.querySelector("INPUT").value = options.maxHours
    fuelMileage.querySelector("INPUT").value = options.fuelMileage
  }

  return [totalHours, maxHours, fuelMileage]
}
