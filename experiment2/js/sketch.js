// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  let button = createButton("reimagine");
  button.mousePressed(() => {seed++; count = 0;});
  button.parent("reimagine-container");
  canvas.mousePressed(() => {flowerFlag = true; clickedFlowers.push([mouseX, mouseY]);});
}

/* exported setup, draw */
let seed = 2049;

const skyColor = "#2a4180";
const grassColor = "#98a54b";
const mountainColor = "#e4e3e6";
const mountainShadow = "bfc2d0";
const flower1Color = [244, 188, 237];
const flower2Color = [168, 52, 137];
const flower3Color = [102, 204, 255];
let clickedFlowers = []; // save mouseX, mouseY values
let flowerFlag = false;


function draw() {
  randomSeed(seed);
  background(100);
  
  noStroke();
  
  //sky
  fill(skyColor);
  rect(0, 0, width, height / 2.5);
  
  
  //grass
  fill(grassColor);
  rect(0, height / 2.5, width, height / 1.5);
  
  //mountain base
  fill(mountainColor);
  beginShape();
  let offset = 15;
  vertex(0, height / 2 - offset);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) - height / 30;
    vertex(x, y - offset);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  fill(mountainShadow);
  beginShape();
  let offset2 = 15;
  vertex(0, height / 2 - offset);
  const steps2 = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 2 - height / 30;
    vertex(x, y - offset2);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  if (flowerFlag) {
    fill(...flower1Color, count);
    const trees = 50*random();
    const scrub = mouseX/width;
    for (let i = 0; i < trees; i++) {
      let z = random(0, 1);
      let x = width * ((random(0, 10) + (scrub/50 + millis() / 500000.0) / z) % 1);
      // let x = width * random(0, 1);
      //console.log(x);
      // let s = width / 50 / z;
      let s = z * 20;
      let y = height / 2 + height / 20 / z;
      ellipse(x, y, s, s);
    }
    fill(...flower2Color, count);
    //const trees = 20*random();
    //const scrub = mouseX/width;
    for (let i = 0; i < trees; i++) {
      let z = random(0, 1);
      let x = width * ((random(0, 10) + (scrub/50 + millis() / 500000.0) / z) % 1);
      // let x = width * random(0, 1);
      //console.log(x);
      // let s = width / 50 / z;
      let s = z * 20;
      let y = height / 2 + height / 20 / z;
      ellipse(x, y, 20-s, 20-s);
    }
    
       
    fill(...flower3Color, count);
    for (let i = 0; i < clickedFlowers.length; i++){
      ellipse(...clickedFlowers[i], random()* 30);
    }
    
    count -= 0.8;
    if(count <= 0){
      count = 255;
      flowerFlag = false;
      clickedFlowers = [];
    }
  }
}
let count = 255;
