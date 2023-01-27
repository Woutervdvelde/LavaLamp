class LavaLamp {
    balls = [];

    constructor(ctx) {
        this.ctx = ctx;
    }

    addBall(x, y, r) {
        this.balls.push(new MetaBall(this.ctx, x, y, r));
    }

    update() {
        this.balls.forEach((ball, index) => {
            if (ball.deleted)
                this.balls.splice(index, 1);

            ball.draw();
        });
    }
}