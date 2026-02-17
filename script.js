// =========================================
//  CTA SECTION ANIMATION (Rising Particles)
// =========================================
const ctaCanvas = document.getElementById("ctaCanvas");
if (ctaCanvas) {
    const ctaCtx = ctaCanvas.getContext("2d");
    let ctaParticles = [];

    function resizeCtaCanvas() {
        const parent = ctaCanvas.parentElement;
        ctaCanvas.width = parent.offsetWidth;
        ctaCanvas.height = parent.offsetHeight;
        initCtaParticles();
    }

    class CtaParticle {
        constructor() { this.reset(true); }
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
            ctaCtx.fillStyle = `rgba(147, 197, 253, ${this.opacity})`;
            ctaCtx.beginPath();
            ctaCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctaCtx.fill();
        }
    }

    function initCtaParticles() {
        ctaParticles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 80;
        for (let i = 0; i < particleCount; i++) ctaParticles.push(new CtaParticle());
    }

    function animateCta() {
        ctaCtx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
        ctaParticles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateCta);
    }

    window.addEventListener("resize", resizeCtaCanvas);
    resizeCtaCanvas();
    animateCta();
}

// =========================================
//  MOBILE MENU
// =========================================
let scrollPosition = 0;
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('translate-x-full')) openMenu();
    else closeMenu();
}
function openMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    scrollPosition = window.pageYOffset;
    menu.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}
function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    menu.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}
document.getElementById('mobile-menu-overlay').addEventListener('click', closeMenu);

// =========================================
//  MODALS
// =========================================
function openContactModal(serviceName) {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    if (serviceName) {
        const select = modal.querySelector('select[name="service"]');
        if (select) {
            select.value = serviceName;
            select.dispatchEvent(new Event('change'));
        }
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
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', freezeBackground, { passive: false });
}
function closeCVModal() {
    const modal = document.getElementById('cv-modal');
    const content = document.getElementById('cv-modal-content');
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', freezeBackground);
    }, 500);
}
function freezeBackground(e) {
    if (!e.target.closest('#cv-modal-content')) e.preventDefault();
}

// =========================================
//  EMAILJS + FORM VALIDATION (FIXED "OTHER")
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("YcueGlES5XY04shEy");

    const contactForm = document.getElementById('contact-form');
    const serviceSelect = document.getElementById('service-select');
    const otherServiceContainer = document.getElementById('other-service-container');
    const otherServiceInput = document.getElementById('other_service');

    // Show/hide "Other" input dynamically
    if (serviceSelect && otherServiceContainer) {
        serviceSelect.addEventListener('change', () => {
            if (serviceSelect.value === 'Other') {
                otherServiceContainer.classList.remove('hidden');
                otherServiceInput.required = true;
            } else {
                otherServiceContainer.classList.add('hidden');
                otherServiceInput.required = false;
                otherServiceInput.value = '';
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                const errorMsg = input.parentElement.querySelector('.error-msg');
                let isFieldValid = input.value.trim() !== '';
                if (input.type === 'email' && isFieldValid) {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isFieldValid = pattern.test(input.value);
                }
                if (!isFieldValid) {
                    isValid = false;
                    input.classList.add('border-red-500', 'focus:border-red-500');
                    if (errorMsg) errorMsg.classList.remove('hidden');
                } else {
                    input.classList.remove('border-red-500', 'focus:border-red-500');
                    input.classList.add('border-slate-200', 'focus:border-blue-600');
                    if (errorMsg) errorMsg.classList.add('hidden');
                }
            });
            if (!isValid) return;

            // Determine the final service to send
            const finalService = (serviceSelect.value === 'Other' && otherServiceInput.value.trim() !== '') 
                ? otherServiceInput.value.trim() 
                : serviceSelect.value;

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';

            const params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                service: finalService, // FIXED: sends only the selected or typed service
                message: document.getElementById("comment-section").value,
                time: new Date().toLocaleString(),
            };

            emailjs.send('service_vbqnk58', 'template_aekxfsl', params, 'YcueGlES5XY04shEy')
                .then(() => {
                    btn.innerText = 'Message Sent!';
                    contactForm.reset();
                    if (otherServiceContainer) otherServiceContainer.classList.add('hidden');
                    setTimeout(() => {
                        btn.innerText = originalText;
                        closeContactModal();
                    }, 2000);
                }, (error) => {
                    btn.innerText = 'Failed to Send';
                    console.error('EmailJS Error:', error);
                    alert('Failed to send: ' + (error.text || JSON.stringify(error)));
                    setTimeout(() => btn.innerText = originalText, 2000);
                });
        });

        // Clear errors on input
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            ['input', 'change'].forEach(evt => input.addEventListener(evt, () => {
                if (input.classList.contains('border-red-500')) {
                    input.classList.remove('border-red-500', 'focus:border-red-500');
                    input.classList.add('border-slate-200', 'focus:border-blue-600');
                    const errorMsg = input.parentElement.querySelector('.error-msg');
                    if (errorMsg) errorMsg.classList.add('hidden');
                }
            }));
        });
    }

    // =========================================
    // Other page scripts (unchanged)
    // =========================================
    // Smooth scroll, fade animations, counters, navbar, video autoplay, filtering, lightbox
    // ... (keep your previous code as is)
});


    // =========================================
    //  Other page scripts: Scroll, counters, lightbox, project filtering
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-animate').forEach(el => fadeObserver.observe(el));

    // Counters
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        let countersAnimated = false;
        const animateCounters = () => {
            if (countersAnimated) return;
            countersAnimated = true;
            document.querySelectorAll('.counter').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const startTime = performance.now();
                const updateCounter = currentTime => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    counter.innerText = Math.ceil(easeOut * target);
                    if (progress < 1) requestAnimationFrame(updateCounter);
                    else counter.innerText = target;
                };
                requestAnimationFrame(updateCounter);
            });
        };
        const statsObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) animateCounters();
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Navbar hide/show
    const navbar = document.getElementById("navbar");
    let lastScrollTop = 0;
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 80) {
                    navbar.style.transform = scrollTop > lastScrollTop ? "translateY(-100%)" : "translateY(0)";
                    navbar.style.opacity = scrollTop > lastScrollTop ? "0" : "1";
                } else {
                    navbar.style.transform = "translateY(0)";
                    navbar.style.opacity = "1";
                }
                lastScrollTop = Math.max(0, scrollTop);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Video autoplay/pause
    const homeSection = document.getElementById('home');
    const bgVideo = homeSection ? homeSection.querySelector('video') : null;
    if (homeSection && bgVideo) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting ? bgVideo.play().catch(()=>{}) : bgVideo.pause());
        }, { threshold: 0 });
        videoObserver.observe(homeSection);
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('bg-blue-600','text-white','shadow-lg','shadow-blue-200'));
            filterBtns.forEach(b => b.classList.add('bg-white','text-slate-500','border','border-slate-200'));
            btn.classList.remove('bg-white','text-slate-500','border','border-slate-200');
            btn.classList.add('bg-blue-600','text-white','shadow-lg','shadow-blue-200');

            const filter = btn.getAttribute('data-filter');
            projectItems.forEach(item => {
                if(filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden'); item.classList.add('block');
                } else {
                    item.classList.add('hidden'); item.classList.remove('block');
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxTags = document.getElementById('lightbox-tags');

    window.openLightbox = card => {
        lightboxImg.src = card.querySelector('img').src;
        lightboxCategory.innerText = card.querySelector('.absolute.top-4.left-4').innerText;
        lightboxTitle.innerText = card.querySelector('h3').innerText;
        lightboxDesc.innerText = card.querySelector('p').innerText;
        lightboxTags.innerHTML = card.querySelector('.flex.flex-wrap.gap-2').innerHTML;
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
        setTimeout(() => lightbox.classList.add('hidden'), 500);
    };
    document.querySelectorAll('.project-item').forEach(item => item.addEventListener('click', () => window.openLightbox(item)));
;
