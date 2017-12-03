<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // JSON libraries for PHP 5.1.5
  require('php/JSON.php');

  $json = new Services_JSON();
  $userId = $_POST['userId'];
  $uploaded = false;
  $found = false;

  $baseUrl = 'users/';
  $imgDir = 'data/images/';

  if (isset($_FILES["file"]["name"])) {
    foreach ( glob( $baseUrl . '*.*' ) as $file ) {
      $user = $json->decode(file_get_contents($file));
      if ($user->id == $userId) {
        $found = true;
        $temp = explode(".", $_FILES["file"]["name"]);
        $newfilename =  str_replace(' ', '', ($user->firstname . $user->lastname)) . '-' . date('Y-m-d-h-m-s') . '.' . end($temp);
        if (move_uploaded_file($_FILES["file"]["tmp_name"], 'images/' . $newfilename)) {
          $uploaded = true;
          $fileName = str_replace(' ', '', ($user->firstname . $user->lastname)) . $user->year;
          if (file_exists($baseUrl . $fileName . '.json')) {
            $user->avatar = $imgDir . $newfilename;
            unlink($baseUrl . $fileName . '.json');
            file_put_contents($baseUrl . $fileName . ".json", $json->encode($user));
            echo $json->encode(array('uploaded' => $uploaded, 'user' => $user));
          } else {
            echo $json->encode(array('uploaded' => $uploaded, 'user' => array()));
          }
        } else {
          echo $json->encode(array('uploaded' => $uploaded, 'user' => array()));
        }
        break;
      }
    }
    if (!$found) {
      echo $json->encode(array('uploaded' => $uploaded, 'user' => array()));
    }
  }
?>