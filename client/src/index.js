// import required css files for concatenation
import './scss/main.scss'
import 'bulma/bulma.sass'
import './js/icons'

// meat and potatoes of the ui
import Grid from './js/grid'

window.onload = function() {

  //initialze the shufflejs through the grid object
  let gridElement = document.getElementById('grid')
  window.grid = new Grid(gridElement)

  grid.addAllCars()
}
