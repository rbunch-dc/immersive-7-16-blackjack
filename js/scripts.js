// Set messages after game over
// The table/game looks like Rob made it. Change this.
// What about those stupid 11, 12, 13?
// What about Aces?
// The player can hit forever?
// There is no win counter/bet system
// There is no "deck" to draw from
// The cards aren't red or black like they should/could be
// The cards are lame. Find images.
// There is no delay on showing the cards... it's instant. 
// You can see the dealers 2nd card on deal. That's unfair (to the house).


// 1. When the user clicks deal, deal.
var theDeck =[];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13C
		shuffleDeck(); //Shuffle the deck!
		console.log(theDeck);

		//Push onto the playersHand array, the new card. Then place it in the DOM.
		playersHand.push(theDeck[0]);
		placeCard('player', 'one', theDeck[0]);
		
		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1]);

		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2]);

		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3]);

		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');

	});

	$('.hit-button').click(function(){
		
		var slotForNewCard = '';
		if(playersHand.length == 2){slotForNewCard = "three";}
		else if(playersHand.length == 3){slotForNewCard = "four";}
		else if(playersHand.length == 4){slotForNewCard = "five";}
		else if(playersHand.length == 5){slotForNewCard = "six";}
		placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
		playersHand.push(theDeck[topOfTheDeck]);
		calculateTotal(playersHand, 'player');
		topOfTheDeck++;

	});

	$('.stand-button').click(function(){
		//Player clicked on stand. WHat happens to the player? Nothing.
			var slotForNewCard = "";
			var dealerTotal = calculateTotal(dealersHand, 'dealer');
			while(dealerTotal < 17){
				// Dealer has less than 17. Hit away!
				if(dealersHand.length == 2){slotForNewCard = "three";}
				else if(dealersHand.length == 3){slotForNewCard = "four";}
				else if(dealersHand.length == 4){slotForNewCard = "five";}
				else if(dealersHand.length == 5){slotForNewCard = "six";}
				placeCard('dealer',slotForNewCard,theDeck[topOfTheDeck]);
				dealersHand.push(theDeck[topOfTheDeck]);
				dealerTotal = calculateTotal(dealersHand, 'dealer');
				topOfTheDeck++;
			}

			// Dealer has at least 17 Check to see who won.
			checkWin();
	});

});

function checkWin(){
	alert("Game over");
	// Get player total
	var playersTotal = calculateTotal(playersHand, 'player');	
	// Get dealer total
	var dealerTotal = calculateTotal(dealersHand, 'dealer');

	if(playersTotal > 21){
		//player has busted.
		// Set a message somewhere that says this.
	}else if(dealerTotal > 21){
		// Dealer has busted. 
		// Set a message somewhere that says this
	}else{
		// Neither player has more than 21.
		if(playersTotal > dealerTotal){
			// Player won. Say this somewhere
		}else if(dealerTotal > playersTotal){
			//Dealer won. Say this somewhere
		}else{
			// Push. (tie) Say this somwhere.
		}
	}


}

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;

	// Write logic to fix the 11, 12, 13 issue

	$(classSelector).html('<img src="cards/'+cardToPlace+'.png">');
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
	// console.log(theDeck);
}

function calculateTotal(hand, whosTurn){
	// console.log(hand);
	// console.log(whosTurn);
	var hasAce = false; //init Ace as false.
	var total = 0;
	var cardValue = 0;
	for(var i = 0; i<hand.length; i++){
		cardValue = Number(hand[i].slice(0,-1));
		if((cardValue == 1) && ((total + 11) <= 21)){
			//THis card is an ace!! Check if 11 will fit. If not, it's a 1
			cardValue = 11;
			hasAce = true;
		}else if(cardValue > 10){
			cardValue = 10;
		}else if ((cardValue + total > 21) && (hasAce)){
			total = total - 10;
			hasAce = false;
		}
		total += cardValue;
	}

	// Update the HTML with the new total
	var elementToUpdate = '.'+whosTurn+'-total-number';
	$(elementToUpdate).text(total);
	
	return total;
}