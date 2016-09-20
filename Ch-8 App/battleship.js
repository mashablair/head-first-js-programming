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