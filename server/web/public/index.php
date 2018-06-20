<?php
header("Access-Control-Allow-Origin: *");

require_once '../app/vendor/autoload.php';

use App\CarView;

$carView = new CarView();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $results = $carView->getAllCars();
  echo json_encode($results);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $delete = isset($_POST['deleteId']) ? $_POST['deleteId'] : false;

  if ($delete) {
    $result = $carView->deleteCar($_POST['deleteId']);

    // if results were successful send message along with results
    if($result) {
      $message = "The car was removed successfully.";
      http_response_code(202);
      $response = array('message' => $message, 'success' => true);
    } else {
      $message = "There was an error removing the car!";
      http_response_code(500);
      $response = array('message' => $message, 'success' => false);
    }
  }

  //if an post request comes in with a vehicle attached, add that vehicle
  $add = isset($_POST['isAdd']) ? $_POST['isAdd'] : false;

  if ($add) {
    $result = $carView->addCar($_POST);

    // if results were successful send message along with results
    if($result) {
      $message = "The car was added successfully.";
      http_response_code(202);
      $response = array('message' => $message, 'success' => true);
    } else {
      $message = "There was an error adding the car!";
      http_response_code(500);
      $response = array('message' => $message, 'success' => false);
    }
  }

  //if an post request comes in with a vehicle attached, add that vehicle
  $edit = (isset($_POST['id']) && isset($_POST['isEdit']));

  if ($edit) {
    $carView->deleteCar($_POST['id']);
    $result = $carView->addCar($_POST);

    // if results were successful send message along with results
    if($result) {
      $message = "The car was edited successfully.";
      http_response_code(202);
      $response = array('message' => $message, 'success' => true);
    } else {
      $message = "There was an error editing the car!";
      http_response_code(500);
      $response = array('message' => $message, 'success' => false);
    }
  }

  echo json_encode($response);
}

?>
