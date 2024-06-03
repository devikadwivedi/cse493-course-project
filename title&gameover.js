let titleText = "Tower Defense Game";
let startText = "Press any button to play!";
let gameOverText = "Game Over!";
let player1WinText = "Plants Win!";
let player2WinText = "Zombies Win!";
let pulse = 0;
let pulseDirection = 1;

function drawTitleScreen() {
  image(titleScreenImage, 0, 0);


  if (mouseIsPressed){
    gameState = 1;
    startTimer();
  }


  background(30, 60, 30);
  textAlign(CENTER);
  textSize(48);
  fill(200, 200, 100);
  text('Invasive Plants', width / 2, height / 2 - 40);
  text('vs Zombies', width / 2, height / 2 + 20);

  textSize(24);
  fill(180, 180, 150);
  text('Press Any Key to Start', width / 2, height / 2 + 80);

  drawFlowers(); //thanks chatgpt
  serialWriteState(0);
}

function drawFlowers() {
  // Set flower colors
  let flowerColors = [
    [255, 100, 100],  // Red
    [100, 255, 100],  // Green
    [100, 100, 255],  // Blue
    [255, 255, 100],  // Yellow
    [255, 100, 255]   // Pink
  ];
  
  // Draw multiple flowers
  for (let i = 0; i < 5; i++) {
    let x = 80 + i * 80;
    let y = height - 100;
    drawFlower(x, y, flowerColors[i]);
  }
}

function drawFlower(x, y, col) {
  fill(col);
  noStroke();
  
  // Draw petals
  for (let angle = 0; angle < 360; angle += 45) {
    let rad = radians(angle);
    let petalX = x + cos(rad) * 20;
    let petalY = y + sin(rad) * 20;
    ellipse(petalX, petalY, 30, 30);
  }
  
  // Draw center
  fill(255, 200, 0);
  ellipse(x, y, 20, 20);
}
///////
///////
//////
//////

function drawWinScreen() {
  serialWriteState(2);
}



///////
///////
//////
//////
function drawLoseScreen() {
  // Background
  background(30, 30, 30);

  // "You Lose" Text
  textAlign(CENTER);
  textSize(48);
  fill(255, 50, 50);
  text('You Lose', width / 2, height / 2 - 40);

  // Subtitle Text
  textSize(24);
  fill(200, 200, 200);
  text('Press Any Key to Restart', width / 2, height / 2 + 20);
  serialWriteState(3);
}


/////
///////
///////
//////
//////


