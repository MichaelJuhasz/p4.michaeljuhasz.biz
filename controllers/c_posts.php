<?php
class posts_controller extends base_controller {

    public function __construct() {
        parent::__construct();

        # Make sure user is logged in if they want to use anything in this controller
        if(!$this->user) {
            die("Members only. <a href='/users/login'>Login</a>");
        }
    }

    public function p_add() {

        # Associate this post with this user
        $_POST['user_id']  = $this->user->user_id;

        # Unix timestamp of when this post was created / modified
        $_POST['created']  = Time::now();
        $_POST['modified'] = Time::now();

        # Insert
        # Note we didn't have to sanitize any of the $_POST data because we're using the insert method which does it for us
        DB::instance(DB_NAME)->insert('posts', $_POST);

        # Send 'em back
        
        Router::redirect("/users/profile");
    }

    public function follow($user_id_followed) {

        # Prepare the data array to be inserted
        $data = Array(
            "created" => Time::now(),
            "user_id" => $this->user->user_id,
            "user_id_followed" => $user_id_followed
            );

        # Do the insert
        DB::instance(DB_NAME)->insert('users_users', $data);

        # Send them back
        Router::redirect("/users/profile");

    }

public function unfollow($user_id_followed) {

        # Delete this connection
        $where_condition = 'WHERE user_id = '.$this->user->user_id.' AND user_id_followed = '.$user_id_followed;
        DB::instance(DB_NAME)->delete('users_users', $where_condition);

        # Send them back
        Router::redirect("/users/profile");

    }
}