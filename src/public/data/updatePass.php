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
  $found = false;
  $errorMsg = '';
  $baseUrl = 'users/';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract data
  $email = $request->email;
  $current = $request->currentPassword;
  $new = $request->newPassword;

  $fileName = split('@', $email);
  $user = $json->decode(file_get_contents($baseUrl . $fileName[0] . ".json"));

  if ($user->email == $email && hash_equals($user->password, crypt($email.$current, $user->password))) {
    $found = true;
    $newHashedPassword = crypt($email.$new);
    $user->password = $newHashedPassword;

    unlink($baseUrl . $fileName[0] . ".json");
    file_put_contents($baseUrl . $fileName[0] . ".json", $json->encode($user));
    echo $json->encode(array('updated' => $found));
  } else {
    $errorMsg = 'Incorrect Password';
    echo $json->encode(array('updated' => $found, 'error' => $errorMsg));
  }

?>