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
  $id = $request->account->id;
  $username = $request->account->username;
  $current = $request->account->currentPassword;
  $new = $request->account->newPassword;

  $newAccount = array();
  $accounts = $json->decode(file_get_contents('accounts.json'));

  foreach ($accounts as $key => $account) {
    if ($account->id == $id && hash_equals($account->hashed, crypt($account->username.$current, $account->hashed))) {
      $found = true;
      $newHashed = crypt($username.$new);
      $account->username = $username;
      $account->hashed = $newHashed;
      $accounts[$key] = $account;
      $newAccount = $account;
      unlink("accounts.json");
      file_put_contents("accounts.json", $json->encode($accounts));
      break;
    } else {
      $errorMsg = 'Incorrect Password!';
    }
  }
  echo $json->encode(array('updated' => $found, 'account' => $newAccount, 'error' => $errorMsg));
?>