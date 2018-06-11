// import required css files for concatenation
import './scss/main.scss'
import 'bulma/bulma.sass'

// meat and potatoes of the ui
import './js/icons'
import Shuffle from 'shufflejs'
import axios from 'axios'

var element = document.querySelector('.grid');
var sizer = element.querySelector('.sizer-element');

// initialize the shuffle object
var shuffleInstance = new Shuffle(element, {
  itemSelector: '.vehicle-box',
  sizer: sizer
});
