<?php

require '../app/vendor/autoload.php';
// require 'includes/db.inc.php';
// require 'includes/vehicle.inc.php';
// require 'includes/car.inc.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // collect value of input field
    phpinfo();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $arr = array('message' => 'Report was added successfully!');

    header('HTTP/1.1 201 Created');
    echo json_encode($arr);
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {

}

// if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
//     // collect value of input field
//     $name = $_POST['fname'];
//     if (empty($name)) {
//         echo "Name is empty";
//     } else {
//         echo $name;
//     }
// }

// $vehicle = new Car("ford", "mustang", "V8YDD76352KKN7342", "1969", "65899");
//
// var_dump($vehicle);

?>
