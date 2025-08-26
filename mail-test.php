<?php
header('Content-Type: text/plain; charset=utf-8');
$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST']."/contact.php";
$postFields = [
  'name'=>'Test Sender','email'=>'test@example.com','phone'=>'555-0000',
  'message'=>'This is a test from mail-test.php','website'=>''
];
$ch=curl_init($url);
curl_setopt($ch,CURLOPT_POST,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$postFields);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_TIMEOUT,15);
$response=curl_exec($ch);
$err=curl_error($ch);
$code=curl_getinfo($ch,CURLINFO_HTTP_CODE);
curl_close($ch);
echo "POST to: $url\nStatus: $code\n\nResponse:\n$response\n";
if($err){ echo "\nCURL error:\n$err\n"; }
