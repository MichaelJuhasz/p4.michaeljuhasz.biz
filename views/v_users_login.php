<form id='login' method = 'POST' action = '/users/p_login'>
	<input type='text' name= 'email' placeholder='Email'>

	<input type = 'password' name = 'password' placeholder = 'Password'>

	<input type='submit' class='btn btn-info' value = 'Log in' >
</form>

<?php if($error == "errorLogin"): ?>
	<div class = 'col-md-3 col-md-offset-7'>
		<p class='error'>Login Failed.  The email or password you enetered was incorrect.</p>
	</div>
<?php elseif($error == "errorProtected"): ?>
	<div class = 'col-md-3 col-md-offset-7'>
		<p class='error'>You must be logged in to see this content</p>
	</div>	
<?php endif; ?>