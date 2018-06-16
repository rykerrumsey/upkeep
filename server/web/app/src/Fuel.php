<?php

namespace App;

use \DateTime;

date_default_timezone_set('UTC');

interface Fuel {
  public function needsStorageTank();
  public function showDangerLevel();
  public function isExplosive();
  public function isReplenishable();
  public function getUrgency();
}

class Electric implements Fuel {
  const DANGER_LEVEL = 1;
  const FUEL_TANK = false;
  const EXPLOSIVE = false;
  public $name = "electric";
  public $speedToCharge;
  public $hoursLeftToReplaceBattery;
  public $totalHours;
  public $batteryReplacementHours;
  public $fuelMilage;

  public function __construct($totalHours, $chargeType, $batteryReplacementHours, $fuelMileage) {

    $this->totalHours = $totalHours;
    $this->hoursLeftToReplaceBattery = (int) $batteryReplacementHours - (int) $totalHours;
    $this->totalHours = $totalHours;
    $this->fuelMilage = $fuelMilage;

    $this->setSpeedToCharge($chargeType);
  }

  public function setSpeedToCharge($type) {
    if($type == 'solar') {
      $this->speedToCharge = "slow";
    } else if ($type == 'station') {
      $this->speedToCharge = "fast";
    } else {
      echo "Invalid charge system entered.";
    }
  }

  public function getUrgency() {
    $diff = (int)$this->hoursLeftToReplaceBattery - (int)$this->totalHours;

    switch($diff) {
      case ($diff < 9000):
        return 'low';
        break;
      case ($diff >= 9000 && $diff < 18000):
        return 'medium';
        break;
      default:
        return 'high';
    }
  }

  public function needsStorageTank() {
    return self::FUEL_TANK;
  }

  public function showDangerLevel() {
    return self::DANGER_LEVEL;
  }

  public function isExplosive() {
    return self::EXPLOSIVE;
  }

  public function isReplenishable() {
    return true;
  }
}

class Gas implements Fuel {
  const DANGER_LEVEL = 5;
  const FUEL_TANK = true;
  const EXPLOSIVE = true;
  public $name = "gas";
  public $octanePercentage;
  public $priceOfGas;
  public $priceOfGasDate;
  public $fuelMilage;
  public $odometer;
  public $lastOilChange;

  public function __construct($octanePercentage, $priceOfGas, $odometer, $lastOilChange, $fuelMileage) {
    echo $odometer;
    var_dump($lastOilChange);

    $this->octanePercentage = $octanePercentage;
    $this->priceOfGas = $priceOfGas;
    $this->odometer = $odometer;
    $this->lastOilChange = $lastOilChange;
    $this->fuelMilage = $fuelMilage;

    $priceOfGasDate = new DateTime();
  }

  public function getUrgency() {
    $diff = (int)$this->odometer - (int)$this->lastOilChange;

    switch($diff) {
      case ($diff < 5000):
        return 'low';
      case ($diff > 5000 && $diff < 10000):
        return 'medium';
      default:
        return 'high';
    }
  }

  public function needsStorageTank() {
    return self::FUEL_TANK;
  }

  public function showDangerLevel() {
    return self::DANGER_LEVEL;
  }

  public function isExplosive() {
    return self::EXPLOSIVE;
  }

  public function isReplenishable() {
    return false;
  }
}

class Atomic implements Fuel {
  const DANGER_LEVEL = 10;
  const FUEL_TANK = true;
  const EXPLOSIVE = true;
  public $name = "atomic";
  public $deadLife;
  public $halfLife;
  public $fuelMilage;
  public $isotope;

  public function __construct($halfLife, $deadLife, $fuelMilage, $isotope) {
    $this->halfLife = $halfLife;
    $this->deadLife = $deadLife;
    $this->fuelMilage = $fuelMilage;
    $this->isotope = $isotope;
  }

  public function getUrgency() {
    $diff = (int)$this->deadLife - (int)$this->halfLife;

    switch($diff) {
      case ($diff < 0):
        return 'low';
        break;
      default:
        return 'high';
    }
  }

  public function needsStorageTank() {
    return self::FUEL_TANK;
  }

  public function showDangerLevel() {
    return self::DANGER_LEVEL;
  }

  public function isExplosive() {
    return self::EXPLOSIVE;
  }

  public function isReplenishable() {
    return false;
  }
}

?>
