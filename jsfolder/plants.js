function drawPlants() {
  noTint();
  for (let plant of plants) {
    noTint();
    let plantImg = plantImages[plant.name];
    if (plantImg) {
      image(plantImg, plant.x - 20, plant.y - 30, 40, 55); // Draw the plant image
    } else {
      fill(plant.color);
      ellipse(plant.x, plant.y, 50, 50); // Fallback to ellipse if image not found
    }
  }
}

function shootBulletsFromPlant(lane) {
  for (let plant of plants) {
    if (plant.special != "sun-producer" && plant.special != "mine") {
      if (plant.lane === lane) {
        let bulletX = plant.x;
        let bulletY = plant.y - 30;
        bullets.push({ x: bulletX, y: bulletY, color: plant.color, lane: plant.lane });
        if (plant.special === "forward-backward") {
          bullets.push({ x: bulletX, y: bulletY + 60, color: plant.color, lane: plant.lane, direction: "backward" });
        }
      }
    }
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

// Generates explosion flakes
function genFlakes(x, y) {
  let i = 100;
  noStroke();
  while (i--) {
    flakes.push({
      color: color(color('#D33232')),
      pos: createVector(x, y),
      vel: p5.Vector.fromAngle(random(2 * PI)).mult(random(10)),
      size: random(25)
    });
  }
}