<?php
  include 'interfaces.inc.php';

  class Motorcycle extends Vehicle {
    public function __construct($make, $model, $vin, $year, $odometer) {
      parent::__construct($make, $model, $vin, $year, $odometer);
    }
  }
?>
