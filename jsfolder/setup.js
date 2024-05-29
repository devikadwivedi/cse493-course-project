function setup() {
  createCanvas(500, 600);
  //noseTrackingSetup();
  setInterval(spawnSun, 10000);
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
  setInterval(spawnZombie, zombieInterval);
}
