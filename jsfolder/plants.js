function drawPlants() {
  for (let plant of plants) {
    fill(plant.color);
    ellipse(plant.x, plant.y, 50, 50);
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
