<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // JSON libraries for PHP 5.1.5
  require('php/JSON.php');
  require('php/HASH.php');
  require('php/LIB.php');

  $json = new Services_JSON();
  $baseUrl = 'users/';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // unique id
  $id = randomString(10);

  // to save data
  $user = $request->data;

  if (!file_exists($id . '.json') && $user != NULL) {
    $user->id = $id;
    // save to user file
    file_put_contents($baseUrl . $id . ".json", $json->encode($user));
    echo $json->encode($user);
  } else {
    echo $json->encode(array());
  }

?>