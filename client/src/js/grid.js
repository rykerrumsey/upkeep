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
  document.querySelector('#sort-cars').addEventListener('change', this.onSortChange.bind(this));
  //document.querySelector('#filter-cars').addEventListener('change', this.onFilterChange.bind(this));
};

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

// hide the loading element after content has been recieved
Grid.prototype.hideLoader = function() {
  let loaderElement = document.getElementById('loader')
  loaderElement.style.display = "none"
}

Grid.prototype.toggleActiveClasses = function (event) {
  // Add and remove `active` class from buttons.
  var buttons = Array.from(event.currentTarget.children)
  buttons.forEach(function (button) {
    if (button.querySelector('input').value === event.target.value) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })
}

Grid.prototype.onSortChange = function (event) {
  console.log(event)
  //this.toggleActiveClasses(event)
  console.log(event.target.value)
  this.sortBy(event.target.value)
};

Grid.prototype.sortBy = function (value) {
  let sortOptions

  if (value === 'urgency') {
    sortOptions = {
      reverse: true
    }
  } else if (value === 'date-added') {
    sortOptions = {

    }
  } else {
    sortOptions = {}
  }

  // Filter elements
  this.shuffle.sort(sortOptions)
};


// Grid.prototype.onFilterChange = function (event) {
//   this.toggleActiveClasses(event);
//   this.filterBy(event.target.value);
// };
//
// Grid.prototype.filterBy = function (value) {
//   var filterBy
//   var _this = this
//
//   if (value === 'all') {
//     filterBy = Shuffle.ALL_ITEMS
//   } else if (value === 'odd-reviews') {
//     filterBy = function (element) {
//       return _this.getReviews(element) % 2 === 1
//     };
//   } else {
//     filterBy = function (element) {
//       return _this.getReviews(element) % 2 === 0
//     };
//   }
//
//   this.shuffle.filter(filterBy);
// };

// filter the shuffle instance by items with a title that matches the search input.
Grid.prototype._handleSearchKeyup = function (event) {
  var searchText = event.target.value.toLowerCase();
  // this.shuffle.filter(function (element, shuffle) {
  //   var titleElement = element.querySelector('.car__make');
  //   var titleText = titleElement.textContent.toLowerCase().trim();
  //
  //   return titleText.indexOf(searchText) !== -1;
  // });
};
