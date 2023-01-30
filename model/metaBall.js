class MetaBall {
    x;
    y;
    radius;
    image;
    ctx;
    velocity;
    deleted;

    constructor(ctx, x, y, radius) {
        this.ctx = ctx;
        this._generateVelocity();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.image = this._generateImage();
    }

    _generateVelocity() {
        this.velocity = {
            x: (Math.random() * 0.1),
            y: ((Math.random() * 0.9) + 0.1)
        }
    }

    _generateImage() {
        const canvas = document.createElement('canvas');
        canvas.width = this.radius * 2;
        canvas.height = this.radius * 2;

        let x = this.radius;
        let y = this.radius;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(x,y, this.radius / 4, x,y, this.radius);
        gradient.addColorStop(0, LAVA_COLOR);
        gradient.addColorStop(1, 'transparent');
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        const image = new Image(canvas.width, canvas.height);
        image.src = canvas.toDataURL();

        return image;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius)
        this.update();
    }

    update() {
        this.x += this.velocity.x * LAVA_SPEED;
        this.y += this.velocity.y * LAVA_SPEED;

        if (this.x  > canvas.width || this.x < 0)
            this.velocity.x *= -1;

        if (this.y < 0)
            this._generateVelocity();
        if (this.y > canvas.height)
            this.velocity.y *= -1;
    }
}