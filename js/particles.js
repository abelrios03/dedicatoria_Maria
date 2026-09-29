class HeartParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.particles = [];
    this.burstParticles = [];
    this.mouseTrail = [];

    this.width = 0;
    this.height = 0;

    this.resize();

    window.addEventListener("resize", () => this.resize());

    this.initFloatingParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = this.width * ratio;
    this.canvas.height = this.height * ratio;

    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  initFloatingParticles() {
    const count = Math.min(Math.floor(window.innerWidth / 22), 55);

    for (let i = 0; i < count; i++) {
      const heart = this.createFloatingHeart();
      heart.y = Math.random() * this.height;
      this.particles.push(heart);
    }
  }

  createFloatingHeart() {
    const colors = [
      "#ff4f91",
      "#ff82ae",
      "#ffd76a",
      "#ffffff",
      "#d92c68"
    ];

    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 100,
      size: Math.random() * 9 + 5,
      speedY: Math.random() * 0.7 + 0.2,
      speedX: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      swing: Math.random() * 0.035 + 0.01
    };
  }

  bindEvents() {
    const handleMove = (x, y) => {
      if (this.mouseTrail.length > 90) return;

      for (let i = 0; i < 2; i++) {
        this.mouseTrail.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          size: Math.random() * 6 + 4,
          life: 1,
          decay: Math.random() * 0.035 + 0.025,
          color: Math.random() < 0.6 ? "#ff82ae" : "#ffd76a"
        });
      }
    };

    window.addEventListener("mousemove", (event) => {
      handleMove(event.clientX, event.clientY);
    });

    window.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length) {
          handleMove(
            event.touches[0].clientX,
            event.touches[0].clientY
          );
        }
      },
      { passive: true }
    );
  }

  triggerBurst(x, y, count = 55) {
    const colors = [
      "#ff1767",
      "#ff4f91",
      "#ff91b7",
      "#ffd76a",
      "#ffffff"
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1.5;

      this.burstParticles.push({
        x: x ?? this.width / 2,
        y: y ?? this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 9 + 4,
        gravity: 0.075,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: Math.random() * 0.08 - 0.04
      });
    }
  }

  drawHeart(x, y, size, color, opacity = 1, rotation = 0) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    ctx.beginPath();

    const top = size * 0.3;

    ctx.moveTo(0, top);

    ctx.bezierCurveTo(
      0,
      0,
      -size / 2,
      0,
      -size / 2,
      top
    );

    ctx.bezierCurveTo(
      -size / 2,
      (size + top) / 2,
      0,
      size,
      0,
      size
    );

    ctx.bezierCurveTo(
      0,
      size,
      size / 2,
      (size + top) / 2,
      size / 2,
      top
    );

    ctx.bezierCurveTo(
      size / 2,
      0,
      0,
      0,
      0,
      top
    );

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  animate() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((particle, index) => {
      particle.y -= particle.speedY;
      particle.angle += particle.swing;

      particle.x +=
        particle.speedX +
        Math.sin(particle.angle) * 0.35;

      if (particle.y < -30) {
        this.particles[index] = this.createFloatingHeart();
      }

      this.drawHeart(
        particle.x,
        particle.y,
        particle.size,
        particle.color,
        particle.opacity,
        Math.sin(particle.angle) * 0.15
      );
    });

    for (let i = this.mouseTrail.length - 1; i >= 0; i--) {
      const particle = this.mouseTrail[i];

      particle.life -= particle.decay;
      particle.y -= 0.5;

      if (particle.life <= 0) {
        this.mouseTrail.splice(i, 1);
      } else {
        this.drawHeart(
          particle.x,
          particle.y,
          particle.size * particle.life,
          particle.color,
          particle.life
        );
      }
    }

    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const particle = this.burstParticles[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.alpha -= particle.decay;
      particle.rotation += particle.rotationSpeed;

      if (particle.alpha <= 0) {
        this.burstParticles.splice(i, 1);
      } else {
        this.drawHeart(
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.alpha,
          particle.rotation
        );
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.heartParticles = new HeartParticleSystem("bg-canvas");
});