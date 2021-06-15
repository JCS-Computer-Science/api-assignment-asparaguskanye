var data
var drawURL
var cardOneValue
var cardTwoValue
var teamOnePoints = 0;
var teamTwoPoints = 0;
document.getElementById("draw").style.visibility = "hidden";
document.getElementById('text').innerHTML = "Click shuffle to begin! Sometimes the API will have an error, in that case you must refresh the page";

// This object converts the string data from the API to integers, it is important for face cards because they cannot be parsed

const faceCards = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'JACK': 11,
    'QUEEN': 12,
    "KING": 13,
    "ACE": 14,
}

// the function that runs when you hit the shuffle button

async function shuffle(){
    // hides the button so it cannot be clicked again
    document.getElementById('text').innerHTML = "";
    document.getElementById("shuffle").style.visibility = "hidden";
    // gets a deck from the api to use
    var response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    var data = await response.json();
    console.log(data);
    // creats a drawURL for the draw function to use
    drawURL = 'https://deckofcardsapi.com/api/deck/' + data.deck_id + '/draw/?count=1'
    console.log(drawURL);
    // makes the draw button visible
    document.getElementById("draw").style.visibility = "";
}


async function draw() {
    // hides the button so it cannot be double clicked
    document.getElementById("draw").style.visibility = "hidden";
    document.getElementById("text").style.visibility = "hidden";

    // gets a card from the api
    console.log('drawing');
    console.log(drawURL);
    var response = await fetch(drawURL);
    data = await response.json();
    // ensures the deck is not out of cards, if it is it breaks the function and runs "noCards"
    if(data.cards[0] == undefined){
        noCards();
        return;
    }
    // sets the picture and value to a varriabele
    var card1 = data.cards[0].image;
    cardOneValue = faceCards[data.cards[0].value];

    // gets a second card
    console.log(drawURL);
    response = await fetch(drawURL);
    data = await response.json();
    cardTwoValue = faceCards[data.cards[0].value];
    var card2 = data.cards[0].image;

    // changes the pictures
    document.getElementById('card1').src = card1;
    document.getElementById('card2').src = card2;

    // checks who won the round
    checkWin()

    // makes the button and the winner text visible
    document.getElementById("draw").style.visibility = "";
    document.getElementById("text").style.visibility = "";
}


function checkWin() {
    console.log(cardOneValue);
    console.log(cardTwoValue);
    console.log("checking");
    // checks which card is more valueble
    if (cardOneValue > cardTwoValue) {
        // chenges the text
        document.getElementById('text').innerHTML = "Player One Wins!"
        console.log("one");
        // adds to a teams points
        teamOnePoints++
    } else if (cardOneValue < cardTwoValue) {
        document.getElementById('text').innerHTML = "Player Two Wins!"
        console.log("two");
        teamTwoPoints++
    } else if (cardOneValue == cardTwoValue) {
        document.getElementById('text').innerHTML = "Tie Game!"
        
    }
    //  updates the teams points
    document.getElementById('text2').innerHTML = teamOnePoints +  "   ---   " + teamTwoPoints;
}

function noCards(){
    // removes the draw buttob, adds the shuffle button, makes the cards invisible and changes the text
    console.log("nocards");
    document.getElementById('text').innerHTML = "Out of Cards!";
    document.getElementById("draw").style.visibility = "hidden";
    document.getElementById("shuffle").style.visibility = "";
    document.getElementById('card1').src = "";
    document.getElementById('card2').src = "";
}