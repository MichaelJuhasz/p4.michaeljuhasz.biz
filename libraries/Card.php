<?php

class Card {
	public static function get_cards_by_user($user_id){
		$q = "SELECT 
                cards.english,
                cards.farsi
            FROM cards
            WHERE cards.user_id = '".$user_id."'
            ORDER BY cards.card_id DESC";

        # Run the query, store the results in the variable $posts
        $cards = DB::instance(DB_NAME)->select_rows($q);

        return $cards;
	}
}