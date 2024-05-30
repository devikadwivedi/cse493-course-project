class Sun {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = random(-1, -0.5); // Random horizontal speed towards the left
    this.speedY = random(-0.3, 0.3); // Random vertical speed
  }

  display() {
    // Draw the center circle
    fill(255, 204, 0, 200);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);

    // Draw the triangles around the circle
    const numTriangles = 8;
    const angle = TWO_PI / numTriangles;

    for (let i = 0; i < numTriangles; i++) {
      let theta = i * angle;
      let x1 = this.x + cos(theta) * this.radius;
      let y1 = this.y + sin(theta) * this.radius;
      let x2 = this.x + cos(theta + angle / 2) * (this.radius * 1.5);
      let y2 = this.y + sin(theta + angle / 2) * (this.radius * 1.5);
      let x3 = this.x + cos(theta + angle) * this.radius;
      let y3 = this.y + sin(theta + angle) * this.radius;

      fill(255, 153, 51, 150);
      triangle(x1, y1, x2, y2, x3, y3);
    }
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around when suns reach the edge of the canvas
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }

    if (this.y > 500) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }
  }
}