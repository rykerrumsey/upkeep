<?php

  namespace App;

  use App\Car;

  class CarView extends Car {

    // holds an array of all the cars in the database
    private $listOfCars;

    public function __construct() {
      $this->populateCarList();
    }

    public function getAllCars() {
      return $this->listOfCars;
    }

    public function addCar($newCar) {

      $car = new Car($newCar);
      $result = $car->addOneToDatabase();
      $this->populateCarList();

      return $result;
    }

    public function deleteCar($id) {
      $result = Car::deleteCarFromDatabase($id);
      $this->populateCarList();
      return $result;
    }

    private function populateCarList() {
      $this->listOfCars = Car::getCarsFromDatabase();
    }
  }

?>
