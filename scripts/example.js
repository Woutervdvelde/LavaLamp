//for example showcase
const exampleContainer = document.getElementById('circle_example');
const exampleSlider = document.getElementById('circle_slider');
const exampleCanvasContainer = document.getElementById('circle_example_canvas_container');
const exampleCanvas = document.getElementById('circle_example_canvas');
const exampleCtx = exampleCanvas.getContext('2d', { willReadFrequently: true });

const ball1 = lavaLamp.balls[0].image;
const ball2 = lavaLamp.balls[1].image;
exampleContainer.appendChild(ball1);
exampleContainer.appendChild(ball2);

const exampleContainerHeight = ball1.height > ball2.height ? ball1.height : ball2.height;
exampleContainer.style.height = `${exampleContainerHeight + 10}px`;

exampleCanvas.width = exampleCanvasContainer.clientWidth;
exampleCanvas.height = `${exampleContainerHeight + 10}`;
exampleCtx.drawImage(ball1, 0, 0);
exampleCtx.drawImage(ball2, exampleCanvas.width - ball2.width, 0);

const updateExamples = (e) => {
    const value = e.target.value;
    ball1.style.left = `${value}%`;
    ball2.style.right = `${value}%`;

    exampleCtx.clearRect(0, 0, exampleCanvas.width, exampleCanvas.height);
    exampleCtx.drawImage(ball1, exampleCanvas.width / 100 * value, 0);
    exampleCtx.drawImage(ball2, exampleCanvas.width - ball2.width - (exampleCanvas.width / 100 * value), 0);
    lavaLamp.filterCanvas(THRESHOLD, exampleCanvas, exampleCtx);
}

exampleSlider.oninput = updateExamples;
updateExamples({ target: {value: 0} });