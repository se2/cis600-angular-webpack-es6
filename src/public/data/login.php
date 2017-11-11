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
  $dir = 'users';

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract login data
  $inputUsername = $request->username;
  $inputPassword = $request->password;

  $accounts = $json->decode(file_get_contents('accounts.json'));
  foreach ($accounts as $key => $account) {
    if (hash_equals(crypt($inputUsername.$inputPassword, $account->hashed), $account->hashed)) {
      $found = true;
      $users = array();
      $common = array();
      if ($account->role == 'admin') {
        foreach ( glob( $dir . '/*.*' ) as $file ) {
          $users[] = $json->decode(file_get_contents($file));
        }
        foreach ($accounts as $key => $acc) {
          if ($acc->role == 'common') {
            $common = array(
              'id' => $acc->id,
              'username' => $acc->username
            );
            break;
          }
        }
      }
      echo $json->encode(
        array(
          'found' => $found,
          'account' => array(
            'id' => $account->id,
            'username' => $account->username,
            'role' => $account->role
          ),
          'common' => $common,
          'users' => $users
        )
      );
      break;
    }
  }
?>