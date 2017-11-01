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

  $json = new Services_JSON();
  $found = false;
  $dir = "users";

  // common account
  $username = 'username';
  $password = 'password';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract login data
  $inputUsername = $request->username;
  $inputPassword = $request->password;

  $users = array();

  foreach ( glob( $dir . '/*.*' ) as $file ) {
    $users[] = $json->decode(file_get_contents($file));
  }

  if ($inputUsername == $username && $inputPassword == $password) {
    $found = true;
    echo $json->encode(array('found' => $found, 'users' => $users));
  } else {
    echo $json->encode(array('found' => $found, 'users' => array()));
  }

?>