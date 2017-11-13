<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  require('php/JSON.php');

  $json = new Services_JSON();
  $found = false;

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  $userId =  $request->userId;

  if (file_exists("users/" . $userId . ".json")) {
    if (!isset($user->firstlast) || $user->firstlast == NULL) {
      $user->firstlast = $user->firstname . ' ' . $user->lastname;
    }
    $user = $json->decode(file_get_contents("users/" . $userId . ".json"));
    $found = true;
    echo $json->encode(array('found' => $found, 'user' => $user));
  } else {
    echo $json->encode(array('found' => $found, 'user' => array()));
  }
?>