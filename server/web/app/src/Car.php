<?php

  namespace App;

  use MongoDB\BSON\ObjectId as ObjectId;
  use \DateTime;

  require 'Fuel.php';

  date_default_timezone_set('UTC');

  class Car extends Vehicle {
    public $urgency;
    private $options;

    public function __construct($car) {
      $this->vin = $car['vin'];
      $this->make = $car['make'];
      $this->model = $car['model'];
      $this->year = $car['year'];
      $this->dateCreated = new DateTime();
      //$this->options = $car['options'];
      //remove after options implemented
      $this->lastOilChange = $car['lastchanged'];
      $this->odometer = $car['odometer'];

      $this->generateType($car['type']);
    }

    //
    public function generateType($fuelType) {
      switch($fuelType) {
        case 'electric':
            // return new Electric($this->options);
            $this->setFuelType(new Electric(10000, 'station', 21000, 35));
          break;
        case 'gas':
            // return new Gas($this->options);
            $this->setFuelType(new Gas(91, 1.33, $this->odometer, $this->lastOilChange, 17));
          break;
        case 'atomic':
            // return new Atomic($this->options);
            $this->setFuelType(new Atomic(50, 2500, 1000, "plutonium"));
          break;
        default:
          echo "The fuel type entered was not valid.";
      }

      // after the Fuel object is created set the urgency of the car
      $this->urgency = $this->fuelType->getUrgency();
    }

    // delete a single car from the database by _id
    static public function deleteCarFromDatabase($id) {
      $collection = self::connect()->vehicles;
      return $collection->deleteOne(['_id' => new ObjectId($id)]);
    }

    // get every car from the database and return an array of car objects
    static public function getCarsFromDatabase() {
      $collection = self::connect()->vehicles;
      return $collection->find()->toArray();
    }

    // add one car to the database by means of k, v pairs
    protected function addOneToDatabase() {
      $collection = self::connect()->vehicles;

      $insertOneResult = $collection->insertOne([
          'vin' => $this->vin,
          'make' => $this->make,
          'model' => $this->model,
          'year' => $this->year,
          'type' => $this->getFuelType(),
          'dateCreated' => $this->dateCreated,
          'urgency' => $this->urgency,

          //these will be in options eventually
          'odometer' => $this->odometer,
          'lastOilChange' => $this->lastOilChange,

          'options' => [
              'option' => 'value'
          ]
      ]);

      // get the id from the inserted record
      //$id = (string)$insertOneResult->getInsertedId();

      if($insertOneResult->getInsertedCount() > 0) {
        return true;
      } else {
        return false;
      }
    }

    protected function updateDatabase() {

    }
  }

?>
