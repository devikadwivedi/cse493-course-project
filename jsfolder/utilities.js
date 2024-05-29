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
  for (let key in plantTypes) {
    strokeWeight(3);
    let plant = plantTypes[key];
    let boxX = offset;
    let boxY = height - menuHeight;
    fill(128, 85, 0);
    stroke(0);
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

// Draws the spawn line
function drawSpawnLine() {
  let lane = Math.floor(random(cols));
}

// Moves suns
function moveSuns(suns) {
  for (let sun of suns) {
    sun.move();
  }
}

// Draws suns
function drawSuns(suns) {
  for (let sun of suns) {
    sun.display();
  }
}

// Checks for zombie collisions
function checkZombieCollisions(plants, zombies, bullets) {
  for (let plant of plants) {
    if (plant.special == "mine") {
      for (let zombie of zombies) {
        if (dist(plant.x, plant.y, zombie.x, zombie.y) < 50) {
          genFlakes(plant.x, plant.y);
          let plantIndex = plants.indexOf(plant);
          if (plantIndex > -1) {
            plants.splice(plantIndex, 1);
          }

          let boxX = Math.floor(plant.x / boxWidth);
          let boxY = Math.floor(plant.y / boxHeight);
          if (boxX >= 0 && boxX < cols && boxY >= 0 && boxY < rows) {
            boxes[boxX][boxY].containsPlant = false;
            boxes[boxX][boxY].plant = null;
          }

          for (let i = zombies.length - 1; i >= 0; i--) {
            let z = zombies[i];
            let boxDistanceX = Math.abs((plant.x - z.x) / boxWidth);
            let boxDistanceY = Math.abs((plant.y - z.y) / boxHeight);
            if (boxDistanceX <= 2 && boxDistanceY <= 2) {
              zombies.splice(i, 1);
            }
          }
        }
      }
    }
  }
}

// Generates explosion flakes
function genFlakes(x, y) {
  let i = 100;
  noStroke();
  while (i--) {
    flakes.push({
      color: color(color('#B7B6B6(0%, 50%, 50%)')),
      pos: createVector(x, y),
      vel: p5.Vector.fromAngle(random(2 * PI)).mult(random(10)),
      size: random(30)
    });
  }
}

function drawBullets(bullets) {
  for (let bullet of bullets) {
    fill(bullet.color);

    ellipse(bullet.x, bullet.y, 20, 20);
    if (bullet.direction == "backward") {
      bullet.y += 5;
    } else {
      bullet.y -= 5; // Move the bullet upwards
    }
    // Remove the bullet if it goes off screen
    if (bullet.y < 0 || bullet.y > 510) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  }
}

function drawPlants(plants) {
  for (let plant of plants) {
    fill(plant.color);
    ellipse(plant.x, plant.y, 50, 50);
  }
}

function drawZombies() {
  for (let zombie of zombies) {
    fill(50, 50, 50, zombie.transparency);
    ellipse(zombie.x, zombie.y, 50, 50);
    zombie.y += 0.5; // Move the zombie downwards

    // Check if the zombie has reached the bottom of the screen
    if (zombie.y > height - menuHeight) {
      noLoop(); // Stop the game for now
    }
  }

  // Check for bullet collisions with zombies
  for (let bullet of bullets) {
    for (let zombie of zombies) {
      if (dist(bullet.x, bullet.y, zombie.x, zombie.y) < 35) { // Check for collision
        zombie.transparency -= 25; // Decrease transparency
        bullets.splice(bullets.indexOf(bullet), 1); // Remove the bullet
        if (zombie.transparency <= 100) { // Fully transparent (killed)
          zombies.splice(zombies.indexOf(zombie), 1); // Remove the zombie
        }
      }
    }
  }
}

function spawnZombie() {
  let lane = Math.floor(random(cols)); // Random lane
  lane = Math.floor((noseX() / width) * cols) + 1;
  lane = constrain(lane, 0, 4);
  let zombieX = lane * boxWidth + boxWidth / 2;
  zombies.push({ x: zombieX, y: 0, lane: lane, transparency: 255 });
}

