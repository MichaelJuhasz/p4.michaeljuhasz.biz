<?php
	$mysqli = new mysqli("localhost","root","123", "p3_michaeljuhasz_biz");
	
	if(mysqli_connect_errno()) {
		die("SQL Error: ".mysqli_connect_error());
	}

	$mysqli->set_charset("utf8");

	// $english = $_POST["eng_word"];
	// $farsi = $_POST["far_word"];

	// $mysqli->query("INSERT INTO translations VALUES(NULL,'".$english."','".$farsi."')");
	$result = $mysqli->query("SELECT english, farsi FROM translations");
	$row 	= $result->fetch_array(MYSQLI_ASSOC);
	printf("%s (%s)\n", $row["english"], $row["farsi"]);

?>