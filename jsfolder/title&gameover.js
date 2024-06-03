function drawTitleScreen() {
  image(titleScreenImage, 0, 0, 500, 600);
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text('Native Plants vs Zombies', width / 2, 75);
  textSize(18);
  fill(111, 76, 46);
  rect(115, 100, 100, 50, 5);
  rect(275, 100, 100, 50, 5);
  fill(255);
  text('Start Game', 165, 130);
  text('Plant Info', 325, 130);

  if (mouseIsPressed){
    if (mouseX > 115 && mouseX < 215 && mouseY > 100 && mouseY < 150) {
      startTimer();
      gameState = 1;
    } else if (mouseX > 275 && mouseX < 375 && mouseY > 100 && mouseY < 150) {
      gameState = 4;
    }
  }
}

function drawWinScreen() {
  serialWriteState(2);
}

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

