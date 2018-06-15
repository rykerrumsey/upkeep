<?php

  namespace App;

  use MongoDB\BSON\ObjectId as ObjectId;
  use \DateTime;

  include_once 'Interfaces.php';

  date_default_timezone_set('UTC');

  class Car extends Vehicle implements Electric, Gas, Diesel {

    private $type;
    private $dateCreated;
    private $lastOilChange;
    private $urgency;

    protected function __construct($car) {
      parent::__construct($car['vin'], $car['make'], $car['model'], $car['year'], $car['odometer']);
      $this->type = $car['type'];
      $this->dateCreated = new DateTime();
      $this->lastOilChange = $car['lastchanged'];
      $this->urgency = $this->_setUrgency($this->odometer, $this->lastOilChange);
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
          'type' => $this->type,
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

    private function _setUrgency($odometer, $lastOilChange) {
      $diff = (int)$odometer - (int)$lastOilChange;

      switch($diff) {
        case ($diff < 5000):
          return 'low';
          break;
        case ($diff > 5000 && $diff < 10000):
          return 'medium';
          break;
        default:
          return 'high';
      }
    }
  }

?>
