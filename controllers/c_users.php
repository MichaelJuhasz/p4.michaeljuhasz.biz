<?php
class users_controller extends base_controller {

    public function __construct() {
        parent::__construct();
    } 

    public function signin($error = NULL) {
        # Setup view 

        $this->template->content1 = View::instance('v_users_signup');
        $this->template->content2 = View::instance('v_users_login');
        $this->template->title = "Flash Cards - Sign In";

        $this->template->content1->error = $error;
        $this->template->content2->error = $error;

        $client_files_head = Array("/css/signin.css");
        $this->template->client_files_head = Utils::load_client_files($client_files_head); 

        # Render template
        echo $this->template;
    }

    public function p_signup(){

        # Extra junk to add to DB 
        $_POST['created'] = Time::now();
        $_POST['modified'] = Time::now();

        # Encrypt the password
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Create an encryption token
        $_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());

        # Check to see if this email is already in DB
        $q = "SELECT user_id FROM users WHERE email = '".$_POST['email']."'";

        $error = DB::instance(DB_NAME)->select_field($q);

        if ($error){
            Router::redirect('/users/signin/errorEmail');
        } else {

        }
        # Insert this user into the database (and introduce him to Tron...)
        DB::instance(DB_NAME)->insert('users',$_POST);

        # Now let's go ahead and sign in
        $token = Token::look_for_token($_POST['email'], $_POST['password']);
        setcookie("token", $token, strtotime('+1 year'), '/');

        Router::redirect ('/cards/p_add/first_time');
    }   

    public function p_login(){
        # Sanitize the user entered data
        $_POST = DB::instance(DB_NAME)->sanitize($_POST);

        # Hash submitted password so we can compare it agains db
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Search the db for this email and password
        # Grab token, if it's there
        $token = Token::look_for_token($_POST['email'], $_POST['password']);

        # If we don't find a token, login fails
        if (!$token){
            Router::redirect("/users/signin/errorLogin");

        # Otherwise, login
        } else {
        setcookie("token", $token, strtotime('+1 year'), '/');

        # Send them to the main page - or wherever
        Router::redirect("/users/profile");    
        }
    }

    public function logout() {
        # Generate and save a new token for next login
        $new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());

        # Create the data array we'll use with the update method
        # In this case, we're only updating one field, so our array has one entry
        $data = Array("token"=>$new_token);

        # Update 
        DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");

        # Delete the token cookie by setting to to a date in the past
        setcookie("token", "", strtotime("-1 year"), "/");

        # Send them back to index
        Router::redirect("/"); 
    }

    public function profile() {
    # This view is only accessable to logged in users 
        if(!$this->user){
            Router::redirect('/users/signin/errorProtected');
        } 

        $this->template->title = "Flash Cards - ".$this->user->first_name;

        $this->template->content1 = View::instance('v_cards_index');
        $cards = Card::get_cards_by_user($this->user->user_id);

        $client_files_head = Array('/keyboard/keyboard.css','/css/flashcard.css');
        $this->template->client_files_head = Utils::load_client_files($client_files_head); 
        
        $client_files_body = Array('/js/flashcard.js','/keyboard/keyboard.js');
        $this->template->client_files_body = Utils::load_client_files($client_files_body);
        

        echo $this->template;

    }

} # end of the class