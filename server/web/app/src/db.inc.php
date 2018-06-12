<?php

class Db {

  private $servername;
  private $username;
  private $password;
  private $dbname;

  protected function connect() {
    
    // get these variables from enviroment variables
    $this->servername = "127.0.0.1";
    $this->username = "admin";
    $this->password = "secret";
    $this->dbname = "upkeep";

    $uri = "mongodb://".$this->username.":".$this->password."@".$this->servername.":27017";

    $conn = new MongoDB\Client($uri);

    return $conn;
  }
}

?>
