<?php

  namespace App;

  use MongoDB\BSON\ObjectId as ObjectId;

  include_once 'Interfaces.php';

  class Car extends Vehicle implements Electric, Gas, Diesel {

    private $type;
    private $lastRotationDate;
    private $lastOilChange;

    public function __construct($car) {
      parent::__construct($car['vin'], $car['make'], $car['model'], $car['year'], $car['odometer']);
      $this->type = $car['type'];
    }

    protected function addOneToDatabase() {
      $collection = self::connect()->vehicles;

      $insertOneResult = $collection->insertOne([
          'vin' => $this->vin,
          'make' => $this->make,
          'model' => $this->model,
          'year' => $this->year,
          'odometer' => $this->odometer,
          'lastOilChange' => 'another iso date',
          'type' => $this->type,
          'options' => [
              'batteryLastChanged' => 'and iso date'
          ]
      ]);

      $id = (string)$insertOneResult->getInsertedId();

      if($insertOneResult->getInsertedCount() > 0) {
        printf("Car _id = $id was added to the database.");
        return true;
      } else {
        printf("Car failed to be added to the database!");
        return false;
      }
    }

    protected function updateDatabase() {

    }

    static public function deleteCarFromDatabase($id) {
      var_dump($id);
      $collection = self::connect()->vehicles;
      $res = $collection->deleteOne(['_id' => new ObjectId($id)]);
      var_dump($res);
      return $res;
    }

    static public function getCarsFromDatabase() {
      $collection = self::connect()->vehicles;
      return $collection->find()->toArray();
    }
  }
?>
