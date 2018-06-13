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

      //$this->createCollection();
    }

    //function determines if the vehicles collection exists
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
