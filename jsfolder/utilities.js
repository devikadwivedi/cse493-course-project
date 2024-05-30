// Draws the title screen
function drawTitleScreen() {
  background(50);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Title Screen", width / 2, height / 2);
}

// Draws the game over screen
function drawGameOverScreen() {
  background(0);
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

// Draws the menu
function drawMenu(selectedPlant) {
  fill(112, 74, 0);
  rect(0, height - menuHeight, width, menuHeight);
  fill(17, 150, 0);
  rect(0, height - menuHeight, 125, menuHeight);
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255, 255, 255);
  text(`Sun: ${sun}`, 10, height - menuHeight + 10);
  text(`Selected:`, 10, height - menuHeight + 35);
  if (selectedPlant) {
    fill(selectedPlant.color);
    ellipse(100, height - menuHeight + 45, 30, 30);
  }

  let offset = 125;
  for (let i = 0; i < plantTypes.length; i++) {
    let plant = plantTypes[i];
    let boxX = offset;
    let boxY = height - menuHeight;

    if (plant === selectedPlant) {
      fill(100, 60, 0); // Different color for the selected plant box
    } else {
      fill(128, 85, 0); // Normal color for the plant box
    }

    stroke(0);
    strokeWeight(1);
    rect(boxX, boxY, 75, menuHeight);
    noStroke();
    fill(plant.color);
    ellipse(boxX + 37.5, boxY + 30, 35, 35);
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text(`${plant.cost}`, boxX + 37.5, boxY + 55);
    offset += 75;
  }
}



// Draws the field
function drawField(boxes) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let box = boxes[i][j];
      if (box.isHighlighted) {
        fill(234, 247, 163);
      } else if ((i + j) % 2 === 0) {
        fill(84, 115, 48);
      } else {
        fill(160, 210, 140);
      }
      rectMode(CORNER);
      rect(box.x, box.y, box.w, box.h, 5);
    }
  }
}