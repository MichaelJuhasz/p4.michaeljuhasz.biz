<?php
class cards_controller extends base_controller {

    public function __construct() {
        parent::__construct();
    } 

    public function p_add(){
    	$_POST['user_id'] = $this->user->user_id;

    	$_POST = DB::instance(DB_NAME)->sanitize($_POST);

    	DB::instance(DB_NAME)->insert('cards',$_POST);
    }

    public function get_cards(){
    	$cards = Card::get_cards_by_user($this->user->user_id);
    	echo json_encode($cards);
    }

    public function delete_card(){
    	$english_word = $_POST['english_word'];
    	DB::instance(DB_NAME)->delete('cards', "WHERE english = '".$english_word."'");
    }
} # eoc

?>