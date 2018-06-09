import './scss/main.scss'
import 'bulma/bulma.sass'

import Shuffle from 'shufflejs'

var element = document.querySelector('.grid');
var sizer = element.querySelector('.sizer-element');

var shuffleInstance = new Shuffle(element, {
  itemSelector: '.vehicle-box',
  sizer: sizer // could also be a selector: '.my-sizer-element'
});
