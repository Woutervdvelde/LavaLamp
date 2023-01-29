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
        const height = this.canvas.height / 20;
        const heightFromBottom = this.canvas.height - height;
        const canvas = document.createElement('canvas');
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        const ctx = canvas.getContext('2d');

        let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, LAVA_COLOR);
        gradient.addColorStop(0.75, LAVA_COLOR);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, height);
        ctx.fill();

        this.top = new Image(canvas.width, canvas.height);
        this.top.src = canvas.toDataURL();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        gradient = ctx.createLinearGradient(0, canvas.height, 0, heightFromBottom);
        gradient.addColorStop(0, LAVA_COLOR);
        gradient.addColorStop(0.75, LAVA_COLOR);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, heightFromBottom, canvas.width, canvas.height);
        ctx.fill();

        this.bottom = new Image(canvas.width, canvas.height);
        this.bottom.src = canvas.toDataURL();
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
        this.ctx.drawImage(this.top, 0, 0);
        this.ctx.drawImage(this.bottom, 0, 0);
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