<div class='container'>
	<div class='row'>
		<div id='logo' class='col-md-6'>
			<img src='/images/Logo.png' alt='Farsi Flash Cards'>
		</div>

	<div class='col-md-3 col-md-offset-1'>
		<div id='signup-menu'>

			<form method='POST' action='/users/p_signup'>
				<div id='signup' >
					<input type='text' name='first_name' placeholder='First Name' required>

					<input type='text' name='last_name' placeholder='Last Name' required>

					<input type='email' name='email' placeholder='Email' required>

					<input type='password' name='password' placeholder='Password' required>

					<input id='signUpButton' type='submit' class='btn btn-default col-md-5 col-md-offset-11' value='Sign up'>
				</div>
			</form>	 
		</div>

	<?php if($error == 'errorEmail'): ?>
		<div class = 'col-md-8 col-md-offset-2'>
			<p class='error'>The email you entered is already in our system.</p>
		</div>
	<?php endif; ?>	
