let img, img2, img3, img4;
let images = [];
let counter = 0;

function preload() {
  img = loadImage('aventurine.PNG');
  img2 = loadImage('acheron.PNG');
  img3 = loadImage('blade.PNG');
  img4 = loadImage('kafka.PNG');

  images.push(img);
  images.push(img2);
  images.push(img3);
  images.push(img4);
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('canvas-container');

  //inputElement = createFileInput(handleFile);
  //inputElement.position(0, 0);
  images[counter].resize(width, height);
  noSmooth();
  image(images[counter], 0, 0);
}

function draw() {
    const y = frameCount % height;
    const range = getPixelRange(y);

    for (let x = 0; x < width; x++) {
        const leftX = constrain(x - range, 0, width);
        const rightX = constrain(x + range, 0, width);
        let sampleX = random(leftX, rightX);

        const topY = constrain(y - range, 0, height);
        const bottomY = constrain(y + range, 0, height);
        let sampleY = random(topY, bottomY);

        const pixelColor = images[counter].get(sampleX, sampleY);

        stroke(pixelColor);
        point(x, y);
    }

    //if button pressed then switch image
}

function mousePressed(){
    background(255); // wipe last image
    counter++;
    counter = counter % images.length;
    // image(images[counter], 0, 0, width, height);
    images[counter].resize(width, height);
    noSmooth();
    image(images[counter], 0, 0, width, height);
}

function getPixelRange(y) {
  return map(pow(y, 3), 
  0, pow(height, 3), 
  0, 50);
}