class LavaLamp {
    canvas;
    ctx;
    balls = [];
    top;
    bottom;

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this._generateTopAndBottom();
    }

    _generateTopAndBottom() {
        const radius = this.canvas.width * 1.5;
        const top = new MetaBall(this.ctx, 0, -(radius / 2), radius);
        this.top = top;

        const bottom = new MetaBall(this.ctx, 0, this.canvas.height + (radius / 2), radius);
        this.bottom = bottom;
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
        this.drawTopBottom();

        this.filterCanvas();
        window.requestAnimationFrame(this.update.bind(this));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawTopBottom() {
        this.top.draw();
        this.bottom.draw();
    }

    filterCanvas = (threshold = THRESHOLD) => {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
    
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < threshold) {
                data[i + 3] = 0;
            } else {
                data[i] = LAVA_COLOR_RGB.r;
                data[i + 1] = LAVA_COLOR_RGB.g;
                data[i + 2] = LAVA_COLOR_RGB.b;
                data[i + 3] = 255;
            }
        }
    
        this.ctx.putImageData(imageData, 0, 0);
    }
}