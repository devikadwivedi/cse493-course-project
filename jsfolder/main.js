let boxes = [];
let plants = [];
let bullets = [];
let zombies = [];
let suns = [];
let flakes = [];
let sprites = [];
let plantImages = {};
let grasses = [];
let titleScreenImage;
let woods = [];

let plantTypes = [
  { key: 's', name: "plant1.png", color: 'rgb(81,179,81)', interval: 1000, cost: 100, special: "none" },
  { key: 'd', name: "plant2.png", color: 'rgb(204,115,130)', interval: 660, cost: 200, special: "none" },
  { key: 'f', name: "plant3.png", color: 'rgb(137,89,70)', cost: 300, special: "mine" },
  { key: 'g', name: "plant4.png", color: 'rgb(148,139,207)', interval: 1000, cost: 250, special: "forward-backward" }
];
let selectedPlant = plantTypes[0];

let zombieInterval = 10000;
let selectedIndex = 0; // Track the current selected plant index

function preload() {
  titleScreenImage = loadImage("images/game_start.png");
  // Load the sprites
  for (let i = 1; i <= 4; i++) {
    sprites.push(loadImage(`images/sprite${i}.png`));
  }
  for (let i = 1; i <= 4; i++) {
    grasses.push(loadImage(`images/grass${i}.png`));
  }
  for (let i = 1; i <= 2; i++) {
    woods.push(loadImage(`images/wood${i}.png`));
  }
  // Load the plant images
  for (let plantType of plantTypes) {
    plantImages[plantType.name] = loadImage("images/"+plantType.name);
  }
  for (let plant of invasiveInfo) {
    plant.img = loadImage(`${plant.image}`);
    invasiveImages.push(plant.img);
  }
  for (let plant of nativeInfo) {
    plant.img = loadImage(`${plant.image}`);
    nativeImages.push(plant.img);
  }
}

function setup() {
  createCanvas(500, 600);
  setInterval(spawnSun, 4000);

  // Initialize boxes
  for (let i = 0; i < cols; i++) {
    boxes[i] = [];
    for (let j = 0; j < rows; j++) {
      boxes[i][j] = {
        x: i * boxWidth,
        y: j * boxHeight,
        w: boxWidth,
        h: boxHeight,
        containsPlant: false,
        isHighlighted: false
      };
    }
  }
  setInterval(spawnZombie, zombieInterval);
  handPoseSetup();
}

function draw() {
  switch (gameState) {
    case 4:
      drawInfoScreen();
      break;
    case 0:
      drawTitleScreen();
      break;
    case 1:
      drawGame();
      break;
    case 2:
      drawWinScreen();
      break;
    case 3:
      drawLoseScreen();
      break;
  }
}

// Key pressed handler
function keyPressed() {
  if (key === 'a') {
    selectedIndex = (selectedIndex - 1 + plantTypes.length) % plantTypes.length; // Move left
  } else if (key === 's') {
    selectedIndex = (selectedIndex + 1) % plantTypes.length; // Move right
  } else if (key == 'z') {
    mousePressed();
  }
  selectedPlant = plantTypes[selectedIndex];
  console.log('Selected Plant:', selectedPlant);
}

// Mouse pressed handler
function mousePressed() {
  updateCursor();
  if (gameState == 4) {
    mousePressedInfoPage();
  } else if (gameState == 1) {
    if (selectedPlant && sun >= selectedPlant.cost) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let box = boxes[i][j];
          if (cursorX > box.x && cursorX < box.x + box.w && cursorY > box.y && cursorY < box.y + box.h) {
            if (!box.containsPlant) {
              box.containsPlant = true;
              box.plant = selectedPlant;
              let plantX = box.x + box.w / 2;
              let plantY = box.y + box.h / 2;
              plants.push({ ...selectedPlant, x: plantX, y: plantY, lane: i, row: j });
              sun -= selectedPlant.cost; // Deduct the sun cost
              if (selectedPlant.interval > 0) {
                setInterval(() => shootBulletsFromPlant(i), selectedPlant.interval);
              }
              if (selectedPlant.special == "sun-producer") {
                console.log("setting interval");
                setInterval(spawnSunFlower(plantX, plantY), 1000);
              }
            }
          }
        }
      }
    }
  }
}

// Mouse moved handler
function mouseMoved() {
  updateCursor();
  collectSun(cursorX, cursorY);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let box = boxes[i][j];
      if (cursorX > box.x && cursorX < box.x + box.w && cursorY > box.y && cursorY < box.y + box.h) {
        box.isHighlighted = true;
      } else {
        box.isHighlighted = false;
      }
    }
  }
}
