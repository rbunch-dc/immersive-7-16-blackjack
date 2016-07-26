// 1. When the user clicks deal, deal.
var theDeck =[];

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13C
		shuffleDeck(); //Shuffle the deck!
		console.log(theDeck);
		placeCard('player', 'one', theDeck[0]);
		placeCard('dealer', 'one', theDeck[1]);

		placeCard('player', 'two', theDeck[2]);
		placeCard('dealer', 'two', theDeck[3]);
	});

	$('.hit-button').click(function(){
		placeCard('player', 'three', theDeck[4]);

	});

	$('.stand-button').click(function(){

	});

});

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;
	$(classSelector).html(cardToPlace);
}

function createDeck(){
	// Fill the with 
	// - 52 cards.
	// - 4 suits
	// 	- h, s, d, c
	var suits = ['h','s','d','c'];
	for(s=0; s<suits.length; s++){
		for(c=1; c<=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
// [1]
// [2]
// [3]
// ...
// [50]
// [51]
// [52]

	for(var i=1; i<1000; i++){
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
	console.log(theDeck);
}