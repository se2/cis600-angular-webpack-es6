<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  require('php/JSON.php');

  $json = new Services_JSON();

  // get home data
  if (file_exists('homeData.json')) {
    $homeData = file_get_contents('homeData.json');
    echo $json->encode($homeData);
  } else {
    echo $json->encode(array());
  }
?>