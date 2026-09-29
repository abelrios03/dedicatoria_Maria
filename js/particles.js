/*
  ===================================================================
  SISTEMA DE PARTÍCULAS INTERACTIVO Y FUEGOS ARTIFICIALES DE CORAZONES
  Maneja el lienzo HTML5 Canvas para corazones flotantes y magia.
  ===================================================================
*/

class HeartParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.burstParticles = [];
    this.mouseTrail = [];
    this.width = 0;
    this.height = 0;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initFloatingParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initFloatingParticles() {
    const count = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createFloatingHeart());
    }
  }

  createFloatingHeart() {
    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 100,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      color: ['#ff4b8b', '#ff0055', '#ff758c', '#ffd700', '#f4acb7'][Math.floor(Math.random() * 5)],
      swing: Math.random() * 0.05,
      angle: Math.random() * Math.PI * 2
    };
  }

  bindEvents() {
    const handleMove = (x, y) => {
      for (let i = 0; i < 2; i++) {
        this.mouseTrail.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          size: Math.random() * 10 + 6,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: ['#ffd700', '#ff4b8b', '#ffffff'][Math.floor(Math.random() * 3)]
        });
      }
    };

    window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
  }

  // Ráfaga de fuegos artificiales de amor
  triggerBurst(x, y) {
    const count = 70;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.burstParticles.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 16 + 8,
        gravity: 0.12,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: ['#ff0055', '#ff4b8b', '#ffd700', '#ffffff', '#ff758c'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * Math.PI
      });
    }
  }

  drawHeart(x, y, size, color, opacity = 1, rotation = 0) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    
    // Dibujo matemático de forma de corazón perfecta
    const topCurveHeight = size * 0.3;
    this.ctx.moveTo(0, topCurveHeight);
    this.ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    this.ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    this.ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    this.ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Partículas flotantes de fondo
    this.particles.forEach((p, idx) => {
      p.y -= p.speedY;
      p.angle += p.swing;
      p.x += Math.sin(p.angle) * 0.5;

      if (p.y < -30) {
        this.particles[idx] = this.createFloatingHeart();
      }

      this.drawHeart(p.x, p.y, p.size, p.color, p.opacity, Math.sin(p.angle) * 0.2);
    });

    // 2. Rastro del ratón/táctil (destellos dorados y corazoncitos)
    for (let i = this.mouseTrail.length - 1; i >= 0; i--) {
      const t = this.mouseTrail[i];
      t.life -= t.decay;
      t.y -= 0.5;

      if (t.life <= 0) {
        this.mouseTrail.splice(i, 1);
      } else {
        this.drawHeart(t.x, t.y, t.size * t.life, t.color, t.life);
      }
    }

    // 3. Partículas de ráfagas/fuegos artificiales
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const b = this.burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.alpha -= b.decay;

      if (b.alpha <= 0) {
        this.burstParticles.splice(i, 1);
      } else {
        this.drawHeart(b.x, b.y, b.size, b.color, b.alpha, b.rotation);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.heartParticles = new HeartParticleSystem('bg-canvas');
});