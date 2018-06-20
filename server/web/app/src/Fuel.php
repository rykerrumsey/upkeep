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
  public $maxHours;
  public $hoursLeftToReplaceBattery;
  public $totalHours;
  public $batteryReplacementHours;
  public $fuelMilage;

  public function __construct($options) {
    // populated from form options
    $this->totalHours = $options['totalHours'];
    $this->maxHours = $options['maxHours'];
    $this->fuelMilage = $options['fuelMileage'];

    // calculated fields
    $this->hoursLeftToReplaceBattery = (int) $this->maxHours - (int) $this->totalHours;
  }

  // get the urgency level of maintainence according to hours left on car battery
  public function getUrgency() {
    switch($this->hoursLeftToReplaceBattery) {
      case ($this->hoursLeftToReplaceBattery < 9000):
        return 'high';
      case ($this->hoursLeftToReplaceBattery >= 9000 && $this->hoursLeftToReplaceBattery <= 18000):
        return 'medium';
      case ($this->hoursLeftToReplaceBattery > 18000):
        return 'low';
      default:
        echo "You cannot have more hours then the maxium vehicle hours!";
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
  public $lastOilChange;
  public $odometer;

  public function __construct($options) {
    // these options come from the add form
    $this->odometer = $options['odometer'];
    $this->octanePercentage = $options['octanePercentage'];
    $this->priceOfGas = $options['gasPrice'];
    $this->lastOilChange = $options['lastOilChange'];
    $this->fuelMilage = $options['fuelMilage'];

    // computed fields
    $this->priceOfGasDate = new DateTime();
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
  public $daysUsed;
  public $halfLifeDays;
  public $fuelMilage;
  public $isotope;
  public $canGoWarpSpeed;

  public function __construct($options) {
    $this->halfLife = $options['halfLife'];
    $this->daysUsed = $options['totalDays'];
    $this->isotope = $options['isotope'];
    $this->$canGoWarpSpeed = $options['canGoWarpSpeed'];
  }

  public function getUrgency() {
    // formula to find if half-life expiry has happened
    $diff = (int)$this->daysUsed / (int)$this->halfLife;

    if($diff > 6) {
      return "high";
    } else if($diff <=6 && $diff >= 3){
      return "medium";
    } else {
      return "low";
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
