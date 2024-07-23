let particles = [];  
let stars = [];      
let bgColor = 0;  

let chimeSound;

function preload() {
  chimeSound = loadSound('chime.wav'); 
}


function setup() {
    chimeSound.setVolume(0.1);
    createCanvas(windowWidth, windowHeight);

    // Generate stars and store their properties
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3)
        });
    }
}

function draw() {
    
    fill(bgColor, 40);
    rect(0, 0, width, height);

    // Draw static stars
    drawStars();

    // Particle effects
    blendMode(ADD);  // Creates bright, overlapping light effects
    particles.forEach(particle => {
        particle.update();
        particle.display();
    });
    
    blendMode(BLEND);
    particles = particles.filter(particle => !particle.isDead());
}

// Function to draw stars based on stored data
function drawStars() {
    fill(255);  // White color for stars
    noStroke();
    stars.forEach(star => {
        ellipse(star.x, star.y, star.size, star.size);
    });
}

function mousePressed() {
    // Add a new particle at the mouse position
    particles.push(new Particle(mouseX, mouseY));
    chimeSound.play();
}
function touchStarted() {
    particles.push(new Particle(touchX, touchY));
    chimeSound.play();
    return false; // Return false to prevent default touch event behavior and prevent scrolling or zooming the screen.
}

function getRandomGalaxyColor() {
   
    const galaxyColors = [
        color(68, 35, 124),  // Deep Purple
        color(94, 53, 177),  // Light Purple
        color(129, 52, 175), // Medium Purple
        color(194, 54, 122), // Pink
        color(241, 108, 146), // Light Pink
        color(255, 156, 187), // Soft Pink
        color(255, 204, 0),   // Bright Yellow
        color(255, 223, 0),   // Golden Yellow
        color(255, 229, 180)  // Pale Yellow
    ];

    // Randomly pick one of the galaxy colors
    return random(galaxyColors);
}

// Particle class
class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1, 5));  // Control initial speed
        this.size = random(10, 30);   // Initial size
        this.lifespan = 255;          // Starting opacity for fading effect
        this.color = getRandomGalaxyColor();  // Use galaxy color
    }

    update() {
        this.pos.add(this.vel);
        this.lifespan -= 3;  // Fade out rate
        this.size *= 0.995;  // Gradually reduce size
        if (this.lifespan < 0) this.lifespan = 0;  // Ensure lifespan doesn't go negative
    }

    display() {
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
