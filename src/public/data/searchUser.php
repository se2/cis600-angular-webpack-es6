<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  require('php/JSON.php');

  $json = new Services_JSON();

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  $search =  $request->search;

  $dir = "users";
  $users = array();

  foreach ( glob( $dir . '/*.*' ) as $file ) {
    $user = $json->decode(file_get_contents($file));
    if ($search == strtolower($user->firstname)
    || $search == strtolower($user->lastname)
    || $search == strtolower($user->fullname)
    || $search == strtolower($user->email)
    || (isset($user->email2) && $search == strtolower($user->email2))) {
      $users[] = $user;
    }
  }

  echo $json->encode($users);
?>