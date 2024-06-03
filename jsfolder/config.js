//For handpose.js
let invertWrist = true;

//true for mouse, false for wrist tracking
let useMouse = false;

let totalTime = 2* 60 * 1000;
let gameState = 0; // -1 is plant info page, 0 is menu, 1 is in game, 2 is plant win, 3 is zombie win

//Transplanted from sketch.js
let health = 100;
let sun = 100; // initial amount of sun
let cols = 5;
let rows = 8;
let boxWidth = 100;
let boxHeight = 65;
let menuHeight = 80;

let tileSize = 100;
let tileSpacing = 25;
let numCols = 4;
let numNativeRows = 1;
let numInvasiveRows = 2;

let nativePlantImages = [];
let invasivePlantImages = [];
let invasiveImages = []; // To store all images for easy management
let nativeImages = [];

let invasiveInfo = [
  { type: "invasive", name: "Reed Canary Grass", image: "plantImages/invasive1.jpeg", description: "invasive plant 1 description"},
  { type: "invasive", name: "Scotch Broom", image: "plantImages/invasive2.jpeg", description: "invasive plant 2 description"},
  { type: "invasive", name: "English Ivy", image: "plantImages/invasive3.jpeg", description: "invasive plant 3 description"},
  { type: "invasive", name: "Tansy Ragwort", image: "plantImages/invasive4.jpeg", description: "invasive plant 4 description" },
  { type: "invasive", name: "Himalayan Blackberry", image: "plantImages/invasive5.jpg", description: "invasive plant 5 description" },
  { type: "invasive", name: "Bull Thistle", image: "plantImages/invasive6.jpg", description: "invasive plant 6 description" },
  { type: "invasive", name: "Fragrant Waterlilly", image: "plantImages/invasive7.jpg", description: "invasive plant 7 description" },
  { type: "invasive", name: "Scentless Mayweed", image: "plantImages/invasive8.jpg", description: "invasive plant 8 description" },
];

let nativeInfo = [
  { type: "native", name: "Alpine Strawberry", image: "plantImages/native1.jpg", description: "native plant 1 description"},
  { type: "native", name: "Camassia", image: "plantImages/native2.jpg", description: "native plant 2 description"},
  { type: "native", name: "Red Cedar", image: "plantImages/native3.jpeg", description: "native plant 3 description"},
  { type: "native", name: "Pacific Dogwood", image: "plantImages/native4.jpg", description: "native plant 4 description"},
];

let currentPlant = null; // To store the currently selected plant info
let showInfoPage = false;