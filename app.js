//Inspired by Default Cube tutorial for 2D Metaballs in blender
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Canvas sizing
const resize = (width, height) => {
    canvas.width = width ?? window.innerWidth / 2;
    canvas.height = height ?? window.innerHeight / 2;
}

// window.onresize = resize
resize(200, 500);


// Defaults
let THRESHOLD = 240;
let LAVA_COLOR = '#ffa72a';
let LAVA_COLOR_RGB = { r: 255, g: 167, b: 42 };
let LAVA_RADIUS_MIN = 75;
let LAVA_RAIDUS_MAX = 200;
let LAVA_SPEED = 0.4;

//random number between min and max
const random = (min = LAVA_RADIUS_MIN, max = LAVA_RAIDUS_MAX) => Math.random() * (max - min) + min;

const lavaLamp = new LavaLamp(canvas, ctx);
lavaLamp.addBall(0, 0, random());
lavaLamp.addBall(canvas.width / 3, 0, random());
lavaLamp.addBall(canvas.width / 1.5, 0, random());
lavaLamp.addBall(canvas.width, 0, random());
lavaLamp.addBall(0, canvas.height, random());
lavaLamp.addBall(canvas.width / 2, canvas.height, random());
lavaLamp.addBall(canvas.width, canvas.height, random());
lavaLamp.start();

//for example showcase
const exampleContainer = document.getElementById('circle_example');
const exampleSlider = document.getElementById('circle_slider');

const ball1 = lavaLamp.balls[0].image;
const ball2 = lavaLamp.balls[1].image;
exampleContainer.appendChild(ball1);
exampleContainer.appendChild(ball2);

const exampleContainerHeight = ball1.height > ball2.height ? ball1.height : ball2.height;
exampleContainer.style.height = `${exampleContainerHeight + 10}px`;

exampleSlider.oninput = (e) => {
    ball1.style.left = `${e.target.value}%`;
    ball2.style.right = `${e.target.value}%`;
}