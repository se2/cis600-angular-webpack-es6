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

  $baseUrl = 'users/';

  if (isset($_FILES["file"]["name"])) {

    move_uploaded_file($_FILES["file"]["tmp_name"], 'images/' . $_FILES["file"]["name"]);

    if (file_exists($baseUrl . $userId . '.json')) {

      $user = $json->decode(file_get_contents($baseUrl . $userId . ".json"));
      $user->avatar = 'data/images/' . $_FILES["file"]['name'];

      unlink($baseUrl . $userId . '.json');
      file_put_contents($baseUrl . $userId . ".json", $json->encode($user));

      echo $json->encode($user);
    } else {
      echo $json->encode(array());
    }
  }

?>