class MetaBall {
    x;
    y;
    radius;
    ctx;
    velocity;
    deleted;

    constructor(ctx, x, y, radius) {
        this.ctx = ctx;
        this.velocity = { 
            x: Math.random() * 3, 
            y: Math.random() * 3 + 1 
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        const gradient = this.ctx.createRadialGradient(this.x, this.y, this.radius / 4, this.x, this.y, this.radius);
        gradient.addColorStop(0, LAVA_COLOR);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.update();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // if (this.y + this.radius > canvas.height)
            // this.deleted = true;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.velocity.x *= -1;

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.velocity.y *= -1;

        if (this.radius > LAVA_RAIDUS_MAX || this.radius < LAVA_RADIUS_MIN)
            this.velocity.y *= -1;

        this.radius += this.velocity.y / 10;
        
    }
}