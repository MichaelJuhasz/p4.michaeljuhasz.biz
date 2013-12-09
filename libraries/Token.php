<?php

class Token {
	public static function look_for_token($email, $password){
		        $q = "SELECT token 
            FROM users
            WHERE email = '".$email."'
            AND password = '".$password."'";

        $token = DB::instance(DB_NAME)->select_field($q);

        return $token;
	}
} #eoc