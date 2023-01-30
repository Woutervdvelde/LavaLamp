const menu = document.getElementById('menu-bar');
menu.onclick = () => {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}

const addBall = document.getElementById('spawn_ball');
addBall.onclick = () => {
    lavaLamp.addBall(random(0, canvas.width), random(0, canvas.height), random());
}

const removeBallButton = document.getElementById('remove_ball');
removeBallButton.onclick = () => {
    lavaLamp.balls.pop();
}

const updateSpeed = (addition) => {
    LAVA_SPEED = Math.round((LAVA_SPEED + addition) * 10) / 10;
    if (LAVA_SPEED < 0) LAVA_SPEED = 0;
    document.getElementById('current_speed').innerHTML = LAVA_SPEED;
}

const speedDown = document.getElementById('speed_down');
const speedUp = document.getElementById('speed_up');
speedDown.onclick = () => updateSpeed(-0.1);
speedUp.onclick = () => updateSpeed(0.1);
updateSpeed(0);