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
  document.querySelector('#delete-car-button').addEventListener('click', this.onRemoveClick.bind(this));
  // document.querySelector('#sorter').addEventListener('change', this.onSortChange.bind(this));
  // document.querySelector('#filterer').addEventListener('change', this.onFilterChange.bind(this));
};

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
