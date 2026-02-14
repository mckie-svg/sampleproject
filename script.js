// ===== PREMIUM COLORFUL DOTS =====
const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const dots = [];
const numberOfDots = 70; // fewer but bigger

// More colorful + visible palette
const colors = [
  "rgba(59,130,246,0.8)",   // blue
  "rgba(20,184,166,0.8)",   // teal
  "rgba(99,102,241,0.8)",   // indigo
  "rgba(147,197,253,0.9)",  // light blue
  "rgba(255,255,255,1)"     // white glow
];

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 4 + 3; // BIGGER DOTS
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.6; // faster
    this.speedY = (Math.random() - 0.5) * 0.6;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;

    // Glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;

    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

function init() {
  dots.length = 0;
  for (let i = 0; i < numberOfDots; i++) {
    dots.push(new Dot());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => dot.update());
  requestAnimationFrame(animate);
}

init();
animate();
