<?php
  include_once 'interfaces.inc.php';

  class Truck extends Vehicle {
    public function __construct($make, $model, $vin, $year, $odometer) {
      parent::__construct($make, $model, $vin, $year, $odometer);
    }
  }
?>
