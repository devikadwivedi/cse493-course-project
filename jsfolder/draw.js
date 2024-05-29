function drawGame(boxes, plants, bullets, zombies, suns, selectedPlant) {
  switch (gameState) {
    case 0:
      drawTitleScreen();
      break;
    case 1:
      noStroke();
      background(160, 210, 140);
      drawMenu(selectedPlant);
      drawField(boxes);
      drawPlants(plants);
      drawBullets(bullets);
      drawZombies(zombies);
      drawSpawnLine();
      moveSuns(suns);
      drawSuns(suns);
      checkZombieCollisions(plants, zombies, bullets);
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
    default:
      drawGameOverScreen();
      break;
  }
}
