// =========================================
//  CTA SECTION ANIMATION (Rising Particles)
// =========================================
const ctaCanvas = document.getElementById("ctaCanvas");
if (ctaCanvas) {
    const ctaCtx = ctaCanvas.getContext("2d");
    let ctaParticles = [];

    function resizeCtaCanvas() {
        // Use offsetWidth/Height to match the container size
        const parent = ctaCanvas.parentElement;
        ctaCanvas.width = parent.offsetWidth;
        ctaCanvas.height = parent.offsetHeight;
        initCtaParticles();
    }

    class CtaParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * ctaCanvas.width;
            this.y = initial ? Math.random() * ctaCanvas.height : ctaCanvas.height + 10;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y -= this.speed;
            if (this.y < -10) this.reset();
        }

        draw() {
            ctaCtx.fillStyle = `rgba(147, 197, 253, ${this.opacity})`; // Light blue tint
            ctaCtx.beginPath();
            ctaCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctaCtx.fill();
        }
    }

    function initCtaParticles() {
        ctaParticles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 80;
        for (let i = 0; i < particleCount; i++) {
            ctaParticles.push(new CtaParticle());
        }
    }

    function animateCta() {
        ctaCtx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
        ctaParticles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateCta);
    }

    window.addEventListener("resize", resizeCtaCanvas);
    // Initialize
    resizeCtaCanvas();
    animateCta();
}




/**
 * Professional Mobile Menu Controller
 * Ensures consistent behavior on every toggle.
 */

let scrollPosition = 0;

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('translate-x-full')) {
        openMenu();
    } else {
        closeMenu();
    }
}

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


function openContactModal(serviceName) {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    
    if (serviceName) {
        const select = modal.querySelector('select[name="service"]');
        if (select) select.value = serviceName;
    }

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

// =========================================
//  PAGE LOGIC (Moved from index.html)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll Animation (Fade In) using IntersectionObserver
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                fadeObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        fadeObserver.observe(el);
    });

    // 3. Animated Counters (Optimized with requestAnimationFrame)
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        let countersAnimated = false;
        
        const animateCounters = () => {
            if (countersAnimated) return;
            countersAnimated = true;

            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease-out function for smoother effect
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    counter.innerText = Math.ceil(easeOut * target);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                requestAnimationFrame(updateCounter);
            });
        };

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // 4. Navbar Hide/Show on Scroll (Throttled)
    const navbar = document.getElementById("navbar");
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                // Only update if scrolled more than 80px to avoid jitter at top
                if (scrollTop > 80) {
                    if (scrollTop > lastScrollTop) {
                        // Scrolling Down
                        navbar.style.transform = "translateY(-100%)";
                        navbar.style.opacity = "0";
                    } else {
                        // Scrolling Up
                        navbar.style.transform = "translateY(0)";
                        navbar.style.opacity = "1";
                    }
                } else {
                    // At top
                    navbar.style.transform = "translateY(0)";
                    navbar.style.opacity = "1";
                }
                lastScrollTop = Math.max(0, scrollTop); // Prevent negative scroll
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true }); // Passive listener improves scroll performance

    // 5. Optimize Video Performance (Pause when not in view)
    const homeSection = document.getElementById('home');
    const bgVideo = homeSection ? homeSection.querySelector('video') : null;

    if (homeSection && bgVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    bgVideo.pause();
                } else {
                    bgVideo.play().catch(() => {});
                }
            });
        }, { threshold: 0 });
        videoObserver.observe(homeSection);
    }

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-200');
                b.classList.add('bg-white', 'text-slate-500', 'border', 'border-slate-200');
            });
            // Add active class to clicked
            btn.classList.remove('bg-white', 'text-slate-500', 'border', 'border-slate-200');
            btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-200');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.classList.add('block');
                    item.animate([
                        { opacity: 0, transform: 'scale(0.9)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], { duration: 300, easing: 'ease-out' });
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('block');
                }
            });
        });
    });

    // 7. Lightbox Feature
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxTags = document.getElementById('lightbox-tags');

    window.openLightbox = (card) => {
        const img = card.querySelector('img').src;
        const category = card.querySelector('.absolute.top-4.left-4').innerText;
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const tags = card.querySelector('.flex.flex-wrap.gap-2').innerHTML;

        lightboxImg.src = img;
        lightboxCategory.innerText = category;
        lightboxTitle.innerText = title;
        lightboxDesc.innerText = desc;
        lightboxTags.innerHTML = tags;

        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.querySelector('.transform').classList.remove('scale-95');
            lightbox.querySelector('.transform').classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightbox.querySelector('.transform').classList.remove('scale-100');
        lightbox.querySelector('.transform').classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 500);
    };

    // Attach click listeners to project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => window.openLightbox(item));
    });
});