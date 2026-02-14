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





/**
 * Professional Mobile Menu Controller
 * Ensures consistent behavior on every toggle.
 */

let scrollPosition = 0;

function openMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    // 1. Record current scroll position to prevent the page from jumping to the top
    scrollPosition = window.pageYOffset;

    // 2. Reveal UI Elements
    menu.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');

    // 3. Apply Professional Scroll Lock
    // We use fixed positioning to "freeze" the background layer
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    // 1. Hide UI Elements
    menu.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');

    // 2. Remove Scroll Lock
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');

    // 3. Restore Scroll Position
    window.scrollTo(0, scrollPosition);
}

// Ensure the overlay click always triggers the close function
document.getElementById('mobile-menu-overlay').addEventListener('click', closeMenu);


function openCVModal() {
    const modal = document.getElementById('cv-modal');
    const content = document.getElementById('cv-modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeCVModal() {
    const modal = document.getElementById('cv-modal');
    const content = document.getElementById('cv-modal-content');
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock background scroll
    }, 500);
}

function openContactModal() {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 500);
}

function openCVModal() {
    const modal = document.getElementById('cv-modal');
    const content = document.getElementById('cv-modal-content');
    
    // 1. Remove 'hidden' so the flex container can calculate the center
    modal.classList.remove('hidden');
    
    // 2. Trigger transitions
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);

    // 3. THE LOCK: Prevents background movement while modal is open
    // We lock both html and body for maximum browser compatibility
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // 4. Mobile specific: Prevent touch-scrolling the background
    document.addEventListener('touchmove', freezeBackground, { passive: false });
}

function closeCVModal() {
    const modal = document.getElementById('cv-modal');
    const content = document.getElementById('cv-modal-content');
    
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        
        // 5. RESTORE: Bring back the scrollbars
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', freezeBackground);
    }, 500);
}

function freezeBackground(e) {
    // Allows scrolling INSIDE the modal content if it's too long, 
    // but blocks the background from moving.
    if (!e.target.closest('#cv-modal-content')) {
        e.preventDefault();
    }
}