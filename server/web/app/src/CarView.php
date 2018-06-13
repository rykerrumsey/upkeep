<?php

  namespace App;

  use App\Car;

  class CarView extends Car {

    // holds an array of all the cars in the database
    private $listOfCars;

    public function __construct() {
      $this->populateCarList();
    }

    public function getAllReports() {
      return $this->listOfCars;
    }

    public function addReport($newCar) {

      $car = new Car($newCar);
      $result = $car->addOneToDatabase();
      $this->populateCarList();

      return $result;
    }

    public function updateReport($updatedCar) {

      return "Report was updated.";
    }

    public function deleteReport() {

      return "Report was deleted!";
    }

    private function populateCarList() {
      $this->listOfCars = Car::getCarsFromDatabase();
    }
  }

?>
