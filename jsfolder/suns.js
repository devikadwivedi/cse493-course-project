function spawnSun() {
  let x = width + 20;
  let y = random(500);
  let radius = 15;
  let sun = new Sun(x, y, radius);
  suns.push(sun);
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

function collectSun(x, y) {
  for (let i = suns.length - 1; i >= 0; i--) {
    let curr_sun = suns[i];
    let distance = dist(x, y, curr_sun.x, curr_sun.y);
    if (distance < curr_sun.radius) {
      suns.splice(i, 1);
      sun += 50;
      return true;
    }
  }
  return false;
}
