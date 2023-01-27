const LAVA_COLOR = '#eb7135';

class MetaBall {
    x;
    y;
    r;
    ctx;
    velocity;
    deleted;

    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.velocity = { 
            x: Math.random() * 3, 
            y: Math.random() * 3 + 1 
        };
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(x, y, radius) {
        const gradient = ctx.createRadialGradient(x, y, radius / 4, x, y, radius);
        gradient.addColorStop(0, LAVA_COLOR);
        gradient.addColorStop(1, 'transparent');

        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        this.update();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y + this.r > canvas.height)
            this.deleted = true;
    }
}