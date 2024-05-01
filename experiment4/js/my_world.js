"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  //return 32;
  return 32;
}
function p3_tileHeight() {
  //return 16;
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  //hashedRandom
}

function hashedRandom(hash, min, max) {
  return ((hash % 100) / 100) * (max - min) + min;
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  let hash = XXH.h32("tile:" + [i, j], worldSeed);
  let scale = 0.1;
  let v = noise(i * scale, j * scale);
  if (v < 0.3) {
    //water
    fill(24, 253, 238);
  } else if (v < 0.4) {
    //sand
    fill(7, 7, 7);
  } else {
    //forest
    fill(20, 29, 85);
  }

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  if (v < 0.3) {
    let xoff = hashedRandom(hash, -tw / 2 + 4, tw / 2 - 4);
    let yoff = hashedRandom(hash, -th / 2 + 4, th / 2 - 2);
    fill(255);
    beginShape();
    vertex(-4 + xoff, 0 + yoff);
    vertex(0 + xoff, 2 + yoff);
    vertex(4 + xoff, 0 + yoff);
    vertex(0 + xoff, -2 + yoff);
    endShape(CLOSE);
  }

  //peak height of building = (0, -th - 45)
  //height of left side = (-tw + 10, -50)
  //height of right side = (tw - 10, -50)

  let offsetHeight = hashedRandom(hash, 10, 50); //abs(i + j) % 20;
  let n = clicks[[i, j]] | 0;
    // left plane
    fill(0, 0, 0);
    beginShape();
    vertex(-tw + 10, 0); //1
    vertex(-tw + 10, -50 - offsetHeight); //2
    vertex(0, th - 50 - 5 - offsetHeight); //3
    vertex(0, th - 5); //4
    endShape(CLOSE);

    // right
    fill(118, 118, 118);
    beginShape();
    vertex(tw - 10, 0); //7
    vertex(tw - 10, -50 - offsetHeight); //6
    vertex(0, th - 50 - 5 - offsetHeight); //3
    vertex(0, th - 5); //4
    endShape(CLOSE);

    fill(255, 255, 255);
    beginShape();
    vertex(-tw + 10, -50 - offsetHeight); //2
    vertex(0, th - 55 - offsetHeight); //3
    vertex(tw - 10, -50 - offsetHeight); //6
    vertex(0, -th - 45 - offsetHeight); //5
    endShape(CLOSE);

    let birdHeight = -50-offsetHeight;
    //testing
    if (n % 2 == 1) {
    fill(255, 0, 0);
    ellipse(0, birdHeight, 30, 30); //body
    fill(7, 0, 0);
    ellipse(-2, birdHeight-5, 5, 5); //eye
    fill(243, 220, 125);
    ellipse(7, birdHeight-10, 5, 5); //beak ellipse base
    fill(243, 220, 125);
    triangle(4.1, birdHeight-11, 9.2, birdHeight-10, 10, birdHeight-15); //beak triangle
    }
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}

