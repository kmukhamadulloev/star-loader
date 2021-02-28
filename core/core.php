<?php
	if (isset($_REQUEST['action'])) {
		switch($_REQUEST['action']) {
			case 'upload':
				upload();
				break;
			case 'getlist':
				getlist();
				break;
			case 'deletefile':
				deletefile($path);
				break;
			case 'setting':
				let($option, $value);
				break;
			default:
				error();
		}
	} else {
		error();
	}
	
	function pregger($string) {
		return preg_replace("/[^\w\d]+/u", "", $string);
	}

	function upload() {
		$target_dir = "../files/";
		$total = count($_FILES["file"]['name']);
		$result = [];
		for ($i = 0; $i < $total; $i++) {
			$target_file = $target_dir . basename($_FILES["file"]["name"][$i]);
			$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			if (move_uploaded_file($_FILES["file"]["tmp_name"][$i], $target_file)) {
				$result[$i]['status'] = 'success';
				$result[$i]['message'] = "The file " . basename( $_FILES["file"]["name"][$i]) . " has been uploaded.";
			} else {
				$result[$i]['status'] = "error";
				$result[$i]['message'] = "Sorry, there was an error uploading your file.";
			}
		}
		
		echo json_encode($result);
	}
	
	function getlist() {
		header("Content-type: application/json");
		$filename = pregger($_POST['filename']);
		$filelist = glob("..\\files\\*{$filename}*", GLOB_NOSORT);
		echo json_encode($filelist);
	}
	
	function error() {
		//header("Location: ../index.html");
		//return;
		$files = [];
		foreach(new DirectoryIterator("..\\files\\") as $file) {
			if ($file->isDot()) continue;
			$filename = $file->getFilename();
			$fileextension = $file->getExtension();
			if (strlen(round($file->getSize()/1024)) >= 4) {
				$filesize = round($file->getSize()/1024/1024, 2) . " Mb";
			} else {
				$filesize = round($file->getSize()/1024, 2) . " Kb";
			}
			$filepath = $file->getPathname();
			$file = [$filename, $fileextension, $filesize, $filepath];
			array_push($files, $file);
		}
		var_dump(json_encode($files));
	}
	
	
?>