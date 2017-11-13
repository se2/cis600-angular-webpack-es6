<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  require('php/JSON.php');

  $json = new Services_JSON();
  $found = false;

  $dir = "users";
  $users = array();

  foreach ( glob( $dir . '/*.*' ) as $file ) {
    $user = $json->decode(file_get_contents($file));
    if (!isset($user->firstlast) || $user->firstlast == NULL) {
      $user->firstlast = $user->firstname . ' ' . $user->lastname;
    }
    $users[] = $user;
  }

  echo $json->encode($users);

?>