var cardCount = 0;
// Ready the flippling 
var flipped = false;
	var cards;

$(document).ready(function(){

	$.ajax({
		url: "/cards/get_cards/",
		success: function(response){
			cards = JSON.parse(response);
			getACard(cardCount);

			// // Cool, but not what I want...
			// var result = $.grep(cards, function(e){
			// 	return e.english == "Net, lace ";
			// });
			// console.log(result);

			var result = myIndexOf("Horn ");
			console.log(result);
		}
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
				data: $("#add_form").serialize(),
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
					cards.splice(cards.length,0,{english: eng_word, farsi: far_word})
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

	$("#delete").click(function(){
		if (cards != undefined){
				$.ajax({
					type: 'POST',
					url: '/cards/delete_card/',
					data: {english_word: cards[cardCount].english}
				});
			cards.splice(cardCount,1);
			endOfStack();
			getACard(cardCount);

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

	$("#search_button").click(function(){
		var search_word = $("#search").val();
		var index = myIndexOf(search_word);
		if (index == -1){
			$("#search_error").html("Couldn't find that word in your stack");
		} else{
			$("#search_error").html("");
			cardCount = index; 
			getACard(index);
		}
	});
});	

function getACard(cardCount){
// Grab key/value pair out of localStorage using the 
// index passed in the function call.  Set html of 
// "flippy_card" with one value and return the other.

	var english_word = cards[cardCount].english;
	var farsi_word = cards[cardCount].farsi;
	$(".front").html(english_word);
	$(".back").html(farsi_word);	
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
	// if (cardCount >= cards.length-1) cardCount = 0;
	// else cardCount++;
	endOfStack();
	if(!flipped){
		$("#next_card").html($(".front").text())
				   .css("z-index", "100");
	} else {
		$("#next_card").html($(".back").text())
				   .css("z-index", "100");
	}
	
	getACard(cardCount);
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
					getACard(cardCount);
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
	for (var i = 0; i < cards.length; i++){
		if (cards[i].english == search_word || cards[i].farsi == search_word){
			return i;
		}
	}
	return -1;
}

// function search(search_word){
// 	var index = myIndexOf(search_word);
// 	if (index == -1){
// 		$("#search_error").html("Couldn't find that word in your stack");
// 	} else{
// 		$("#search_error").html("");
// 		cardCount = index; 
// 		getACard(index);
// 	}
// }

