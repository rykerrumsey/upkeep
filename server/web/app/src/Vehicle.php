<?php

  namespace App;

  class Vehicle extends Db {
    protected $vin;
    protected $make;
    protected $model;
    protected $year;
    protected $odometer;
    protected $dateAdded;

    public function __construct($vin, $make, $model, $year, $odometer) {
      $this->vin = $vin;
      $this->make = $make;
      $this->model = $model;
      $this->year = $year;
      $this->odometer = $odometer;
    }
  }

?>
