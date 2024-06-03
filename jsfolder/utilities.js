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
  noTint();
  fill(112, 74, 0);
  rect(0, height - menuHeight, width, menuHeight);
  fill(17, 150, 0);
  rect(0, height - menuHeight, 125, menuHeight);
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255, 255, 255);
  text(`Sun: ${sun}`, 10, height - menuHeight + 10);

  // Calculate and display the timer value
  let elapsedTime = millis() - startTime;
  let remainingTime = totalTime - elapsedTime;

  // Convert remainingTime to minutes and seconds
  let minutes = floor(remainingTime / 60000);
  let seconds = floor((remainingTime % 60000) / 1000);
  let timerValue = nf(minutes, 2) + ':' + nf(seconds, 2, 0); // Format as mm:ss

  text(`Time: ${timerValue}`, 10, height - menuHeight + 30); // Display timer value below the "Sun" value

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

    let img = plantImages[plant.name];
    if (img) {
      image(img, boxX + 13, boxY + 5, 50, 50); // Draw the plant image in the menu
    } else {
      fill(plant.color);
      ellipse(boxX + 37.5, boxY + 30, 35, 35); // Fallback to ellipse if image not found
    }

    fill(0);
    textSize(15);
    textAlign(CENTER, TOP);
    text(`${plant.cost}`, boxX + 37.5, boxY + 60);
    offset += 75;
  }
}





// Draws the field
function drawField(boxes) {
  noTint();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let box = boxes[i][j];
      if (box.isHighlighted) {
        fill(234, 247, 163);
        image(grasses[2], box.x - 7, box.y - 10, 120, 75);
      } else if ((i + j) % 2 === 0) {
        fill(84, 115, 48);
        image(grasses[1], box.x - 7, box.y - 10, 125, 80);
      } else {
        fill(160, 210, 140);
        image(grasses[0], box.x - 7, box.y - 10, 125, 80);
      }
      rectMode(CORNER);

      //rect(box.x, box.y, box.w, box.h, 5);
    }
  }
}