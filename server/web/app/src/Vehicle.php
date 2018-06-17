<?php

  namespace App;

  abstract class Vehicle extends Db {
    public $vin;
    public $make;
    public $model;
    public $year;
    public $odometer;
    public $dateCreated;
    public $fuelType;
    public $loudness;
    public $brakingSystem;

    public function getFuelType() {
      return $this->fuelType->name;
    }

    public function setFuelType(Fuel $type) {
      $this->fuelType = $type;
    }
  }

?>
