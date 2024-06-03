//For handpose.js
let invertWrist = true;

//true for mouse, false for wrist tracking
let useMouse = true;

let totalTime = 3 * 60 * 1000;
let gameState = 0; // -1 is plant info page, 0 is menu, 1 is in game, 2 is plant win, 3 is zombie win

//Transplanted from sketch.js
let health = 100;
let sun = 2000; // initial amount of sun
let cols = 5;
let rows = 8;
let boxWidth = 100;
let boxHeight = 65;
let menuHeight = 80;