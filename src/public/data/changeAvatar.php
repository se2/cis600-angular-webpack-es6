<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // JSON libraries for PHP 5.1.5
  require('php/JSON.php');

  $json = new Services_JSON();
  $userId = $_POST['userId'];
  $uploaded = false;

  $baseUrl = 'users/';
  $imgDir = 'data/images/';

  if (isset($_FILES["file"]["name"])) {

    $user = $json->decode(file_get_contents($baseUrl . $userId . ".json"));
    $temp = explode(".", $_FILES["file"]["name"]);
    $newfilename =  str_replace(' ', '', $user->firstname . $user->lastname) . '-' . date('Y-m-d-h-m-s') . '.' . end($temp);

    if (move_uploaded_file($_FILES["file"]["tmp_name"], 'images/' . $newfilename)) {
      $uploaded = true;
      if (file_exists($baseUrl . $userId . '.json')) {
        $user->avatar = $imgDir . $newfilename;
        unlink($baseUrl . $userId . '.json');
        file_put_contents($baseUrl . $userId . ".json", $json->encode($user));
        echo $json->encode(array('uploaded' => $uploaded, 'user' => $user));
      } else {
        echo $json->encode(array('uploaded' => $uploaded, 'user' => array()));
      }
    } else {
      echo $json->encode(array('uploaded' => $uploaded, 'user' => array()));
    }
  }
?>