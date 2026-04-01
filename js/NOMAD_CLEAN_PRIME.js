// ===== Sleeky Pro - Premium Photography Template Scripts =====

class VerticalCubeSlider {
    constructor() {
        this.currentIndex = 0;
        this.isAnimating = false;
        this.sliceCount = 10;
        this.autoPlayInterval = null;
        this.isPlaying = true;
        this.currentFace = 0;
        
        this.images = [
            { url: 'images/unsplash-image-01.jpg', thumb: 'images/unsplash-thumb-01.jpg', title: 'Mountain Peak', description: 'Majestic snow-capped mountains...' },
            { url: 'images/unsplash-image-02.jpg', thumb: 'images/unsplash-thumb-02.jpg', title: 'Sky Paradise', description: 'Vibrant sunset clouds...' },
            { url: 'images/unsplash-image-03.jpg', thumb: 'images/unsplash-thumb-03.jpg', title: 'Misty Forest', description: 'Ethereal morning fog...' },
            { url: 'images/unsplash-image-04.jpg', thumb: 'images/unsplash-thumb-04.jpg', title: 'Ocean Waves', description: 'Powerful ocean waves...' },
            { url: 'images/unsplash-image-05.jpg', thumb: 'images/unsplash-thumb-05.jpg', title: 'Night Sky', description: 'Brilliant stars scattered...' }
        ];
        this.init();
    }
    // ... all VerticalCubeSlider methods unchanged (createSlices, createDots, goToSlide, etc.)
    // copy-paste all your class methods here
}

// ===== Document Ready =====
document.addEventListener('DOMContentLoaded', () => {
    // --- Select DOM elements ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hoverZone = document.querySelector('.hover-zone');
    const logotext = document.querySelector('.logo-text');

    // --- Header hover show/hide logic ---
    let isHovering = false;

    function showNav() {
        navMenu.classList.remove('hidden');
        logotext.classList.remove('hidden');
        header.classList.remove('scrolled');
        hoverZone.classList.remove('scrolled');
        isHovering = true;
    }

    function hideNav() {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering && window.scrollY > 100) {
                navMenu.classList.add('hidden');
                logotext.classList.add('hidden');
                header.classList.add('scrolled');
                hoverZone.classList.add('scrolled');
            }
        }, 150);
    }

    hoverZone.addEventListener('mouseenter', showNav);
    navMenu.addEventListener('mouseenter', showNav);
    logotext.addEventListener('mouseenter', showNav);
    hoverZone.addEventListener('mouseleave', hideNav);
    navMenu.addEventListener('mouseleave', hideNav);
    logotext.addEventListener('mouseleave', hideNav);

    // --- Mobile menu toggle ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Header scroll effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            hoverZone.classList.add('scrolled');
            navMenu.classList.add('hidden');
            logotext.classList.add('hidden');
        } else {
            header.classList.remove('scrolled');
            navMenu.classList.remove('hidden');
            logotext.classList.remove('hidden');
            hoverZone.classList.remove('scrolled');
        }
    });

    // --- Helper: current header height ---
    function getHeaderHeight() {
        return (header && !header.classList.contains('hidden')) ? header.offsetHeight : 0;
    }

    // --- Smooth scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            const targetPosition = target.offsetTop - getHeaderHeight();
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });

    // --- Active navigation highlighting ---
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollMiddle = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollMiddle >= sectionTop && scrollMiddle < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation(); // initial call

    // --- Initialize VerticalCubeSlider ---
    new VerticalCubeSlider();

    // ===== RUNNING LOG: CSV =====
    fetch('RUN_LOG.csv')
        .then(response => {
            if (!response.ok) throw new Error('Could not load CSV');
            return response.text();
        })
        .then(csv => {
            const rows = csv.trim().split('\n').slice(1);
            const tbody = document.querySelector('#runTable tbody');
            rows.forEach(row => {
                if (!row.trim()) return;
                const [date, distance, time, pace, hr, rating] = row.split(',').map(c => c.trim());
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${date}</td><td>${distance}</td><td>${time}</td><td>${pace}</td><td>${hr}</td><td>${rating}</td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error('Error loading CSV:', err));

    // ===== Clock =====
    const pad = n => n < 10 ? '0' + n : n;
    const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    const dateFormatter = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const dayEl = document.getElementById('clockDay');
    const dateEl = document.getElementById('clockDate');
    const timeEl = document.getElementById('clockTime');

    function updateClock() {
        const now = new Date();
        dayEl.textContent = dayFormatter.format(now);
        dateEl.textContent = dateFormatter.format(now);
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const isAM = hours < 12;
        const hour12 = hours % 12 || 12;
        timeEl.textContent = `${pad(hour12)}:${pad(minutes)}:${pad(seconds)} ${isAM ? 'AM' : 'PM'}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ===== Food menu / recipes / services / contact etc. =====
    // Copy your existing food, services, contact form, and recipe logic here
});
