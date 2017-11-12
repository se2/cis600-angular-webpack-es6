<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');

  $json = new Services_JSON();
  $dir = 'backup/';
  $revert = false;

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  $fileName = $request->file;

  unlink($fileName . '.json');
  if (copy($dir . $fileName . '.bak.json', $fileName . '.json')) {
    $revert = true;
  }

  echo $json->encode(array('revert' => $revert));
?>