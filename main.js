// ===== GSAP ScrollTrigger Registration =====
gsap.registerPlugin(ScrollTrigger);

// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Nav scroll effect
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ===== HERO ANIMATIONS =====
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
    .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 })
    .from('.hero-title', { opacity: 0, y: 40, duration: 1 }, '-=0.5')
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
    .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
    .from('.hero-scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.3');

// Hero parallax on scroll
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
    },
    y: -100,
    opacity: 0.3,
});

gsap.to('.hero-gradient-1', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    x: -80,
    y: -50,
});

gsap.to('.hero-gradient-2', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    x: 60,
    y: 40,
});

// ===== SHOWCASE INTRO ANIMATION =====
gsap.from('.showcase-intro', {
    scrollTrigger: {
        trigger: '.showcase-intro',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
    },
    opacity: 0,
    y: 60,
});

// ===== PHONE SHOWCASE — SCROLL-DRIVEN SCREEN TRANSITIONS =====
const screens = document.querySelectorAll('.app-screen');
const featureLabels = document.querySelectorAll('.feature-label');
const progressDots = document.querySelectorAll('.progress-dot');
const phoneFrame = document.getElementById('phoneFrame');
const phoneGlow = document.getElementById('phoneGlow');

const glowColors = [
    'radial-gradient(circle, rgba(16, 185, 129, 0.12), transparent 70%)',
    'radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent 70%)',
    'radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent 70%)',
    'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent 70%)',
];

const phoneRotations = [
    { rotateY: 0, rotateX: 0, scale: 1 },
    { rotateY: -5, rotateX: 2, scale: 1.02 },
    { rotateY: 5, rotateX: -2, scale: 1.04 },
    { rotateY: -3, rotateX: 3, scale: 1.02 },
];

let currentScreen = 0;

function setScreen(index) {
    if (index === currentScreen) return;

    screens.forEach((s, i) => {
        if (i === index) {
            s.classList.add('screen-active');
        } else {
            s.classList.remove('screen-active');
        }
    });

    featureLabels.forEach((l, i) => {
        if (i === index) {
            l.classList.add('fl-active');
        } else {
            l.classList.remove('fl-active');
        }
    });

    progressDots.forEach((d, i) => {
        if (i === index) {
            d.classList.add('dot-active');
        } else {
            d.classList.remove('dot-active');
        }
    });

    // Phone glow color
    phoneGlow.style.background = glowColors[index];

    // Phone rotation
    const rot = phoneRotations[index];
    gsap.to(phoneFrame, {
        rotateY: rot.rotateY,
        rotateX: rot.rotateX,
        scale: rot.scale,
        duration: 0.8,
        ease: 'power2.out',
    });

    currentScreen = index;
}

// Create scroll-driven phone transitions
ScrollTrigger.create({
    trigger: '#phoneShowcase',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        const progress = self.progress;
        const screenIndex = Math.min(Math.floor(progress * 4), 3);
        setScreen(screenIndex);
    }
});

// Phone entrance animation
gsap.from('#phoneContainer', {
    scrollTrigger: {
        trigger: '#phoneShowcase',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
    },
    scale: 0.7,
    opacity: 0,
    y: 100,
});

// ===== FEATURE STORY ANIMATIONS =====
document.querySelectorAll('.feature-story').forEach((story, i) => {
    const content = story.querySelector('.feature-story-text');
    const visual = story.querySelector('.feature-story-visual');
    const isReverse = story.querySelector('.reverse');

    gsap.from(content, {
        scrollTrigger: {
            trigger: story,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
        },
        opacity: 0,
        x: isReverse ? 60 : -60,
        y: 30,
    });

    gsap.from(visual, {
        scrollTrigger: {
            trigger: story,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
        },
        opacity: 0,
        x: isReverse ? -60 : 60,
        y: 30,
        scale: 0.9,
    });

    // Feature phone slight rotation on scroll
    const featurePhone = story.querySelector('.feature-phone-mini');
    if (featurePhone) {
        gsap.to(featurePhone, {
            scrollTrigger: {
                trigger: story,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            rotateY: i % 2 === 0 ? 8 : -8,
            rotateX: -5,
        });
    }
});

// ===== ABOUT SECTION ANIMATIONS =====
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        end: 'top 40%',
        scrub: 1,
    },
    opacity: 0,
    y: 60,
});

gsap.from('.value-card', {
    scrollTrigger: {
        trigger: '.about-values',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
    },
    opacity: 0,
    y: 40,
    stagger: 0.1,
});

// ===== FUTURE APPS ANIMATIONS =====
gsap.from('.future-inner .section-label, .future-inner .section-title, .future-inner .section-desc', {
    scrollTrigger: {
        trigger: '.future',
        start: 'top 75%',
        end: 'top 50%',
        scrub: 1,
    },
    opacity: 0,
    y: 40,
    stagger: 0.05,
});

gsap.from('.future-card', {
    scrollTrigger: {
        trigger: '.future-grid',
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
    },
    opacity: 0,
    y: 50,
    scale: 0.95,
    stagger: 0.08,
});

// ===== DOWNLOAD SECTION ANIMATION =====
gsap.from('.download-inner', {
    scrollTrigger: {
        trigger: '.download',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
    },
    opacity: 0,
    y: 60,
    scale: 0.96,
});

// ===== FOOTER ANIMATION =====
gsap.from('.footer-inner', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
        end: 'top 75%',
        scrub: 1,
    },
    opacity: 0,
    y: 30,
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== PARALLAX DEPTH LAYERS =====
// Subtle parallax on feature phone minis
document.querySelectorAll('.feature-phone-mini').forEach(phone => {
    phone.style.transformStyle = 'preserve-3d';
    phone.style.perspective = '1000px';
});

// Phone container 3D perspective
document.getElementById('phoneContainer').style.perspective = '1200px';
document.getElementById('phoneFrame').style.transformStyle = 'preserve-3d';

// ===== REFRESH SCROLLTRIGGER ON RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
