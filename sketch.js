var position;

var UP;
var DOWN;
var LEFT;
var RIGHT;

var r = 10;
var moveSpeed = 3;

var obstacles = [
  { x: 100, y: -50, w: 50, h: 150 },
  { x: -10, y: -250, w: 120, h: 70 },
  { x: -200, y: 50, w: 60, h: 190 },
];

function setup() {
  createCanvas(600, 600);

  UP = createVector(0, -1);
  DOWN = createVector(0, 1);
  LEFT = createVector(-1, 0);
  RIGHT = createVector(1, 0);

  position = createVector(0, 0);
}

function draw() {
  background(220);

  translate(width / 2 - position.x, height / 2 - position.y);

  //draw obstacles
  fill(0, 255, 0);
  obstacles.forEach((obstacle) => {
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  });

  //draw player
  fill(255, 0, 0);
  ellipse(position.x, position.y, r * 2);

  movement();
}

function movement() {
  var velocity = createVector(0, 0);

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    velocity.add(LEFT);
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    velocity.add(RIGHT);
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    velocity.add(UP);
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    velocity.add(DOWN);
  }

  if (velocity.magSq() > 0) {
    velocity = velocity.normalize().mult(moveSpeed);
  }

  var potentialPosition = position.add(velocity);

  obstacles.forEach((obstacle) => {
    var nearestPoint = createVector(0, 0);
    nearestPoint.x = max(obstacle.x, min(obstacle.x + obstacle.w, position.x));
    nearestPoint.y = max(obstacle.y, min(obstacle.y + obstacle.h, position.y));

    fill(0, 0, 255);
    ellipse(nearestPoint.x, nearestPoint.y, 5);

    var rayToNearestPoint = nearestPoint.sub(potentialPosition);
    var overlap = this.r - rayToNearestPoint.mag();

    if (isNaN(overlap)) overlap = 0;

    //if overlap > 0 that means there is a collision
    if (overlap > 0) {
      potentialPosition.sub(rayToNearestPoint.normalize().mult(overlap));
    }
  });

  position = potentialPosition;
}
