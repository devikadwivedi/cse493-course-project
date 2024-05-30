let startTime;
let initialHeight = 500; // Initial height of the rectangle
let rectWidth = 5; // Width of the rectangle

function startTimer() {
  startTime = millis();
}

function updateTimer() {
  let currentTime = millis();
  let elapsedTime = currentTime - startTime;

  if (elapsedTime < totalTime) {
    let currentHeight = calculateCurrentHeight(elapsedTime);
    fill("blue");
    noStroke();
    rect(0, (height - currentHeight) / 2, rectWidth, currentHeight);
    return false;
  } else {
    gameState = 2;
    return true;
  }
}

function calculateCurrentHeight(elapsedTime) {
  let remainingTime = totalTime - elapsedTime;
  let progress = remainingTime / totalTime;
  
  // Calculate the current height based on the remaining time
  return initialHeight * progress;
}