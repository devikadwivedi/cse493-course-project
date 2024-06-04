let startTime = -1;
let initialHeight = 500; // Initial height of the rectangle
let rectWidth = 5; // Width of the rectangle

function startTimer() {
  if (startTime < 0){
    startTime = millis();
  }
}

function updateTimer() {
  let currentTime = millis();
  let elapsedTime = currentTime - startTime;

  if (elapsedTime < totalTime) {
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

function ResetTimer() {
  startTime = -1;
}