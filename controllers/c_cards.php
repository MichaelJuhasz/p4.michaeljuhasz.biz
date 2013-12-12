<?php
class cards_controller extends base_controller {

    public function __construct() {
        parent::__construct();
    } 

    public function p_add($first_time = NULL){
    	$_POST['user_id'] = $this->user->user_id;

    	if($first_time == NULL){
            $_POST = DB::instance(DB_NAME)->sanitize($_POST);
            DB::instance(DB_NAME)->insert('cards',$_POST);
        }

        else {
            $_POST['unit'] = 1;
            $_POST['english'] = "Example";
            $_POST['farsi'] = "نمونه";  

            DB::instance(DB_NAME)->insert('cards',$_POST);
            Router::redirect ('/users/profile');
        }
    }

    public function get_cards($units = NULL){
        if($units == NULL){
            $cards = Card::get_cards_by_user($this->user->user_id);
        }
    	else {
            $cards = Card::get_cards_by_unit($this->user->user_id, $units);
        }
    	echo json_encode($cards);
    }

    public function delete_card(){
    	$english_word = $_POST['english_word'];
    	DB::instance(DB_NAME)->delete('cards', "WHERE english = '".$english_word."'");
    }
} # eoc

?>