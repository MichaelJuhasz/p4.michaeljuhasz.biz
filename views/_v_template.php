<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>
	<meta charset='UTF-8'>	
	<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script> 
	<script src="/js/jquery.form.js" type="text/javascript"></script>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/css/flashcard.css">
	<link rel="stylesheet" type="text/css" href="/css/general.css">
	<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>	<!-- Controller Specific JS/CSS -->
	<link href='http://fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
	<?php if(isset($client_files_head)) echo $client_files_head; ?>

</head>

<body>	
<!-- 	<div class='navbar navbar-inverse navbar-fixed-top' role ='navigation'>
		<div class='navbar-header'>
			<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#nvbr'>
				<span class='sr-only'>Toggle navigation</span>
				<span class='icon-bar'></span>
				<span class='icon-bar'></span>
				<span class='icon-bar'></span>
			</button>
			<a class='navbar-brand' rel='home' href='/'><img src='/images/logoIcon50.png' alt='BRAND'></a>
			<div class='collapse navbar-collapse' id='nvbr'>

				<ul class='nav navbar-nav'>

					<?php if($user): ?>
						<li><a href='/users/profile'><?=$user->first_name;?></a></li>
						<li><a href='/users/logout'>Logout</a></li>

					<?php endif; ?>
				</ul>
				<div class='col-md-3'>
					<form id='searchbar' class='navbar-form' role='search' method='POST' action='/users/p_search'>
						<div class='input-group'>
							<input type='text' name='search' class='form-control navbar-search' placeholder='name, bio, location...'>
							<div class='input-group-btn'>
								<button class='btn btn-default' type='submit'><i class='glyphicon glyphicon-search'></i></button>
							</div>
						</div>	
					</form>
				</div>
			</div>	
		</div>
	</div> -->
	
	<!-- <div class='container'>	 -->
		<?php if(isset($content1)) echo $content1; ?>
		<?php if(isset($content2)) echo $content2; ?>
		<?php if(isset($content3)) echo $content3; ?>		
	<!-- </div>	 -->

	<?php if(isset($client_files_body)) echo $client_files_body; ?>
	<script src="http://code.jquery.com/jquery-2.0.3.min.js" type="text/javascript"></script> 
</body>
</html>