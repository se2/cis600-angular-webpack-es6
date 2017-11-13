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
  require('php/LIB.php');

  $json = new Services_JSON();
  $baseUrl = 'users/';
  $dup = false;

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // unique id
  $id = randomString(10);

  // to save data
  $newUser = $request->data;

  foreach ( glob( $baseUrl . '*.*' ) as $file ) {
    $user = $json->decode(file_get_contents($file));
    if ($newUser->email == $user->email
      || (isset($user->email2) && $newUser->email == $user->email2)) {
      $dup = true;
      break;
    }
    if (isset($newUser->email2)) {
      if ($newUser->email2 == $user->email || (isset($user->email2) && $newUser->email2 == $user->email2)) {
        $dup = true;
        break;
      }
    }
  }

  if ($dup) {
    echo $json->encode(array());
  } else {
    if (!file_exists($id . '.json') && $newUser != NULL) {
      $newUser->id = $id;
      // save to user file
      file_put_contents($baseUrl . $id . ".json", $json->encode($newUser));
      echo $json->encode($newUser);
    } else {
      echo $json->encode(array());
    }
  }
?>