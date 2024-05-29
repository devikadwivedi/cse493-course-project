function drawZombies() {
  for (let zombie of zombies) {
    fill(50, 50, 50, zombie.transparency);
    ellipse(zombie.x, zombie.y, 50, 50);
    zombie.y += 0.5;

    if (zombie.y > height - menuHeight) {
      noLoop();
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
  zombies.push({ x: zombieX, y: 0, lane: lane, transparency: 255 });
}
