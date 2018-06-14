<?php
//
// switch ($_SERVER['HTTP_ORIGIN']) {
//     case '*':
//     header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
//     header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
//     header('Access-Control-Max-Age: 1000');
//     header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
//     break;
// }

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
    $results = $carView->deleteCar($_POST['deleteId']);
  }

  $add = isset($_POST['vin']) ? $_POST['vin'] : false;
  if ($add) {
    $result = $carView->addCar($_POST);
  }


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

// if ($_SERVER["REQUEST_METHOD"] == "PUT") {
//   // add the form data to the database
//   $formData = "";
//   $results = $carView->updateReport($formData);
//
//   // $successful = $response->addReport($json);
//   $response = array('message' => 'Report was updated successfully!');
//
//   if(true) {
//     http_response_code(202);
//     echo json_encode($response);
//   } else {
//     http_response_code(500);
//     echo json_encode($response);
//   }
// }

// delete a car with specified id from the database
// if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
//
//   echo "this is a put request\n";
//     parse_str(file_get_contents("php://input"),$post_vars);
//     echo $post_vars;
//
//   $results = $carView->deleteCar($_POST['id']);
//
//   if(true) {
//     $message = "Report was deleted successfully!";
//     http_response_code(202);
//     $response = array();
//   } else {
//     $message = "There was an error deleting your report!";
//     http_response_code(500);
//     $response = array();
//   }
//
//   echo json_encode($response);
// }

?>
