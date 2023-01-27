class LavaLamp {
    canvas;
    ctx;
    balls = [];

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    addBall(x, y, r) {
        this.balls.push(new MetaBall(this.ctx, x, y, r));
    }

    start() {
        window.requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this.clearCanvas();

        this.balls.forEach((ball, index) => {
            if (ball.deleted)
                this.balls.splice(index, 1);

            ball.draw();
        });

        this.filterCanvas();

        window.requestAnimationFrame(this.update.bind(this));
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Sets all alpha values that are below the threshold to 0
    filterCanvas = (threshold = THRESHOLD) => {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
    
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < threshold) {
                data[i + 3] = 0;
            }
        }
    
        this.ctx.putImageData(imageData, 0, 0);
    }
}