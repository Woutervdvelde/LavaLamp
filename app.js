//Inspired by Default Cube tutorial for 2D Metaballs in blender

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Defaults
const THRESHOLD = 210;
const LAVA_COLOR = '#eb7135';
const LAVA_RADIUS_MIN = 25;
const LAVA_RAIDUS_MAX = 150;

// Canvas sizing
const resize = () => {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
}

window.onresize = resize
resize();


// Sets all alpha values that are below the threshold to 0
const filterCanvas = (threshold = THRESHOLD) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha < threshold) {
            data[i + 3] = 0;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

// Clears the canvas
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


let x = canvas.width / 2;
let y = 0;
const draw = () => {
    clearCanvas();
    drawBall(canvas.width / 2 - 50, canvas.height / 2, 100, LAVA_COLOR, 'transparent');
    drawBall(x, y, 75, LAVA_COLOR, 'transparent');
    filterCanvas();
    y++;
    window.requestAnimationFrame(draw);
}