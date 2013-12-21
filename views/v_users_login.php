		<form id='login' method = 'POST' action = '/users/p_login'>
			<input type='text' name= 'email' placeholder='Email'>

			<input type = 'password' name = 'password' placeholder = 'Password'>

			<input type='submit' class='btn btn-default col-md-5 col-md-offset-11' value = 'Log in' >
		</form>

		<?php if($error == "errorLogin"): ?>
			<div class = 'col-md-10 col-md-offset-2'>
				<p class='error'>Login Failed.  The email or password you enetered was incorrect.</p>
			</div>
		<?php elseif($error == "errorProtected"): ?>
			<div class = 'col-md-10 col-md-offset-2'>
				<p class='error'>You must be logged in to see this content</p>
			</div>	
		<?php endif; ?>
	</div>
</div>