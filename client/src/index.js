// import required css files for concatenation
import './scss/main.scss'
import 'bulma/bulma.sass'

// meat and potatoes of the ui
import './js/icons'
import axios from 'axios'
import Grid from './js/grid'
import addControl from './js/addControl'
//import displayUiControl from './js/displayUiControl'

window.onload = function() {
  let data = [];

  axios.get('http://localhost:8000')
  .then(function (response) {
    response.data.forEach((element) => {
      data.push(element)
    })
    addCarsToDom(data)
  })
  .catch(function (error) {
    console.log(error)
  })
}

function addCarsToDom(data) {
  // remove loader once cars are being loaded to ui
  let loaderElement = document.getElementById('loader')
  loaderElement.style.display = "none"

  let gridElement = document.getElementById('grid')
  gridElement.prepend(addControl())

  window.grid = new Grid(gridElement)

  // add cars to shuffle object
  data.forEach((car) => {

  })
}
