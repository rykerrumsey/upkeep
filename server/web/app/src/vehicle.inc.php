<?php

  class Vehicle extends Db {
    private $make;
    private $model;
    private $vin;
    private $year;
    private $odometer;
    private $hasBrakes = true;
    private $tireAmount = 4;

    public function __construct($make, $model, $vin, $year, $odometer) {
      $this->make = $make;
      $this->model = $model;
      $this->vin = $vin;
      $this->year = $year;
      $this->odometer = $odometer;

      $this->createCollection();
    }

    // function determines if the vehicles collection exists
    private function createCollection() {
      $upkeepdb = $this->connect()->upkeep;

      $collections = $upkeepdb->listCollections([
        'filter' => [
              'name' => 'vehicles',
        ],
      ]);

      // check to see if vehicles collection was created already
      // if the collection does not exist create the collection
      if($collections->count() == 0) {
        $upkeepdb->createCollection('vehicles');
      }
    }
  }
  
?>
