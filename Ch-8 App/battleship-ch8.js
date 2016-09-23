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
// view.displayMessage('Uh oh!');
// view.displayHit('00'); // A0
// view.displayMiss('34'); // D4


var model = {
    // properties:
    boardSize: 7, // size of the grid for the board
    numShips: 3, // # of ships in the game (we can change it later, e.g. next level)
    shipsSunk: 0,
    shipLength: 3,

    // ship locations and hits HARDCODED for testing:
    // ships: [{ locations: ['31', '41', '51'], hits: ['hit', '', ''] },
    //         { locations: ['14', '24', '34'], hits: ['', '', 'hit'] },
    //         { locations: ['00', '01', '02'], hits: ['hit', '', ''] },],

    // ship locations dynamic:
    ships: [{ locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] },],

    // ships generator:
    // 1. loop for the number of ships we want to create
    // 2. generate a random direction (vertical or horizontal)
    // 3. generate a random location
    // 4. test to see if the new locations collide
    // 5. add locations to the ships array

    // master method: creates ships [] and numShips:
    generateShipLocations: function() {
        var locations;
        for (var i=0; i<this.numShips; i++) {
            // new loop: do something while ...
            do {
                locations = this.generateShip(); // method below
            } while (this.collision(locations)); // method below
            // once location w/o collision, location is assigned to model.ships.locations []
            this.ships[i].locations = locations;

        }
    },

    // creates a single ship located randomly on the board:
    generateShip: function() {
        // horizontal or vertical: generates random # -- 0 or 1
        var direction = Math.floor(Math.random() *2);
        var row, col;

        if (direction === 1) {
            // generate horizontal ship's 1st location
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            // generate vertical 1st point
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = []; // will add locations 1 by 1
        for (var i=0; i<this.shipLength; i++) {
            if (direction === 1) {
                // add location for new horizontal ship
                newShipLocations.push(row + '' + (col+i)); // (col+i) should be done before it's converted into string
            } else {
                // add location for new vertical ship
                newShipLocations.push((row+i) + '' + col); // '' is b/c we want to concatenate strings, not add numbers
            }
        }
        return newShipLocations; // returns array
    },

    // checks if the ship doesn't overlap with existing ships on board:
    collision: function(locations) { // 'locations' is [] of locs for new ship we want to place on the board
        for (var i=0; i<this.numShips; i++) {
            var ship = model.ships[i];
            for (var j=0; j<locations.length; j++) { // if any of locations in new array
                if (ship.locations.indexOf(locations[j]) >= 0) { // if locations don't match --> '-1'

                    return true; // we found collision!
                    // this return will stop BOTH loops immediately and exit
                }

            }
        }
        return false; // no collisions were found (no match)
    },

    // //method to fire on a ship and figure out if 'hit' or 'miss':
    fire: function(guess) {
        for (var i=0; i < this.numShips; i++) {
            var ship = this.ships[i];
            // we could write a loop to go through 'locations' but .indexOf() is easier:
            var index = ship.locations.indexOf(guess); // it returns the index of the guess value
            // and if the value is not in the array, it returns '-1'

            if (ship.hits[index] === 'hit') {
                view.displayMessage('Oops, you already hit that location!');
                return true;
            } else if (index >= 0) { // if the value of user's guess was found in the array
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
            }
        }
        console.log('MISSED!');
        view.displayMiss(guess); // updates View
        view.displayMessage('Haha, you missed!'); // updates View
        return false;
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


// testing Model:
// model.fire('31');
// console.log(model.shipsSunk);
// model.fire('41');
// console.log(model.shipsSunk);
// model.fire('51');
// console.log(model.shipsSunk);


// -----Controller--------
// gets a guess, process it and passes it to Model
// also keeps track of current # of guesses and player's progress
// updates Model with latest guess
// determines if games is over

var controller = {
    // properties:
    guesses: 0,

    // methods:
    // focus on: evaluate guess to make sure it's valid, process, then get it to Model
    processGuess: function(guess) { // guess as 'A3' form
        // evaluate guess for validity:
        var location = parseGuess(guess); // using helper function parseGuess()
        if (location) { // if location = string --> true, if location = null --> false
            this.guesses++; // update # of current guesses
            var hit = model.fire(location);
            // also check if the game is over (all ships are sunk):
            // if hit = true AND shipsSunk = numShips:
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('You won!  All my battleships are sunk in ' + this.guesses + ' guesses!');
            }
        }

    }
};

// helper function to be used by the controller.processGuess()
function parseGuess(guess) {

    // helper array:
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    // checking if guess is valid:
    if (guess === null || guess.length !== 2) {
        alert('Oops! Please enter a VALID guess: a letter and a number on the board.');
    } else {
        firstChar = guess.charAt(0); // grabs 1st character of guess
        var row = alphabet.indexOf(firstChar); // get a # (0-6) that corresponds to the letter
        var column = guess.charAt(1); // grabs 2nd character of guess

        // checks if guess is a number:
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board!");
        } else if ( row<0 || row >= model.boardSize || column<0 || column >= model.boardSize ) {
            alert("Oops, that's off the board!");
            // we're NOT using strict comparison operators b/c we need to convert string into number!
            // model.boardSize is a dynamic number!  No hardcoding!
        } else { // if all checks out:
            return row + column; // return 'guess' as 1 string
        }
    }
    return null; // if we get here, something failed one of the tests
}

// testing parseGuess():
// console.log(parseGuess('A0')); // 00
// console.log(parseGuess('kf')); // null
// console.log(parseGuess('59')); // null
// console.log(parseGuess('B8')); // null
// console.log(parseGuess('F9')); // null
// console.log(parseGuess('D6')); // 36

// Add event handler to 'Fire!' button to get user's input to Controller:
function init() {
    var fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton; // we add click handler function to the button

    // let's enable clicking 'Return' key to submit user's input:
    var guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;

    // let's start the game!
    model.generateShipLocations(); // it'll happen right when you load the game, before you start playing
}

function handleFireButton() {
    // code to get value from the form
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value.toUpperCase(); // this 'value' property get's the form's value

    controller.processGuess(guess);

    guessInput.value = ''; // this will clear the form
}

// handler function when user presses "Enter" instead of Fire! button:
function handleKeyPress(e) { // this event object 'e' has info about which key was pressed
    var fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        // if it's true, call the fireButton click:
        fireButton.click(); // if the button was actually clicked!
        // returns 'false' so the form doesn't try to submit itself:
        return false;
    }
}

// we want the browser to run init when the page is fully loaded
window.onload = init;








