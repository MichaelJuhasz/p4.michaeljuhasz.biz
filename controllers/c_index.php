<?php

class index_controller extends base_controller {
	
	/*-------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------*/
	public function __construct() {
		parent::__construct();
	} 
		
	/*-------------------------------------------------------------------------------------------------
	Accessed via http://localhost/index/index/
	-------------------------------------------------------------------------------------------------*/
	public function index() {
		
		# Check to see if user is logged in; if so, send him or her to profile
			if ($this->user){
				Router::redirect ('/users/profile');
			}
		
		# Otherwise, send 'em to signup/in
			else Router::redirect ('/users/signin');

	} # End of method
	
	
} # End of class
