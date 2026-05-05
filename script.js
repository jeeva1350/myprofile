// ========================================
// Jeeva R Portfolio - JavaScript
// ========================================

// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
});

// ========================================
// Aurora Canvas Animation
// ========================================
(function() {
    const canvas = document.getElementById('auroraCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const colors = ['#7c3aed', '#4f46e5', '#06b6d4'];

    function noise(x, y) {
        return Math.sin(x * 0.01 + time * 0.001) * Math.cos(y * 0.01 + time * 0.0005) * 0.5;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[2]);

        for (let y = 0; y < canvas.height; y += 4) {
            for (let x = 0; x < canvas.width; x += 4) {
                const n = noise(x, y);
                const intensity = (Math.sin(y * 0.005 + time * 0.002 + n * 3) + 1) * 0.5;
                if (intensity > 0.3) {
                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = intensity * 0.12;
                    ctx.fillRect(x, y, 4, 4);
                }
            }
        }
        
        time++;
        requestAnimationFrame(draw);
    }
    draw();
})();

// ========================================
// Navbar Scroll Effect
// ========================================
const header = document.getElementById('main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-zinc-950/80', 'backdrop-blur-xl', 'border-b', 'border-zinc-800');
        } else {
            header.classList.remove('bg-zinc-950/80', 'backdrop-blur-xl', 'border-b', 'border-zinc-800');
        }
    });
}

// ========================================
// Mobile Menu
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });
}

if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}

if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }
    updateThemeIcon();
}

function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = html.classList.contains('dark');
    const sunIcon = themeToggle ? themeToggle.querySelector('.ri-sun-line') : null;
    const moonIcon = themeToggle ? themeToggle.querySelector('.ri-moon-line') : null;
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    initTheme();
}

// ========================================
// Chroma Grid Mouse Effects
// ========================================
document.querySelectorAll('.chroma-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

document.querySelectorAll('.chroma-grid').forEach(grid => {
    grid.addEventListener('mousemove', (e) => {
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        grid.style.setProperty('--x', `${x}px`);
        grid.style.setProperty('--y', `${y}px`);
        const fade = grid.querySelector('.chroma-fade');
        if (fade) fade.style.opacity = '0';
    });
    
    grid.addEventListener('mouseleave', () => {
        const fade = grid.querySelector('.chroma-fade');
        if (fade) fade.style.opacity = '1';
    });
});

// ========================================
// Project Modal Functions
// ========================================
function openProjectModal(project) {
    if (!project) return;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDesc').textContent = project.fullDescription || project.description || '';
    const modalUrl = document.getElementById('modalUrl');
    if (project.url) {
        modalUrl.href = project.url;
        modalUrl.style.display = 'flex';
    } else {
        modalUrl.style.display = 'none';
    }
    document.getElementById('projectModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.closest('.modal-close')) return;
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProjectModal();
});

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Form Validation
// ========================================
const contactForm = document.querySelector('form[action*="formsubmit"]');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="ri-check-line"></i> Sent!';
        submitBtn.disabled = true;
        submitBtn.classList.add('bg-green-600');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-600');
            contactForm.reset();
        }, 3000);
    });
}

// ========================================
// Intersection Observer for AOS-like animations
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// Parallax Effect for Aurora Background
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const auroraBg = document.querySelector('.aurora-bg');
    if (auroraBg) {
        auroraBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Add loading animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ========================================
// Word Animations
// ========================================

// Intersection Observer for word animations
const wordAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Check if it's a count-up animation
            if (entry.target.classList.contains('count-up')) {
                const target = entry.target;
                const endValue = target.getAttribute('data-end');
                const suffix = target.getAttribute('data-suffix') || '';
                animateCountUp(target, endValue, suffix);
            }
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

// Count Up Animation
function animateCountUp(element, end, suffix = '') {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Typewriter Effect for Hero
function initTypewriter() {
    const container = document.querySelector('.typewriter-container');
    if (!container) return;
    
    const words = container.querySelectorAll('.typewriter-word');
    let currentIndex = 0;
    
    function typeNextWord() {
        words.forEach((word, index) => {
            word.classList.remove('active');
            if (index <= currentIndex) {
                word.classList.add('active');
            }
        });
        
        currentIndex = (currentIndex + 1) % words.length;
        setTimeout(typeNextWord, 2500);
    }
    
    // Start after initial delay
    setTimeout(typeNextWord, 1000);
}

// Add word animations to sections
function initWordAnimations() {
    // Hero Section - Word fade in
    document.querySelectorAll('.hero h1, .hero p').forEach(el => {
        el.classList.add('word-fade-in');
    });
    
    // Stats - Count up animation
    document.querySelectorAll('#home .grid > div > div:first-child').forEach(el => {
        el.classList.add('count-up');
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
            el.setAttribute('data-end', match[1]);
            const suffix = text.replace(/[\d]/g, '').trim();
            el.setAttribute('data-suffix', suffix);
        }
    });
    
    // Observe all animated elements
    document.querySelectorAll('.word-fade-in, .count-up').forEach(el => {
        wordAnimationObserver.observe(el);
    });
    
    // Fallback: manual scroll trigger
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight;
        document.querySelectorAll('.word-fade-in, .count-up').forEach(el => {
            const elementPosition = el.offsetTop;
            if (scrollPosition > elementPosition && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initWordAnimations();
    initTypewriter();
});

console.log('🎯 Jeeva R Portfolio loaded successfully!');