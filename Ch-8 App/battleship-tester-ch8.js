// some more testing
model.fire("53"); // miss

model.fire("31"); // hit
model.fire("41"); // hit
model.fire("51"); // hit

model.fire("34"); // hit
model.fire("24"); // hit
model.fire("14"); // hit

model.fire("00"); // hit
model.fire("01"); // hit
model.fire("02"); // hit

console.log('Is there a problem?');