<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // PHP libraries for PHP 5.1.5
  include_once('data/php/pclzip/pclzip.lib.php');
  require('data/php/JSON.php');

  $json = new Services_JSON();
  $download = false;
  $filename = 'data/data.zip';
  $files = array(
    'data/backup',
    'data/images',
    'data/users',
    'data/accounts.json',
    'data/grantActivities.json',
    'data/homeData.json',
    'data/publicationData.json',
    'data/studentData.json'
  );

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // get input data
    $postdata = file_get_contents("php://input");
    $request = $json->decode($postdata);

    $account = $request->account;

    $accounts = $json->decode(file_get_contents('data/accounts.json'));
    foreach ($accounts as $key => $acc) {
      if ($account->id == $acc->id && $account->role == 'admin') {
        if (file_exists($filename)) {
          unlink($filename);
        }
        $archive = new PclZip($filename);
        $list = $archive->create($files);
        if ($list == 0) {
          die("Error: ".$archive->errorInfo(true));
        } else {
          $download = true;
        }
      }
    }
    if ($download) {
      echo $json->encode(array('download' => $download, 'file' => $filename));
    } else {
      echo $json->encode(array('download' => $download, 'error' => 'permission denied'));
    }
  } else {
    echo 'Permission denied';
  }

?>