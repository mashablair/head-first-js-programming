// This code is very repetetive. It works but is not scalable and unmanageable:
var dogName = "rover";
var dogWeight = 23;
if (dogWeight > 20) {
  console.log(dogName + " says WOOF WOOF");
} else {
 console.log(dogName + " says woof woof");
}

dogName = "spot";
dogWeight = 13;
if (dogWeight > 20) {
  console.log(dogName + " says WOOF WOOF");
} else {
  console.log(dogName + " says woof woof");
}

dogName = "spike";
dogWeight = 53;
if (dogWeight > 20) {
  console.log(dogName + " says WOOF WOOF");
} else {
  console.log(dogName + " says woof woof");
}

dogName = "lady";
dogWeight = 17;
if (dogWeight > 20) {
  console.log(dogName + " says WOOF WOOF");
} else {
  console.log(dogName + " says woof woof");
}

// How can we improve this code?
// We can create a function 'sayWoof()' that checks dog's weight and dog's name:

function sayWoof(dogWeight, dogName) {
    if (dogWeight > 20) {
      console.log(dogName + " says WOOF WOOF");
    } else {
      console.log(dogName + " says woof woof");
    }
}

sayWoof(50, "Alaska");

// More exercise:

function whatShallIWear(temp) {
    if (temp < 60) {
        console.log("Wear a jacket");
    }

    else if (temp < 70) {
        console.log("Wear a sweater");
    }

    else {
        console.log("Wear a t-shirt");
    }
}
whatShallIWear(50);
whatShallIWear(80);
whatShallIWear(60);
// Wear a jacket
// Wear a t-shirt
// Wear a sweater

// Exercise for parameters & arguments:
function doIt(param) {
    param = 2;
}

var test = 1;
doIt(test);
console.log(test);

// This function doesn't do anything and doesn't print anything
// console.log prints '1' but it has nothing to do w/ our function


// ***SCOPE***
// In this exercise we have both global and local variables:

var avatar = 'generic';
var skill = 1.0;
var pointsPerLevel = 1000;
var userPoints = 2008;

function getAvatar(points) {
    var level = points / pointsPerLevel; // this var is local and only visible inside getAvatar()

    if (level == 0) {
        return "Teddy Bear";
    } else if (level == 1) {
        return "Cat";
    } else if (level >= 2) {
        return "Gorrilla";
    }
}

function updatePoints(bonus, newPoints) {
    var i=0;
    while (i<bonus) {
        newPoints = newPoints + skill*bonus; // here we mix & match local & global vars
        i++;
    }
    return newPoints + userPoints; // and here mix & match
}

// !!! Here we can only use global vars!  No local vars are visible here!
userPoints = updatePoints(2, 100); // outputs 2112
console.log(userPoints);
avatar = getAvatar(2112); //outputs Gorrilla
console.log(avatar);




// Example when vars inside function become global:

function playTurn(player, location) {
    points = 0; // We forgot 'var' in front of 'points' --> this var is now global!!!
    if (location === 1) {
        points = points + 100;
    }
    return points; // returns '100'
}

var total = playTurn('Masha', 1);
alert(points); // This is only possible b/c 'points' is a global var now!
// This code behaves as if we declared points before the playTurn()!
// Like this:  var points = 0; (on line 121)










