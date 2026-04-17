// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Music Toggle
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const musicIcon = musicToggle.querySelector('i');
let isPlaying = false;

// Try to autoplay (may be blocked by browser)
window.addEventListener('load', () => {
    bgMusic.volume = 0.025; // Set volume to 2.5%
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-volume-up');
        }).catch(() => {
            // Autoplay blocked, user needs to click
            isPlaying = false;
        });
    }
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-music');
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-volume-up');
        isPlaying = true;
    }
});

// Random Greeting on Page Load
const greetings = ['Wassup', 'Hello', 'Hey', 'Yooo', 'Hi there', 'Yo'];
const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
document.getElementById('greeting-text').textContent = randomGreeting + ',';

// Role Typing Animation
const roles = [
    'Minecraft Developer',
    'Web Developer',
    'MCPlugin Developer',
    'Software Developer',
    'MikitaMC Administrator',
    'VerleX Studio Administrator',
    'AtlasPlugin Developer'
];

let roleIndex = 0;
let roleCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const roleElement = document.getElementById('role-text');

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, roleCharIndex - 1);
        roleCharIndex--;
        typingSpeed = 50;
    } else {
        roleElement.textContent = currentRole.substring(0, roleCharIndex + 1);
        roleCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && roleCharIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && roleCharIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

setTimeout(typeRole, 800);

// Copy IP Function
function copyIP(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = 'Copied: ' + ip;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#ff00a0';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.strokeStyle = '#00f0ff';
                ctx.globalAlpha = 0.1 * (1 - dist / 150);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animateParticles);
}

resize();
initParticles();
animateParticles();
window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Butter Smooth Scroll - Like Ice
const wrapper = document.getElementById('smooth-wrapper');
const content = document.getElementById('smooth-content');

let currentY = 0;
let targetY = 0;
let ease = 0.03; // Very smooth, like ice

function smoothScroll() {
    targetY = window.scrollY;
    currentY += (targetY - currentY) * ease;

    // Only update if there's meaningful difference
    if (Math.abs(targetY - currentY) > 0.01) {
        content.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    }

    requestAnimationFrame(smoothScroll);
}

// Set body height to match content
function setBodyHeight() {
    document.body.style.height = content.offsetHeight + 'px';
}

// Initialize
setTimeout(() => {
    setBodyHeight();
    smoothScroll();
}, 100);

window.addEventListener('resize', setBodyHeight);

// Handle anchor clicks with smooth scroll
document.querySelectorAll('.nav-anchor').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const targetPosition = target.offsetTop;
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto' // We handle the smoothness
            });
        }
    });
});

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Skill Bar Animation
const skillFills = document.querySelectorAll('.skill-fill');
const animateSkills = () => {
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            fill.style.width = fill.getAttribute('data-width') + '%';
        }
    });
};
window.addEventListener('scroll', animateSkills);
setTimeout(animateSkills, 500);

// 3D Tilt Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});