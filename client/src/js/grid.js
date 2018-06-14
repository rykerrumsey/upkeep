import Shuffle from 'shufflejs'
import axios from 'axios'

var sizer = document.getElementsByClassName('.sizer-element')

export default function Grid(element) {
  this.element = element
  this.initShuffle()
  this.setupEvents()
}

Grid.prototype.initShuffle = function () {
  this.shuffle = new Shuffle(this.element, {
    itemSelector: '.vehicle-box',
    sizer: sizer
  })
}

Grid.prototype.setupEvents = function () {
  document.querySelector('#delete-car-button').addEventListener('click', this.onRemoveClick.bind(this))
  document.querySelector('#search-cars').addEventListener('keyup', this._handleSearchKeyup.bind(this))
  // document.querySelector('#sorter').addEventListener('change', this.onSortChange.bind(this));
  // document.querySelector('#filterer').addEventListener('change', this.onFilterChange.bind(this));
};

Grid.prototype.onAppendCar = function (elements) {
  elements.forEach(function (element) {
    this.shuffle.element.appendChild(element);
  }, this)

  // Tell shuffle elements have been appended.
  // It expects an array of elements as the parameter.
  this.shuffle.add(elements)
}

Grid.prototype.onRemoveClick = function (event) {
  let element = event.target

  //send a request to the server to deleted
  axios.delete('http://localhost:8000')
  .then(function (response) {
    // the request was successful
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })

  document.querySelector("#delete-car").classList.remove("is-active")
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
