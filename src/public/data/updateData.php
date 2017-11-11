<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');

  $json = new Services_JSON();
  $updated = false;

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  $data = $request->data;
  $fileName = $request->file;

  // update new data
  unlink($fileName . '.json');
  file_put_contents($fileName . '.json', $json->encode($data));
  $updated = true;

  echo $json->encode(array('updated' => $updated));
?>