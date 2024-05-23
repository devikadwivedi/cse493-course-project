let titleText = "Tower Defense Game";
let startText = "Press any button to play!";
let gameOverText = "Game Over!";
let player1WinText = "Plants Win!";
let player2WinText = "Zombies Win!";
let pulse = 0;
let pulseDirection = 1;

function drawTitleScreen(){
  background(100);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);

  textSize(32);
  text(titleText, width / 2, height / 2 - 100);

  textSize(32 + pulse);
  text(startText, width / 2, height / 2 + 100);

  pulse += pulseDirection * 0.5;
  if (pulse > 10 || pulse < 0) {
    pulseDirection *= -1;
  }
}

function drawGameOverScreen(){
  background(100);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);


  textSize(32);
  text(gameOverText, width / 2, height / 2 - 100);
  
  textSize(32 + pulse);
  text(startText, width / 2, height / 2 + 100);

  pulse += pulseDirection * 0.5;
  if (pulse > 10 || pulse < 0) {
    pulseDirection *= -1;
  }

  textSize(32);
  text(gameState == 2 ? player1WinText : player2WinText, width / 2, height / 2 - 50);

}
