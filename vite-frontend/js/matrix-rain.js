import { CONFIG } from './config.js';

export class MatrixRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.drops = [];
    this.fontSize = CONFIG.MATRIX_RAIN.fontSize;
    this.characters = CONFIG.MATRIX_RAIN.characters.split('');

    this.init();
    this.animate = this.animate.bind(this);
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.columns = Math.floor(this.canvas.width / this.fontSize);

    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
  }

  draw() {
    this.ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.MATRIX_RAIN.fadeOpacity})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const char = this.characters[Math.floor(Math.random() * this.characters.length)];

      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillText(char, x, y);

      if (Math.random() > 0.98) {
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#00ff41';
        this.ctx.fillText(char, x, y);
        this.ctx.shadowBlur = 0;
      }

      if (y > this.canvas.height && Math.random() > 1 - CONFIG.MATRIX_RAIN.dropSpeed) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }

  animate() {
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  }

  start() {
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
