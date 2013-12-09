<form method='POST' action='/users/p_signup'>
	<div id='signup'>
		<input type='text' name='first_name' placeholder='First Name' required>

		<input type='text' name='last_name' placeholder='Last Name' required>

		<input type='email' name='email' placeholder='Email' required>

		<input type='password' name='password' placeholder='Password' required>

		<input id='signUpButton' type='submit' class='btn btn-info' value='Sign up'>
	</div>
</form>	 

<?php if($error == "errorEmail"): ?>
	<div>
		<p class='error'>The email you entered is already in our system.</p>
	</div>
<?php endif; ?>