<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');
  require('php/HASH.php');

  $json = new Services_JSON();
  $baseUrl = 'users/';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract data
  $userId = $request->userId;
  $facebook = $request->facebook;
  $linkedin = $request->linkedin;

  $user = $json->decode(file_get_contents($baseUrl . $userId . ".json"));

  $user->facebook = $facebook;
  $user->linkedin = $linkedin;

  unlink($baseUrl . $userId . ".json");
  file_put_contents($baseUrl . $userId . ".json", $json->encode($user));

  echo $json->encode(array('updated' => true));

?>