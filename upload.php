<?php
	$target_dir = __DIR__ . "/files/";
	$target_file = $target_dir . basename($_FILES["file"]["name"]);
	$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
	if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
		echo json_encode([
			'status' => 'success',
			'message' => "The file ". basename( $_FILES["file"]["name"]). " has been uploaded."
		]);
	} else {
		echo "Sorry, there was an error uploading your file.";
	}
?>