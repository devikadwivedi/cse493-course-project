function drawGame() {

      noStroke();
      background(160, 210, 140);

      drawField(boxes);
      drawPlants(plants);
      drawBullets(bullets);
      drawZombies(zombies);
      moveSuns(suns);
      drawSuns(suns);
      updateTimer();
      drawMenu(selectedPlant);
      mouseMoved();
      checkZombieCollisions(plants, zombies, bullets);

      // generating the flakes
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
}
