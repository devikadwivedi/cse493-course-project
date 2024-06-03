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

function preload() {
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
}

function draw() {
  background(220);
  if (showInfoPage) {
    drawInfoCard();
  } else {
    drawTitles();
    drawTiles();
  }
}

function drawTitles() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text("Native Plants", width / 2, 75);
  text("Invasive Plants", width / 2, 250);
}

function drawTiles() {
  let yOffset = 100;
  // Draw Native Plants
  for (let i = 0; i < numNativeRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let plantIndex = i * numCols + j;
      if (plantIndex < nativeImages.length) {
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        image(nativeImages[plantIndex], x, y, tileSize, tileSize);
      }
    }
  }

  yOffset = 275;

  // Draw Invasive Plants
  for (let i = 0; i < numInvasiveRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let plantIndex = i * numCols + j;
      if (plantIndex < invasiveImages.length) {
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        image(invasiveImages[plantIndex], x, y, tileSize, tileSize);
      }
    }
  }
}

function mousePressed() {
  if (showInfoPage) {
    // Check if the "Back to Menu" button is clicked
    if (mouseX > 375 && mouseX < 425 && mouseY > 500 && mouseY < 550) {
      showInfoPage = false;
    }
  } else {
    let yOffset = 100;
    for (let i = 0; i < numNativeRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let plantIndex = i * numCols + j;
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        if (mouseX > x && mouseX < x + tileSize && mouseY > y && mouseY < y + tileSize) {
          currentPlant = nativeInfo[plantIndex];
          showInfoPage = true;
          return;
        }
      }
    }

    yOffset = 275;
    for (let i = 0; i < numInvasiveRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let plantIndex = i * numCols + j;
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        if (mouseX > x && mouseX < x + tileSize && mouseY > y && mouseY < y + tileSize) {
          currentPlant = invasiveInfo[plantIndex];
          showInfoPage = true;
          return;
        }
      }
    }
  }
}

function drawInfoCard() {
  fill(255);
  rect(50, 50, 400, 500);

  if (currentPlant) {
    image(currentPlant.img, 100, 75, 300, 300);

    textSize(24);
    fill(0);
    textAlign(LEFT, TOP);
    text(currentPlant.name, 100, 400);

    fill(currentPlant.type === "native" ? "green" : "red");
    text(currentPlant.type.charAt(0).toUpperCase() + currentPlant.type.slice(1), 350, 400);

    fill(0);
    textSize(16);
    text(currentPlant.description, 100, 430, 300, 50); // Text box for description

    fill(200, 0, 0);
    rect(375, 500, 50, 25);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Back", 400,513);
  }
}
