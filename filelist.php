<?php
	header("Content-type: application/json");
	$target_dir = __DIR__ . "/files/";
	$files = array_slice(scandir($target_dir), 2);
	echo json_encode($files);
?>