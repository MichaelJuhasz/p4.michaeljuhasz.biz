<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>
	<meta charset='UTF-8'>	
	<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script> 
	<script src="/js/jquery.form.js" type="text/javascript"></script>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/css/general.css">
	<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>	<!-- Controller Specific JS/CSS -->
	<link href='http://fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
	<?php if(isset($client_files_head)) echo $client_files_head; ?>

</head>

<body>	
	<?php if(isset($content1)) echo $content1; ?>
	<?php if(isset($content2)) echo $content2; ?>
	<?php if(isset($content3)) echo $content3; ?>		

	<?php if(isset($client_files_body)) echo $client_files_body; ?>
	<script src="http://code.jquery.com/jquery-2.0.3.min.js" type="text/javascript"></script> 
</body>
</html>