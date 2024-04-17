let taps = [];              // collection of confetti
//make these random

// pad the screen so the fireworks don't appear too close to the edges
let padding = 10;

function setup(){
    createCanvas(800, 800);
    background(0);
}

function draw() {
    background(0);
    for (let i = 0; i < taps.length; i++) {
        let unfinished = taps[i].draw();
        if (unfinished == false) {
            taps.splice(i, 1);
        }
    }

    // save canvas because specs said so
    if (keyIsPressed && key === 's' || key === 'S') {
        saveCanvas('confetti.png');
    }
}

function mousePressed() {
    taps.push(new Confetti(mouseX, mouseY));
}

class Confetti {
    constructor(x, y) {
        this.list = [];
        this.amount = random(10, 40);
      
        for (let i = 0; i < this.amount; i++) {
          this.list.push(new Particle(x, y));
        }
    }

    draw() {
      for (let i = 0; i < this.list.length; i++) {
        let unfinished = this.list[i].draw();
        if (unfinished == false) {
          this.list.splice(i, 1);
        }
      }
      if (this.list.length <= 0) {
          return false;
      } else {
          return true;
      }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.color = [random(0,255), random(0,255), random(0,255)];
        this.size = random(3, 15);
        this.velocity = {x: random(-13, 13), y: random(-13, 13)};
        let possibilities = ['ellipse', 'square', 'triangle'];
        this.shape = possibilities[Math.floor(Math.random() * possibilities.length)];
    }

    // returns true/false on "is there more to draw?"
    draw() {
        noStroke();
        fill(...this.color);
        if(this.y < 850) {
            if (this.shape == 'ellipse') {
               ellipse(this.x, this.y, this.size, this.size);
            } else if (this.shape == 'square'){
                square(this.x, this.y, this.size);
            } else{
                triangle(this.x, this.y, this.x + random(3, 19), this.y + random(3, 19), this.x + random(3, 19), this.y + random(3, 19));
            }
           
            this.x += this.velocity.x;
            this.y += this.velocity.y;
          
            // gravity
            this.velocity.y += 0.7;
            return true;
        } else {
            return false;
        }
    }
}
