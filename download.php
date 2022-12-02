<?php

header("Content-Type: application/json");


$link = $_GET['url'];



$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://tiktok-video-no-watermark2.p.rapidapi.com/?url=".$link,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: tiktok-video-no-watermark2.p.rapidapi.com",
		"X-RapidAPI-Key: 9defcddc52msh9858fcb460b271dp11d0c9jsn8e67dba2bb00"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo json_encode($err);
} else {
   // json_decode($result, true);
   echo json_encode($response);
}