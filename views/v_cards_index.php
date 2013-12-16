<div class="container">
	<div class="row pseudo-nav">
		<div class="col-md-1 col-md-offset-1">
			<!-- <img src='/images/logo_medium.png' alt='BRAND'> -->
		</div>
		<div class="col-md-4 col-md-offset-3">
			<button class="btn btn-default" id="new_unit" title="Start a new unit">+</button>
			<h2 id="current_unit"></h2>
		</div>
		<a href='/users/logout' class="col-md-1 col-md-offset-2">Log out</a>
	</div>
<!--  </div> -->
<!-- <div class="container"> -->
	<div class="row">
		<div class="card col-md-3" id="card_maker">
			<div id="error_text">Please input English and Farsi words</div>
			<form method="post" action="/cards/p_add" id="add_form">
				<input type="text" id="english_word" name="english" placeholder="English...">
				<input type="text" id="farsi_word" name="farsi" placeholder="فارسی..." class="farsi keyboardInput">
				<a href="#" id="submit_button">Add card</a>
			</form>
		</div>
		
		<div class="card-container col-md-3 col-md-offset-3">
			<div class='panel hover'>
				<div class="card front"></div>
				<div class="card back"></div>
			</div>

			<div class="card" id="next_card"></div>
			<button class='btn btn-default' id='last_unit'>&lt;&lt;</button>
			<button class='btn btn-default' id='last'>&lt;</button>
			<button class='btn btn-default' id='next'>&gt;</button>
			<button class='btn btn-default' id='next_unit'>&gt;&gt;</button>
			<button class='btn btn-danger' id='delete' title='delete current card'>X</button>
		</div>
		<div id="unit_controls" class="col-md-3 col-md-offset-1">
			<div id="search_error"></div>
			<form id='searchbar'>
				<div class='input-group'>
					<input type='text' id='search' class='form-control' placeholder='Search'>
					<div class='input-group-btn'>					
						<button class='btn btn-default' id='search_button'><i class='glyphicon glyphicon-search'></i></button>
					</div>
				</div>	
			</form>
			<div>
				<ul id="input_field"></ul>
				<button class="btn btn-default" id="unit_button">Get cards</button><br>				
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="card col-md-3" id="new_card"></div>
</div>
