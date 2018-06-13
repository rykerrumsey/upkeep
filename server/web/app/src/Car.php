<?php

  namespace App;

  include_once 'interfaces.inc.php';

  class Car extends Vehicle {
    public function __construct($make, $model, $vin, $year, $odometer) {
      parent::__construct($make, $model, $vin, $year, $odometer);
    }
  }
?>
