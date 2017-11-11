<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  require('php/JSON.php');

  $json = new Services_JSON();

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  $file = $request->file;

  // get data
  if (file_exists($file . '.json')) {
    $data = file_get_contents($file . '.json');
    echo $json->encode($data);
  } else {
    echo $json->encode(array());
  }
?>