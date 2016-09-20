// MVC
// Model - keeps track of the ships, where they are, if they've been hit, and if they've been sunk
// View - updates display w/ hits, missed and messages to user
// Controller - glues them together, gets user's input and executes game's logic

// object-oriented design

var view = {
    // this method takes a string and displays it in message window
    displayMessage: function(msg) {
        // first, get html element by id:
        var messageArea = document.getElementById('messageArea');
        // second, update text content to this element:
        messageArea.innerHTML = msg; // content is the function argument
    },

    // this method displays 'miss' when user's input is wrong
    displayMiss: function(location) {
        // add class="miss" to the cell after getting user's guess for location:
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },

    // this method displays 'ship' when user's input is right
    displayHit: function(location) {
        // add class="hit" to the cell:
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    }

};

// testing:
view.displayMessage('Uh oh!');
view.displayHit('00'); // A0
view.displayMiss('34'); // D4


var model = {
    // properties:
    boardSize: 7, // size of the grid for the board
    numShips: 3, // # of ships in the game (we can change it later, e.g. next level)
    shipsSunk: 0,
    shipLength: 3,

    // ship locations and hits:
    ships: [{ locations: ['31', '41', '51'], hits: ['', '', ''] },
            { locations: ['14', '24', '34'], hits: ['', 'hit', ''] },
            { locations: ['00', '01', '02'], hits: ['hit', '', ''] },]

    // //method to fire on a ship and figure out if 'hit' or 'miss':
    // fire: function() {

    // }
};

var ship2 = model.ships[1];
var locations = ship2.locations;
console.log('Location is ' + locations[1]);

var ship3 = model.ships[2];
var hits = ship3.hits;
if (hits[0] === 'hit') {
    console.log('Au! We have been hit at location one!');
}

var ship1 = model.ships[0];
var hits = ship1.hits;
hits[2] = 'hit';
console.log(hits[2]);





