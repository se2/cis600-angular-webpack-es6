<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');

  $json = new Services_JSON();
  $baseUrl = 'users/';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract data
  $userId = $request->userId;
  $facebook = $request->facebook;
  $linkedin = $request->linkedin;

  foreach ( glob( $baseUrl . '*.*' ) as $file ) {
    $user = $json->decode(file_get_contents($file));
    $fileName = str_replace(' ', '', ($user->firstname . $user->lastname)) . $user->year;
    if ($user->id == $userId) {
      $user->facebook = $facebook;
      $user->linkedin = $linkedin;
      unlink($file);
      file_put_contents($baseUrl . $fileName . ".json", $json->encode($user));
      break;
    }
  }
  echo $json->encode(array('updated' => true));
?>