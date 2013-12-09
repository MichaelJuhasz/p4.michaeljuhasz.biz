<div class="container">
	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<h1>English - Farsi Flash Cards</h1>
			<p>Use the new card widget on the right to add news cards (make sure to include both English and Farsi on each card).</p>
			<p>Click on a card, or press the up or down arrow keys to see the other side.  Cycle through the cards by clicking the arrow buttons, or by using the arrow keys.</p>
			<form id='searchbar' class='navbar-form' role='search'>
				<div class='input-group'>
					<input type='text' id='search' class='form-control navbar-search' placeholder='Search'>
					<div class='input-group-btn'>
						<button class='btn btn-default' type='submit' id='search_button'><i class='glyphicon glyphicon-search'></i></button>
					</div>
				</div>	
			</form>
			<div id="search_error"></div>
		</div>
	</div>
	<div class="row">
		<div class="card col-md-3" id="card_maker">
			<div id="error_text">Please input English and Farsi words</div>
			<form method="post" action"/cards/p_add" id="add_form">
				<input type="text" id="english_word" name="english" placeholder="English...">
				<input type="text" id="farsi_word" name="farsi" placeholder="فارسی..." class="farsi keyboardInput">
				<a href="#" id="submit_button">Add card</a>
			</form>
			<div id="result"></div>
		</div>
		
		<div class="card-container col-md-3 col-md-offset-3">
			<div class='panel hover'>
				<div class="card front"></div>
				<div class="card back"></div>
			</div>

			<div class="card" id="next_card"></div>

			<button class='btn btn-primary' id='last'>&lt;-</button>
			<button class='btn btn-primary' id='next'>-&gt;</button>
			<button class='btn btn-danger' id='delete' title='delete current card'>X</button>
		</div>
	</div>	
	<div class="row">
		<div class="card col-md-3" id="new_card"></div>
	</div>
</div>