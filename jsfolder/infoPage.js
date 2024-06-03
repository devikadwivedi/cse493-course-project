function drawInfoScreen() {
  background(220);
  if (showInfoPage) {
    drawInfoCard();
  } else {
    drawTitles();
    drawTiles();
  }
}

function drawTitles() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text("Native Plants", width / 2, 75);
  text("Invasive Plants", width / 2, 250);
}

function drawTiles() {
  let yOffset = 100;
  // Draw Native Plants
  for (let i = 0; i < numNativeRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let plantIndex = i * numCols + j;
      if (plantIndex < nativeImages.length) {
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        image(nativeImages[plantIndex], x, y, tileSize, tileSize);
      }
    }
  }

  yOffset = 275;

  // Draw Invasive Plants
  for (let i = 0; i < numInvasiveRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let plantIndex = i * numCols + j;
      if (plantIndex < invasiveImages.length) {
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        image(invasiveImages[plantIndex], x, y, tileSize, tileSize);
      }
    }
  }
  fill(111, 76, 46);
  rect(400, 550, 50, 25);
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Back", 425, 565);
}

function mousePressedInfoPage() {
  if (showInfoPage) {
    // Check if the "Back to Menu" button is clicked
    if (mouseX > 375 && mouseX < 425 && mouseY > 500 && mouseY < 550) {
      showInfoPage = false;
    }
  } else {
    if (mouseX > 400 && mouseX < 450 && mouseY > 550 && mouseY < 600) {
      gameState = 0;
    }
    let yOffset = 100;
    for (let i = 0; i < numNativeRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let plantIndex = i * numCols + j;
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        if (mouseX > x && mouseX < x + tileSize && mouseY > y && mouseY < y + tileSize) {
          currentPlant = nativeInfo[plantIndex];
          showInfoPage = true;
          return;
        }
      }
    }

    yOffset = 275;
    for (let i = 0; i < numInvasiveRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let plantIndex = i * numCols + j;
        let x = j * (tileSize + tileSpacing) + tileSpacing / 2;
        let y = yOffset + i * (tileSize + tileSpacing);
        if (mouseX > x && mouseX < x + tileSize && mouseY > y && mouseY < y + tileSize) {
          currentPlant = invasiveInfo[plantIndex];
          showInfoPage = true;
          return;
        }
      }
    }
  }
}

function drawInfoCard() {
  background(111, 76, 46);
  fill(255);
  rect(50, 50, 400, 500);

  if (currentPlant) {
    image(currentPlant.img, 100, 75, 300, 300);

    textSize(24);
    fill(0);
    textAlign(LEFT, TOP);
    text(currentPlant.name, 100, 400);

    fill(currentPlant.type === "native" ? "green" : "red");
    text(currentPlant.type.charAt(0).toUpperCase() + currentPlant.type.slice(1), 350, 400);

    fill(0);
    textSize(16);
    text(currentPlant.description, 100, 430, 300, 50); // Text box for description

    fill(111, 76, 46);
    rect(375, 500, 50, 25);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Back", 400,513);
  }
}
