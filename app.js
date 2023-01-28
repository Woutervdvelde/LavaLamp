//Inspired by Default Cube tutorial for 2D Metaballs in blender
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Canvas sizing
const resize = () => {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
}

window.onresize = resize
resize();


// Defaults
const THRESHOLD = 240;
const LAVA_COLOR = '#ffa72a';
const LAVA_COLOR_RGB = { r: 255, g: 167, b: 42 };
const LAVA_RADIUS_MIN = 25;
const LAVA_RAIDUS_MAX = 150;
const LAVA_SPEED = 0.5;

const lavaLamp = new LavaLamp(canvas, ctx);
lavaLamp.addBall(100, 100, 100);
lavaLamp.addBall(200, 200, 50);
lavaLamp.addBall(200, 200, 50);
lavaLamp.addBall(200, 200, 50);
lavaLamp.addBall(200, 200, 50);
lavaLamp.addBall(200, 200, 50);
lavaLamp.addBall(200, 200, 50);
lavaLamp.start();