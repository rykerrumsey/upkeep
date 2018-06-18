import Shuffle from 'shufflejs'

import addControl from './addControl'
import displayControl from './displayControl'
import { getCars } from './requests'

export default function Grid(element) {
  this.element = element
  this.initShuffle()
  this.setupEvents()
}

Grid.prototype.initShuffle = function () {

  // add one element to hold the size of grid window -> possible bug somewhere needs to be fixed
  this.element.appendChild(addControl())

  // initialize the shuffle.js object
  this.shuffle = new Shuffle(this.element, {
    itemSelector: '.vehicle-box'
  })
}

Grid.prototype.setupEvents = function () {
  document.querySelector('#search-cars').addEventListener('keyup', this._handleSearchKeyup.bind(this))
  document.querySelector('#sort-cars').addEventListener('change', this.onSortChange.bind(this))
  document.querySelector('#filter-cars').addEventListener('change', this.onFilterChange.bind(this))
};

Grid.prototype.toggleActiveClasses = function (event) {
  // Add and remove `active` class from buttons.
  var buttons = Array.from(event.currentTarget.children)
  buttons.forEach(function (button) {
    if (button.querySelector('input').value === event.target.value) {
      button.classList.add('is-active')
    } else {
      button.classList.remove('is-active')
    }
  })
}

// functions that perform the sort on all cars
Grid.prototype.onSortChange = function (event) {
  this.toggleActiveClasses(event)
  this.sortBy(event.target.value)
}

Grid.prototype.sortByUrgency = function (element) {
  let urgency = element.getAttribute("data-urgency")
  let sortModifier = 'j'

  // always make the add control the last element on urgency sort
  if(urgency === 'all') {
    urgency = 'zz'
  }

  // rename medium so it sorts into the correct order
  if(urgency === 'medium') {
    urgency = sortModifier.concat(urgency)
  }

  return urgency
}

Grid.prototype.sortByFuelType = function (element) {
  return element.getAttribute("data-fuel-type")
}

Grid.prototype.sortByDateAdded = function (element) {
  return element.getAttribute("data-date-added")
}

Grid.prototype.sortBy = function (value) {
  let sortOptions;

  if (value === 'urgency') {
    sortOptions = {
      by: this.sortByUrgency
    }
  } else if (value === 'fuel-type') {
    sortOptions = {
      by: this.sortByFuelType
    }
  } else if (value === 'date-added') {
    sortOptions = {
      reverse: true,
      by: this.sortByDateAdded
    }
  } else {
    sortOptions = {}
  }

  // Filter elements
  this.shuffle.sort(sortOptions);
};

// functions to perform the filter on the cars
Grid.prototype.onFilterChange = function (event) {
  this.toggleActiveClasses(event)
  this.filterBy(event.target.value)
}

Grid.prototype.getHighUrgency = function (element) {
  let dataTag = element.getAttribute('data-urgency')
  return (dataTag === "high" || dataTag === "all")
}

Grid.prototype.getMediumUrgency = function (element) {
  let dataTag = element.getAttribute('data-urgency')
  return (dataTag === "medium" || dataTag === "all")
}

Grid.prototype.getLowUrgency = function (element) {
  let dataTag = element.getAttribute('data-urgency')
  return (dataTag === "low" || dataTag === "all")
}

Grid.prototype.filterBy = function (value) {
  let filterBy
  let _this = this

  switch(value) {
    case 'all':
      filterBy = Shuffle.ALL_ITEMS
      break
    case 'high':
      filterBy = (element) => _this.getHighUrgency(element)
      break
    case 'medium':
      filterBy = (element) => _this.getMediumUrgency(element)
      break
    case 'low':
      filterBy = (element) => _this.getLowUrgency(element)
      break
  }

  this.shuffle.filter(filterBy)
}

// update tracker number
Grid.prototype._updateCount = async function (value) {
  let data = await getCars()
  let amount = data.length

  let counter = document.getElementById('counter')
  counter.textContent = amount
}

// member function of grid that removes all the entries from the shuffle item array
Grid.prototype.removeAllItems = function() {
  let collection = []

  this.shuffle.items.forEach((item) => {
    collection.push(item.element)
  })

  this.shuffle.remove(collection)
  this._updateCount()
}

Grid.prototype.removeOneCar = function(id) {
  let car = document.querySelector(`[data-id='${id}']`)
  this.shuffle.remove([car])
  this._updateCount()
}

// member function to add cars to to the grid element
Grid.prototype.addAllCars = async function() {

  // remove loader before adding cars to the ui
  this.hideLoader()

  // remove existing cars from dom and shuffle array
  this.removeAllItems()

  // add the addControl to the dom first
  let add = addControl()
  this.element.appendChild(add)
  this.shuffle.add([add])

  // wait for data to resolve from promise before adding cars to the ui
  let data = await getCars()
  data.forEach((car) => {
    let element = displayControl(car)

    this.element.prepend(element)
    this.shuffle.add([element])
  })

  this._updateCount()
}

// functions to handle search input
Grid.prototype._handleSearchKeyup = function (event) {
  let searchText = event.target.value.toLowerCase()

  this.shuffle.filter(function (element) {
    // make sure the add control is never filtered out by search
    if(element.getAttribute("data-urgency") === 'all')
      return true;

    let titleElement = element.querySelector('.car-make')
    let titleText = titleElement.textContent.toLowerCase().trim()

    return titleText.indexOf(searchText) !== -1
  })
}

// hide the loading element after content has been recieved
Grid.prototype.hideLoader = function() {
  let loaderElement = document.getElementById('loader')
  loaderElement.style.display = "none"
}
