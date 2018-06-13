import Shuffle from 'shufflejs'
import addUiControl from './addUiControl'

var sizer = document.getElementsByClassName('.sizer-element')

export default function Grid(element) {
  this.element = element
  this.initShuffle()
  //this.setupEvents()
}

Grid.prototype.initShuffle = function () {
  this.shuffle = new Shuffle(this.element, {
    itemSelector: '.vehicle-box',
    sizer: sizer
  })
}

// Grid.prototype.setupEvents = function () {
//   document.querySelector('#append').addEventListener('click', this.onAppendBoxes.bind(this));
//   document.querySelector('#prepend').addEventListener('click', this.onPrependBoxes.bind(this));
//   document.querySelector('#randomize').addEventListener('click', this.onRandomize.bind(this));
//   document.querySelector('#remove').addEventListener('click', this.onRemoveClick.bind(this));
//   document.querySelector('#sorter').addEventListener('change', this.onSortChange.bind(this));
//   document.querySelector('#filterer').addEventListener('change', this.onFilterChange.bind(this));
// };
