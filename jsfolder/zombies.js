function drawZombies() {
  for (let zombie of zombies) {
    tint(255, zombie.transparency);
    image(zombie.sprite, zombie.x - 35, zombie.y - 35, 75, 75); // Draw sprite at 50x50 size
    zombie.y += 0.5;

    if (zombie.y > height - menuHeight) {
      gameState = 3; // GAME OVER!
      serialWriteState(3);
    }
  }

  for (let bullet of bullets) {
    for (let zombie of zombies) {
      if (dist(bullet.x, bullet.y, zombie.x, zombie.y) < 35) {
        zombie.transparency -= 25;
        bullets.splice(bullets.indexOf(bullet), 1);
        if (zombie.transparency <= 100) {
          zombies.splice(zombies.indexOf(zombie), 1);
        }
      }
    }
  }
}

function spawnZombie() {
  let lane = Math.floor(random(cols));
  lane = constrain(lane, 0, 4);
  let zombieX = lane * boxWidth + boxWidth / 2;
  let sprite = random(sprites); // Randomly choose a sprite
  zombies.push({ x: zombieX, y: 0, lane: lane, transparency: 255, sprite: sprite });
}

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
    // else add component where the plant disappears on collision
  }
}