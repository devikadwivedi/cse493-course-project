let boxes = []; //boxes seems to be a 2D array

let plants = [];
let bullets = [];
let zombies = [];
let suns = [];

let selectedPlant = null;

let plantTypes = {
  'a': { name: "Plant 5", color: 'yellow', interval: 7000, cost: 50, special: "sun-producer" },
  's': { name: "Plant 1", color: 'rgb(81,179,81)', interval: 1000, cost: 100, special: "none"},
  'd': { name: "Plant 3", color: 'rgb(204,115,130)', interval: 660, cost: 200, special: "none"},
  'f': { name: "Plant 2", color: 'rgb(137,89,70)', cost: 200, special: "mine"},
  'g': { name: "Plant 4", color: 'rgb(148,139,207)', interval: 1000, cost: 200, special: "forward-backward" }
};

let zombieInterval = 5000; // interval in milliseconds

function setup() {
  createCanvas(500, 600);
  noseTrackingSetup(); //Set up nose tracking
  serialSetup(); //Set up serial communication
  setInterval(spawnSun, 10000); // Spawn a sun every second

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

  // Start spawning zombies at the specified interval
  setInterval(spawnZombie, zombieInterval);
}

function draw() {
  //if(!poseNetModelReady){return;}//Wait until camera is ready
  switch (gameState){
    case 0: drawTitleScreen(); break;
    case 1:
      noStroke();
      background(160, 210, 140);
      drawMenu();
      drawField();
      drawPlants();
      drawBullets();
      drawZombies();
      drawSpawnLine();
      moveSuns();
      drawSuns();
      checkZombieCollisions();

      for(let i = 0; i < flakes.length; i++) {
        flakes[i].pos.add(flakes[i].vel);
        flakes[i].size--;
        if(flakes[i].size > 0) {
          stroke(flakes[i].color);
          strokeWeight(flakes[i].size);
          point(flakes[i].pos.x, flakes[i].pos.y);
        } else {
          flakes.splice(i, 1);
        }
      }
      strokeWeight(0);
      noStroke();
    break;
    default: drawGameOverScreen(); break;
    }
}

function drawSpawnLine(){
  let lane = Math.floor(random(cols));
  if (noseX()) {
  lane = Math.floor((noseX() / width) * cols) + 1;
  lane = constrain(lane, 0, 4);
  strokeWeight(10);
  stroke("brown");
  line((width / cols) * lane, 0, (width / cols) * (lane+1), 0);
  noStroke();
  }
}

function drawMenu() {
  fill(112,74,0);
  rect(0, height - menuHeight, width, menuHeight);

  // Info box
  fill(17,150,0);
  rect(0, height - menuHeight, 125, menuHeight);
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255,255,255);
  text(`Sun: ${sun}`, 10, height - menuHeight + 10);
  text(`Selected:`, 10, height - menuHeight + 35);
  if (selectedPlant) {
    fill(selectedPlant.color);
    ellipse(100, height - menuHeight + 45, 30, 30);
  }

  // Draw plant options
  let offset = 125;
  for (let key in plantTypes) {
    strokeWeight(3);
    let plant = plantTypes[key];
    let boxX = offset;
    let boxY = height - menuHeight;
    fill(128,85,0);
    stroke(0);
    rect(boxX, boxY, 75, menuHeight);


    noStroke();
    // Draw plant circle
    fill(plant.color);
    ellipse(boxX + 37.5, boxY + 30, 35, 35);
    // Draw plant cost
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text(`${plant.cost}`, boxX + 37.5, boxY + 55);

    offset += 75;
  }
}

function drawField() {
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

function drawPlants() {
  for (let plant of plants) {
    fill(plant.color);
    ellipse(plant.x, plant.y, 50, 50);
  }
}

function drawBullets() {
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

function shootBulletsFromPlant(lane) {
  for (let plant of plants) {
    if (plant.special != "sun-producer" && plant.special != "mine") {
    if (plant.lane === lane) {
      let bulletX = plant.x;
      let bulletY = plant.y - 30; // Adjust bullet position slightly above the plant
      bullets.push({ x: bulletX, y: bulletY, color: plant.color, lane: plant.lane });
      if (plant.special === "forward-backward") {
        bullets.push({ x: bulletX, y: bulletY + 60, color: plant.color, lane: plant.lane, direction: "backward" });
      }
    }}
  }
}

function spawnZombie() {
  let lane = Math.floor(random(cols)); // Random lane
  lane = Math.floor((noseX() / width) * cols) + 1;
  lane = constrain(lane, 0, 4);
  let zombieX = lane * boxWidth + boxWidth / 2;
  zombies.push({ x: zombieX, y: 0, lane: lane, transparency: 255 });
  serialWriteState(lane);
}

function keyPressed() {
  if (plantTypes[key]) {
    selectedPlant = plantTypes[key];
  }
}

function checkZombieCollisions() {
  for (let plant of plants) {
    if (plant.special == "mine") {
      for (let zombie of zombies) {
        if (dist(plant.x, plant.y, zombie.x, zombie.y) < 50) { // Check for collision
          genFlakes(plant.x, plant.y);
          // Explosion logic: remove the plant and affect zombies in a 2-box radius
          let plantIndex = plants.indexOf(plant);
          if (plantIndex > -1) {
            plants.splice(plantIndex, 1);
          }

          // Find the box containing the plant and remove its containsPlant flag
          let boxX = Math.floor(plant.x / boxWidth);
          let boxY = Math.floor(plant.y / boxHeight);
          if (boxX >= 0 && boxX < cols && boxY >= 0 && boxY < rows) {
            boxes[boxX][boxY].containsPlant = false;
            boxes[boxX][boxY].plant = null;
          }

          // Remove zombies in the explosion radius
          for (let i = zombies.length - 1; i >= 0; i--) {
            let z = zombies[i];
            let boxDistanceX = Math.abs((plant.x - z.x) / boxWidth);
            let boxDistanceY = Math.abs((plant.y - z.y) / boxHeight);
            if (boxDistanceX <= 2 && boxDistanceY <= 2) { // Check if within 2-box radius
              zombies.splice(i, 1);
            }
          }
        }
      }
    }
  }
}
let flakes = []

function genFlakes(x, y) {
  let i = 100;
  noStroke();
  while(i--) {
    flakes.push({
      color: color(color('#B7B6B6(0%, 50%, 50%)')),
      pos: createVector(x, y),
      vel: p5.Vector.fromAngle(random(2*PI)).mult(random(10)),
      size: random(30)
    });
  }

}

function collectSun(x, y) {
  for (let i = suns.length - 1; i >= 0; i--) {
    let curr_sun = suns[i];
    let distance = dist(x, y, curr_sun.x, curr_sun.y);
    if (distance < curr_sun.radius) { // Check if mouse pointer or key press is inside the sun
      // Remove the collected sun
      suns.splice(i, 1);
      // Increase score
      sun += 50;
      return true;
    }
  }
  return false;
}

function spawnSun() {
  let x = width + 20; // To the right of the canvas
  let y = random(500); // Random y position along the height of the canvas
  let radius = 15; // Fixed radius for the sun

  // Create the sun object
  let sun = new Sun(x, y, radius);
  suns.push(sun); // Add the sun to the suns array
}

function moveSuns() {
  for (let sun of suns) {
    sun.move();
  }
}

function drawSuns() {
  for (let sun of suns) {
    sun.display();
  }
}

class Sun {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = random(-1, -0.5); // Random horizontal speed towards the left
    this.speedY = random(-0.3, 0.3); // Random vertical speed
  }

  display() {
    // Draw the center circle
    fill(255, 204, 0, 200);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);

    // Draw the triangles around the circle
    const numTriangles = 8;
    const angle = TWO_PI / numTriangles;

    for (let i = 0; i < numTriangles; i++) {
      let theta = i * angle;
      let x1 = this.x + cos(theta) * this.radius;
      let y1 = this.y + sin(theta) * this.radius;
      let x2 = this.x + cos(theta + angle / 2) * (this.radius * 1.5);
      let y2 = this.y + sin(theta + angle / 2) * (this.radius * 1.5);
      let x3 = this.x + cos(theta + angle) * this.radius;
      let y3 = this.y + sin(theta + angle) * this.radius;

      fill(255, 153, 51, 150);
      triangle(x1, y1, x2, y2, x3, y3);
    }
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around when suns reach the edge of the canvas
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }

    if (this.y > 500) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }
  }
}

