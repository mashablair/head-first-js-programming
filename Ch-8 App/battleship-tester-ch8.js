// some more testing
// if ships' locations are hardcoded:
model.fire("53"); // miss

// model.fire("31"); // hit
// model.fire("41"); // hit
// model.fire("51"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("14"); // hit

// model.fire("00"); // hit
// model.fire("01"); // hit
// model.fire("02"); // hit

// console.log('Is there a problem?');

controller.processGuess('D1');
controller.processGuess('E1');
controller.processGuess('F1');

controller.processGuess('D4');
controller.processGuess('C4');
controller.processGuess('B4');

controller.processGuess('A0');
controller.processGuess('A1');
controller.processGuess('A2');