<?php

  namespace App;

  use MongoDB\BSON\ObjectId as ObjectId;
  use \DateTime;

  require_once('Fuel.php');

  date_default_timezone_set('UTC');

  class Car extends Vehicle {
    public $urgency;
    private $options;

    public function __construct($car) {
      $this->vin = $car['vin'];
      $this->make = $car['make'];
      $this->model = $car['model'];
      $this->year = $car['year'];
      $this->odometer = $car['odometer'];
      $this->dateCreated = new DateTime();
      //$this->options = $car['options'];
      //remove after options implemented
      $this->lastOilChange = $car['lastOilChange'];
      $this->generateType($car['type']);
    }

    public function setUrgency() {
      $this->urgency = $this->fuelType->getUrgency();
    }

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
            $fuel = new Atomic(50, 2500, 1000, "plutonium");
            $this->setFuelType($fuel);
          break;
        default:
          echo "The fuel type entered was not valid.";
      }

      $this->setUrgency();
    }

    static public function deleteCarFromDatabase($id) {
      $collection = self::connect()->vehicles;
      $res = $collection->deleteOne(['_id' => new ObjectId($id)]);
      return $res;
    }

    static public function getCarsFromDatabase() {
      $collection = self::connect()->vehicles;
      return $collection->find()->toArray();
    }

    protected function addOneToDatabase() {
      $collection = self::connect()->vehicles;

      $insertOneResult = $collection->insertOne([
          'vin' => $this->vin,
          'make' => $this->make,
          'model' => $this->model,
          'year' => $this->year,
          'odometer' => $this->odometer,
          'lastOilChange' => $this->lastOilChange,
          'type' => $this->getFuelType(),
          'dateCreated' => $this->dateCreated,
          'urgency' => $this->urgency,
          'options' => [
              'option' => 'value'
          ]
      ]);

      $id = (string)$insertOneResult->getInsertedId();

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
