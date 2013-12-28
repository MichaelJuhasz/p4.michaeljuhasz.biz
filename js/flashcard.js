var cardCount = 0;
// Ready the flippling 
var flipped = false;
var cards;
var highUnit = 1; 
var currentUnit = 1;
var units = [];
var unit_select = false;

$(document).ready(function(){
	// Start off by grabbing the cards from the database 
	$.ajax({
		url: "/cards/get_cards/",
		success: function(response){
			// Make an array of the results sent from PHP
			cards = JSON.parse(response);
			
			// Sort the array by unit
			cards = cards.sort(function(obj1, obj2){
				return obj1.unit - obj2.unit;
			});

			// Set up the unit selector by looping through cards
			// and seeing what the highest unit number is
			for(i = 0; i < cards.length; i++){
				if(parseInt(cards[i].unit) > highUnit) highUnit = parseInt(cards[i].unit);
			}

			// Then, for all the units between 1 and highUnit, and a 
			// corresponding checkbox with that value.
			for(i = 1; i <= highUnit; i++)
			{
				$("#input_field").append('<li><label for="unit'+i+'">Unit '+i+'</label><input type="checkbox" id="unit'+i+'" value="'+i+'"></li>')
				// units[i] = i;
			}
			
			// Finally, get the first card.
			getACard();
		}
	});

	$("#unit_button").click(function(){
		// Build an array of the checked values
		units = $("input:checked").map(function(){
			return $(this).val();
		}).get();

		// Check to see if current card is valid, else get a new one
		unitCheck(true);
		getACard();
	});

	$("#search_button").click(function(){
		// Pretty cut and dry. 
		var search_word = $("#search").val();
		if (search_word != "") {
			var index = myIndexOf(search_word);
			if (index == -1){
				$("#search_error").html("Couldn't find that word in your stack");
			} else{
				$("#search_error").html("");
				cardCount = index; 
				getACard();
			}
		}
		$("#search").val("");	
		return false;
	});

	$("#new_unit").click(function(){
		// Increment the higest unit and display it (by setting currentUnit to highUnit)
		// then update unit selection list.

		currentUnit = highUnit + 1;
		highUnit = currentUnit;
		$("#current_unit").html("Current unit: "+currentUnit);
		$("#input_field").append('<li><label for="unit'+currentUnit+'">Unit '+currentUnit+'</label><input type="checkbox" id="unit'+currentUnit+'" value="'+currentUnit+'"></li>'); 

	});

	$("#submit_button").click(function(){
		// Animation only works if the screen is beyond a certain width
		var med_query = window.matchMedia("(min-width: 992px)");
		var eng_word = $("#english_word").val();
		var far_word = $("#farsi_word").val();

		if (eng_word != "" && farsi_word != ""){
			$("#error_text").css('visibility','hidden');
			$.ajax({
				type: 'post',
				url: '/cards/p_add/',
				data: $("#add_form").serialize()+"&unit="+currentUnit,
				beforeSend: function(){
					if (med_query.matches){
						$("#new_card").html(eng_word)
									  .fadeIn("slow")
									  .animate({
										  left:'45%',
										  bottom:'250px'
										}, 1000)
									  .fadeOut()
									  .animate({
									  	  left:'0px',	
									  	  bottom: '0px'
									  });
					}
				},
				success: function(response){
					$("#add_form").trigger("reset");
					// Include the new card in the array so that a database query
					// needn't be done.
					cards.splice(cards.length,0,{english: eng_word, farsi: far_word, unit: currentUnit})
				}
			});
		}

		else $("#error_text").css('visibility','visible');
	});	


	
    $(".hover").click(function(){
    	if (cards != undefined)flip();
    });

	$("#next").click(function(){
		if (cards != undefined)next();
	});

	$("#last").click(function(){
		if (cards != undefined)previous();
	});

	$("#last_unit").click(function(){
		currentUnit--;
		if(currentUnit < 1) currentUnit = highUnit;
		cardCount = myIndexUnit(currentUnit);
		unitCheck(false);
		getACard();	
	});

	$("#next_unit").click(function(){
		currentUnit++;
		if(currentUnit > highUnit) currentUnit = 1;
		cardCount = myIndexUnit(currentUnit);

		unitCheck(true);
		getACard();

	});

	$("#delete").click(function(){
		if (cards != undefined){
				$.ajax({
					type: 'POST',
					url: '/cards/delete_card/',
					data: {english_word: cards[cardCount].english}
				});
			cards.splice(cardCount,1);
			endOfStack();
			getACard();

		}
	});

	// Keyboard can be used instead of mouse!
	$(window).keydown(function(e){
		var key = e.keyCode;
		if (cards != undefined){
			switch (key)
			{
				case 39:
					next();
					break;
				case 37:
					previous();
					break;
				case 38: case 40:
					flip();
					break;
			}
		}
	});

});	

function getACard(){
// Grab the english, farsi and unit properties of the 
// element in the array.  Set up the front and back of 
// the card and set Current unit to whatever's on the card

	var english_word = cards[cardCount].english;
	var farsi_word = cards[cardCount].farsi;
	currentUnit = parseInt(cards[cardCount].unit);	
	$(".front").html(english_word);
	$(".back").html(farsi_word);
	$("#current_unit").html("Current unit: "+currentUnit);
}

function flip(){
    if (!flipped){
		$(".hover").addClass("flip");
		flipped = !flipped;
	} else{
		$(".hover").removeClass("flip")
		flipped = !flipped;
	} 
}

function next(){
// Hitting the next button activates some fancy animation
// and increments cardCount, checks to see if the card is
// of one of the selected units, otherwise goes to the next 
// card and then calls getACard with the incremented value, 
// to return the next card in the set.
	if (cardCount >= cards.length-1) cardCount = 0;
	else cardCount++;

	unitCheck(true);
	
	if(!flipped){
		$("#next_card").html($(".front").text())
				   .css("z-index", "100");
	} else {
		$("#next_card").html($(".back").text())
				   .css("z-index", "100");
	}
	
	getACard();
	$("#next_card").animate({left: '300px'}, function(){
		$("#next_card").css("z-index","-1")
					   .animate({left: '15'});
	});
}

function previous(){
// Basically as above.  Animation is reversed (sort of)
// cardCount is decremented and a card is gotten.

	if(cardCount <= 0) cardCount = cards.length - 1;
	else cardCount--;

	unitCheck(false);
	if(!flipped){
		$("#next_card").html(cards[cardCount].english);	
	} else {
		$("#next_card").html(cards[cardCount].farsi);
	}
	
	$("#next_card").animate({left: '-300px'},
		 function(){
			$("#next_card").css("z-index", "100") 
				   		   .animate({left: '15px'},
				function(){
					getACard();
					$("#next_card").css("z-index", "-1");
				   });
		});
}

// function endOfStack(){
// 	if (cardCount >= cards.length-1) cardCount = 0;
// 	else cardCount++;
// }

function myIndexOf(search_word){
	// indexOf is great, but doesn't work with objects, which 
	// are what I have in the array 
	var lc_search_word = search_word.toLowerCase();
	for (var i = 0; i < cards.length; i++){
		if (cards[i].english.toLowerCase().indexOf(lc_search_word) == 0 || cards[i].farsi.indexOf(search_word) == 0){
			return i;
		}
	}
	return -1;
}

function myIndexUnit(unit){
	// Same deal as above.
	for (var i = 0; i < cards.length; i++){
		if (cards[i].unit == unit) return i;
	}
}


function unitCheck(forward){
	// We check to see if the unit property of the object 
	// at the present position of the array (cardCount) has 
	// a unit value which matches one of the values in the 
	// units array.  If not, grab either the previous or the 
	// next card, depending on what's passed as an argument.
	$("#unit_error").html("");
	if(units.length > 0){
		var count = 0;
		while(units.indexOf(cards[cardCount].unit) == -1 && count <= cards.length){
			// console.log("skipped card: "+cardCount);
			if(forward == true){
				if (cardCount >= cards.length-1) cardCount = 0;
				else cardCount++;
			}
			else {
				if(cardCount <= 0) cardCount = cards.length - 1;
				else cardCount--;
			}
			count++;
		}
		if (count > cards.length){
			$("#unit_error").html("There are no cards in this range!");
		}
	}
}

