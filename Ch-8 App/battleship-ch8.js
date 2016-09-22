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

// testing View:
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
            { locations: ['00', '01', '02'], hits: ['hit', '', ''] },],

    // //method to fire on a ship and figure out if 'hit' or 'miss':
    fire: function(guess) {
        for (var i=0; i < this.numShips; i++) {
            var ship = this.ships[i];
            // we could write a loop to go through 'locations' but .indexOf() is easier:
            var index = ship.locations.indexOf(guess); // it returns the index of the guess value
            // and if the value is not in the array, it returns '-1'
            if (index >= 0) { // if the value of user's guess was found in the array
                // we have a HIT!
                ship.hits[index] = 'hit'; // adds 'hit' to hits []
                console.log('HIT!');
                view.displayHit(guess); // updates View
                view.displayMessage('You hit my ship!'); // updates View

                // our isSunk() method here:
                if (this.isSunk(ship)) { // if isSunk() is true:
                    view.displayMessage('You sank my battleship!'); // updates View
                    this.shipsSunk++; // updates # of sunk ships above
                }
                return true;
            } else {
                console.log('MISSED!');
                view.displayMiss(guess); // updates View
                view.displayMessage('Sorry, you missed!'); // updates View
                return false;
            }
        }
    },

    // this method will check if we have 3 hits and return true or false:
    // this method will then be used in fire() method above.
    isSunk: function(ship) {
        for (var i=0; i<this.numShips; i++) {
            if (ship.hits[i] !== 'hit') { // if this spot doesn't have 'hit' value,
                return false;
            }
        }
        return true; // otherwise, all spots = 'hit' and ship is sunk
    } // now we can use this method in our fire()
};

// var ship2 = model.ships[1];
// var locations = ship2.locations;
// console.log('Location is ' + locations[1]);

// var ship3 = model.ships[2];
// var hits = ship3.hits;
// if (hits[0] === 'hit') {
//     console.log('Au! We have been hit at location one!');
// }

// var ship1 = model.ships[0];
// var hits = ship1.hits;
// hits[2] = 'hit';
// console.log(hits[2]);


// testing Model:
model.fire('31');
console.log(model.shipsSunk);
model.fire('41');
console.log(model.shipsSunk);
model.fire('51');
console.log(model.shipsSunk);

// some more testing
// model.fire("53"); // miss

// model.fire("31"); // hit
// model.fire("41"); // hit
// model.fire("51"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("14"); // hit

// model.fire("00"); // hit
// model.fire("01"); // hit
// model.fire("02"); // hit





