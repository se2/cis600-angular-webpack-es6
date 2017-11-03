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
  if (file_exists('publicationData.json')) {
    $publicationData = file_get_contents('publicationData.json');
    echo $json->encode($publicationData);
  } else {
    echo $json->encode(array());
  }
?>