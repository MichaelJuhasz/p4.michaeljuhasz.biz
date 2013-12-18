var cardCount = 0;
// Ready the flippling 
var flipped = false;
var cards;
var highUnit = 1; 
var currentUnit = 1;
var units = [];
var unit_select = false;

$(document).ready(function(){

	$.ajax({
		url: "/cards/get_cards/",
		success: function(response){
			cards = JSON.parse(response);
			

			// Sort the array by unit
			cards = cards.sort(function(obj1, obj2){
				return obj1.unit - obj2.unit;
			});

			console.log(cards);

			// Set up the unit selector by looping through cards
			// and seeing what the highest unit number is
			for(i = 0; i < cards.length; i++){
				if(parseInt(cards[i].unit) > highUnit) highUnit = parseInt(cards[i].unit);
			}

			// Then...
			for(i = 1; i <= highUnit; i++)
			{
				$("#input_field").append('<li><label for="unit'+i+'">Unit '+i+'</label><input type="checkbox" id="unit'+i+'" value="'+i+'"></li>')
				// units[i] = i;
			}
			
			getACard();
		}
	});

	$("#unit_button").click(function(){
		units = $("input:checked").map(function(){
			return $(this).val();
		}).get();

		console.log(units);

		if(units.length > 0) unit_select = true;
		else unit_select = false;

		unitCheck(true);
		getACard();
	});

	$("#search_button").click(function(){
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
		currentUnit = highUnit + 1;
		highUnit = currentUnit;
		$("#current_unit").html("Current unit: "+currentUnit);
		$("#input_field").append('<li><label for="unit'+currentUnit+'">Unit '+currentUnit+'</label><input type="checkbox" id="unit'+currentUnit+'" value="'+currentUnit+'"></li>'); 
	});

	$("#submit_button").click(function(){

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
		// previous();	
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
// Grab key/value pair out of localStorage using the 
// index passed in the function call.  Set html of 
// "flippy_card" with one value and return the other.

	var english_word = cards[cardCount].english;
	var farsi_word = cards[cardCount].farsi;
	currentUnit = parseInt(cards[cardCount].unit);	
	$(".front").html(english_word);
	$(".back").html(farsi_word);
	$("#current_unit").html("Current unit: "+currentUnit);
	console.log("selected card: "+cardCount);
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
// and increments cardCount and then calls getACard with
// the incremented value, to return the next card in the set
	endOfStack();
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
// The principle difference is that I have to cheat and 
// get the text for the "next_card" from localStorage,
// since if I call the function before the card has been 
// put back on top of the stack, the animation doesn't 
// make sense.
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

function endOfStack(){
	if (cardCount >= cards.length-1) cardCount = 0;
	else cardCount++;
}

// http://stackoverflow.com/questions/12604062/javascript-array-indexof-doesnt-search-objects 
function myIndexOf(search_word){
	var lc_search_word = search_word.toLowerCase();
	for (var i = 0; i < cards.length; i++){
		if (cards[i].english.toLowerCase().indexOf(lc_search_word) == 0 || cards[i].farsi.indexOf(search_word) == 0){
			return i;
		}
	}
	return -1;
}

function myIndexUnit(unit){
	for (var i = 0; i < cards.length; i++){
		if (cards[i].unit == unit) return i;
	}
}


function unitCheck(forward){
	while(units.indexOf(cards[cardCount].unit) == -1){
		console.log("skipped card: "+cardCount);
		if(forward == true){
			if (cardCount >= cards.length-1) cardCount = 0;
			else cardCount++;
		}
		else {
			if(cardCount <= 0) cardCount = cards.length - 1;
			else cardCount--;
		}
	}
}

