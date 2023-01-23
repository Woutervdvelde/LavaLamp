//Inspired by Default Cube tutorial for 2D Metaballs in blender

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Canvas sizing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const drawBall = (x, y, radius, color1, color2) => {
    const gradient = ctx.createRadialGradient(x, y, radius / 4, x, y, radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}