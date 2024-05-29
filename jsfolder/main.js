let boxes = [];
let plants = [];
let bullets = [];
let zombies = [];
let suns = [];
let selectedPlant = null;
let flakes = []
let gameState = 1;

let plantTypes = {
  'a': { name: "Plant 5", color: 'yellow', interval: 7000, cost: 50, special: "sun-producer" },
  's': { name: "Plant 1", color: 'rgb(81,179,81)', interval: 1000, cost: 100, special: "none"},
  'd': { name: "Plant 3", color: 'rgb(204,115,130)', interval: 660, cost: 200, special: "none"},
  'f': { name: "Plant 2", color: 'rgb(137,89,70)', cost: 200, special: "mine"},
  'g': { name: "Plant 4", color: 'rgb(148,139,207)', interval: 1000, cost: 200, special: "forward-backward" }
};

let zombieInterval = 10000;

function setup() {
  createCanvas(500, 600);
  //noseTrackingSetup();
  setInterval(spawnSun, 10000);
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
}

function draw() {
  switch (gameState) {
    case 0:
      drawTitleScreen();
      break;
    case 1:
      drawGame();
      break;
    default:
      drawGameOverScreen();
      break;
  }
}


// Key pressed handler
function keyPressed() {
  if (plantTypes[key]) {
    selectedPlant = plantTypes[key];
  }
}

// Mouse pressed handler
function mousePressed() {
  let val = collectSun(mouseX, mouseY);
  if (val == true) {
    return;
  }
  if (selectedPlant && sun >= selectedPlant.cost) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let box = boxes[i][j];
        if (mouseX > box.x && mouseX < box.x + box.w && mouseY > box.y && mouseY < box.y + box.h) {
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
          }
        }
      }
    }
  }
}

// Mouse moved handler
function mouseMoved() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let box = boxes[i][j];
      if (mouseX > box.x && mouseX < box.x + box.w && mouseY > box.y && mouseY < box.y + box.h) {
        box.isHighlighted = true;
      } else {
        box.isHighlighted = false;
      }
    }
  }
}
