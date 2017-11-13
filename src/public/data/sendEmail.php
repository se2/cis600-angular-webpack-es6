<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
  header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS');

  // debug
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  // PHP libraries for PHP 5.1.5
  require('php/JSON.php');
  require('php/HASH.php');
  require('php/LIB.php');

  $json = new Services_JSON();
  $sent = false;

  // get input data
  $postdata = file_get_contents("php://input");
  $request = $json->decode($postdata);

  // extract data
  $receivingEmail = $request->receivingEmail;
  $selected = $request->selected;
  $subject = $request->subject;
  $body = $request->body;

  $message = $body;
  $headers = 'From: CSEL <' . $receivingEmail . '>' . PHP_EOL . 'X-Mailer: PHP/' . phpversion();
  $headers .= "Reply-To: ". strip_tags($receivingEmail) . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  foreach ($selected as $key => $user) {
    if (isset($user->email) && $user->email !== NULL) {
      mail($user->email, $subject, $message, $headers);
    }
    if (isset($user->email2) && $user->email2 !== NULL) {
      mail($user->email2, $subject, $message, $headers);
    }
  }

  $sent = true;

  echo $json->encode(array('sent' => $sent));

?>