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
    
    // Set current year in copyright
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ========================================
// Professional Gradient Mesh Background Animation
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
    
    // Gradient mesh points
    const points = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 300 + 200,
            hue: Math.random() * 40 + 240 // purple to cyan range
        });
    }
    
    // Floating particles
    const particles = [];
    const numParticles = 40;
    
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.2 + 0.1,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function drawGradientMesh() {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Create gradient mesh effect
        points.forEach((point, i) => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < -point.radius) point.x = canvas.width + point.radius;
            if (point.x > canvas.width + point.radius) point.x = -point.radius;
            if (point.y < -point.radius) point.y = canvas.height + point.radius;
            if (point.y > canvas.height + point.radius) point.y = -point.radius;
            
            // Create radial gradient for each point
            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.radius
            );
            
            if (isDark) {
                // Dark mode - more saturated colors
                const hue1 = point.hue;
                const hue2 = (point.hue + 30) % 360;
                gradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.15)`);
                gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 40%, 0.08)`);
                gradient.addColorStop(1, 'transparent');
            } else {
                // Light mode - softer pastel
                const hue1 = point.hue;
                const hue2 = (point.hue + 30) % 360;
                gradient.addColorStop(0, `hsla(${hue1}, 70%, 65%, 0.12)`);
                gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 55%, 0.06)`);
                gradient.addColorStop(1, 'transparent');
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }

    function drawParticles() {
        const isDark = document.documentElement.classList.contains('dark');
        
        particles.forEach(p => {
            p.y -= p.speed;
            p.x += Math.sin(time * 0.01 + p.y * 0.01) * 0.2;
            
            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(139, 92, 246, ${p.opacity})` : `rgba(99, 102, 241, ${p.opacity * 0.5})`;
            ctx.fill();
        });
    }

    function drawGlow() {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Subtle center glow
        const glowGradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width * 0.5
        );
        
        if (isDark) {
            glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
            glowGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
            glowGradient.addColorStop(1, 'transparent');
        } else {
            glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
            glowGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
            glowGradient.addColorStop(1, 'transparent');
        }
        
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawGradientMesh();
        drawParticles();
        drawGlow();
        
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

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('hidden');
        const isDark = document.documentElement.classList.contains('dark');
        const bgColor = isDark ? '#000000' : '#a7bcd1';
        mobileMenu.setAttribute('style', 'display: flex !important; flex-direction: column; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: ' + bgColor + '; z-index: 99999;');
        document.body.style.overflow = 'hidden';
        console.log('Menu opened');
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('style', 'display: none !important;');
        document.body.style.overflow = '';
        console.log('Menu closed');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
}

// Make functions globally available
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// Mobile theme toggle
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
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
    
    // Update header theme toggle
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
    
    // Update floating theme toggle
    const floatingBtn = document.getElementById('floating-theme-btn');
    if (floatingBtn) {
        const darkIcon = floatingBtn.querySelector('.theme-icon-dark');
        const lightIcon = floatingBtn.querySelector('.theme-icon-light');
        
        if (darkIcon && lightIcon) {
            if (isDark) {
                darkIcon.style.display = 'inline-block';
                lightIcon.style.display = 'none';
            } else {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'inline-block';
            }
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    initTheme();
}

// Floating theme toggle button
const floatingThemeBtn = document.getElementById('floating-theme-btn');
if (floatingThemeBtn) {
    floatingThemeBtn.addEventListener('click', toggleTheme);
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
// EmailJS Configuration & Form Handler
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    const PUBLIC_KEY = 't_TB34ENak9AyaJZE';
    const SERVICE_ID = 'service_102wzbf';
    const TEMPLATE_ID = 'template_vrrbeul';

    let emailJSReady = false;

    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init(PUBLIC_KEY);
            emailJSReady = true;
            console.log('EmailJS initialized successfully');
        } catch (e) {
            console.error('EmailJS init error:', e);
        }
    } else {
        console.warn('EmailJS SDK not loaded - will use formsubmit.co fallback');
    }

    window.emailJSConfig = { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY };

    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        console.log('Contact form found');
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = {
            from_name: this.querySelector('input[name="Name"]').value,
            from_email: this.querySelector('input[name="Email"]').value,
            subject: this.querySelector('input[name="Subject"]').value || 'New Portfolio Contact',
            message: this.querySelector('textarea[name="message"]').value
        };

        try {
            // Try EmailJS first
            if (emailJSReady && typeof emailjs !== 'undefined') {
                await emailjs.send(
                    window.emailJSConfig.SERVICE_ID,
                    window.emailJSConfig.TEMPLATE_ID,
                    formData
                );
                console.log('Email sent via EmailJS');
            } else {
                throw new Error('EmailJS not available');
            }
            
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Sent!';
            submitBtn.classList.add('bg-green-600');
            this.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-600');
            }, 3000);
            
        } catch (error) {
            console.warn('EmailJS failed, trying formsubmit.co:', error);
            
            // Fallback to formsubmit.co
            try {
                const formSubmitUrl = 'https://formsubmit.co/jeeva13052001@gmail.com';
                const formDataEncoded = new URLSearchParams(formData).toString();
                
                await fetch(formSubmitUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formDataEncoded
                });
                
                console.log('Email sent via formsubmit.co');
                submitBtn.innerHTML = '<i class="ri-check-line"></i> Sent!';
                submitBtn.classList.add('bg-green-600');
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-600');
                }, 3000);
                
            } catch (formError) {
                console.error('Formsubmit also failed:', formError);
                submitBtn.innerHTML = '<i class="ri-error-warning-line"></i> Failed';
                submitBtn.classList.add('bg-red-600');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-red-600');
                }, 3000);
            }
        }
    });
    }
});

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