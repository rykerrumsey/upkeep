<?php

namespace App;

use MongoDB\Client as MongoDb;

class Db {

  private $servername;
  private $username;
  private $password;
  private $dbname;

  protected static function connect() {

    // get these variables from enviroment variables
    // used for production
    // $this->servername = "127.0.0.1";
    // $this->username = "admin";
    // $this->password = "secret";
    // $this->dbname = "upkeep";

    $uri = "mongodb://mongo:27017";
    $conn = new MongoDb($uri);

    return $conn->upkeep;
  }
}

?>
