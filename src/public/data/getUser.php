<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  require('php/JSON.php');

  $json = new Services_JSON();
  $found = false;
  $dir = "users";
  $returnUser = array();
  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);
  $userId =  $request->userId;
  foreach ( glob( $dir . '/*.*' ) as $file ) {
    $user = $json->decode(file_get_contents($file));
    if ($user->id == $userId) {
      $found = true;
      if (!isset($user->firstlast) || $user->firstlast == NULL) {
        $user->firstlast = $user->firstname . ' ' . $user->lastname;
      }
      $returnUser = $user;
    }
  }
  echo $json->encode(array('found' => $found, 'user' => $returnUser));
?>