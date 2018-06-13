<?php

require_once '../app/vendor/autoload.php';

use App\CarView;

$carView = new CarView();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $results = $carView->getAllReports();

    // if there are any results send message along with results
    // if(true) {
    //   $message = "All the reports were retrieved successfully!";
    //   http_response_code(202);
    //   $response = array('message' => $message, 'success' => true);
    // } else {
    //   $message = "There was an error retrieving the reports!";
    //   http_response_code(500);
    //   $response = array('message' => $message, 'success' => false);
    // }

    echo json_encode($results);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

   //  $option = isset($_POST['type']) ? $_POST['type'] : false;
   // if ($option) {
   //    echo htmlentities($_POST['type'], ENT_QUOTES, "UTF-8");
   // } else {
   //   echo "task option is required";
   //   exit;
   // }

    $result = $carView->addReport($_POST);

    // if results were successful send message along with results
    if($result) {
      $message = "Report was added successfully.";
      http_response_code(202);
      $response = array('message' => $message, 'success' => $result);
    } else {
      $message = "There was an error adding the report!";
      http_response_code(500);
      $response = array('message' => $message, 'success' => $result);
    }

    echo json_encode($response);
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
  // add the form data to the database
  $formData = "";
  $results = $carView->updateReport($formData);

  // $successful = $response->addReport($json);
  $response = array('message' => 'Report was updated successfully!');

  if(true) {
    http_response_code(202);
    echo json_encode($response);
  } else {
    http_response_code(500);
    echo json_encode($response);
  }
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
  // add the form data to the database
  $formData = "";
  $results = $carView->deleteReport($formData);
  $message = "";

  if(true) {
    $message = "Report was deleted successfully!";
    http_response_code(202);
    $response = array();
  } else {
    $message = "There was an error deleting your report!";
    http_response_code(500);
    $response = array();
  }

  echo json_encode($response);
}

?>
