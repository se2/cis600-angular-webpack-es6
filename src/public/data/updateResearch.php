<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, PUT');

  // debug
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');
  require('php/HASH.php');

  $json = new Services_JSON();
  $researchDataFileName = 'studentData';

  // get research data
  // $oldResearch = $json->decode(file_get_contents($researchDataFileName . '.json'));

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract data
  $research = $request->data;

  unlink($researchDataFileName . '.json');
  file_put_contents($researchDataFileName . '.json', $json->encode($research));

  echo $json->encode(array('updated' => true));

?>