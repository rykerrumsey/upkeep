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
  document.querySelector('#delete-car-button').addEventListener('click', this.onRemoveClick.bind(this))
  document.querySelector('#search-cars').addEventListener('keyup', this._handleSearchKeyup.bind(this))
  // document.querySelector('#sorter').addEventListener('change', this.onSortChange.bind(this));
  // document.querySelector('#filterer').addEventListener('change', this.onFilterChange.bind(this));
};

// member function of grid that removes all the entries from the shuffle item array
Grid.prototype.removeAllItems = function() {
  let collection = []

  this.shuffle.items.forEach((item) => {
    collection.push(item.element)
  })

  this.shuffle.remove(collection)
}

Grid.prototype.removeOneCar = function(id) {
  let car = document.querySelector(`[data-id='${id}']`)
  console.log(car)
  this.shuffle.remove([car])
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
    car["urgency"] = "low"
    car["date"] = "Jan 8 2018"
    car["id"] = 124355

    let element = displayControl(car)

    this.element.prepend(element)
    this.shuffle.add([element])
  })
}

Grid.prototype.hideLoader = function() {
  let loaderElement = document.getElementById('loader')
  loaderElement.style.display = "none"
}

Grid.prototype.onAppendCar = function (elements) {
  elements.forEach(function (element) {
    this.shuffle.element.appendChild(element);
  }, this)

  // Tell shuffle elements have been appended.
  // It expects an array of elements as the parameter.
  this.shuffle.add(elements)
}

Grid.prototype.onRemoveClick = function (event) {
  // let element = event.target
  //
  // //send a request to the server to deleted
  // axios.delete('http://localhost:8000')
  // .then(function (response) {
  //   // the request was successful
  //   console.log(response)
  // })
  // .catch(function (error) {
  //   console.log(error)
  // })
  //
  // document.querySelector("#delete-car").classList.remove("is-active")
}

// Filter the shuffle instance by items with a title that matches the search input.
Grid.prototype._handleSearchKeyup = function (event) {
  var searchText = event.target.value.toLowerCase();
  // this.shuffle.filter(function (element, shuffle) {
  //   var titleElement = element.querySelector('.car__make');
  //   var titleText = titleElement.textContent.toLowerCase().trim();
  //
  //   return titleText.indexOf(searchText) !== -1;
  // });
};
