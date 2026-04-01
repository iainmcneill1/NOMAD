// Sleeky Pro - Premium Photography Template Scripts

/*

TemplateMo 598 Sleeky Pro

https://templatemo.com/tm-598-sleeky-pro

*/


class VerticalCubeSlider {
    constructor() {
        this.currentIndex = 0;
        this.isAnimating = false;
        this.sliceCount = 10;
        this.autoPlayInterval = null;
        this.isPlaying = true;
        this.currentFace = 0;
        
        this.images = [
            {
                url: 'images/unsplash-image-01.jpg',
                thumb: 'images/unsplash-thumb-01.jpg',
                title: 'Mountain Peak',
                description: 'Majestic snow-capped mountains reaching towards the endless sky, showcasing nature\'s raw beauty and power.'
            },
            {
                url: 'images/unsplash-image-02.jpg',
                thumb: 'images/unsplash-thumb-02.jpg',
                title: 'Sky Paradise',
                description: 'Vibrant sunset clouds painting the heavens in brilliant oranges and purples, creating a dreamlike atmosphere.'
            },
            {
                url: 'images/unsplash-image-03.jpg',
                thumb: 'images/unsplash-thumb-03.jpg',
                title: 'Misty Forest',
                description: 'Ethereal morning fog weaving through ancient trees, creating a mystical and serene woodland sanctuary.'
            },
            {
                url: 'images/unsplash-image-04.jpg',
                thumb: 'images/unsplash-thumb-04.jpg',
                title: 'Ocean Waves',
                description: 'Powerful ocean waves crashing against rugged coastlines, demonstrating the endless rhythm of the sea.'
            },
            {
                url: 'images/unsplash-image-05.jpg',
                thumb: 'images/unsplash-thumb-05.jpg',
                title: 'Night Sky',
                description: 'Brilliant stars scattered across the cosmic canvas, revealing the infinite mystery of our universe.'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createSlices();
        this.createDots();
        this.createThumbnails();
        this.attachEventListeners();
        this.initializeImages();
        this.startAutoPlay();
    }
    
    createSlices() {
        const stage = document.getElementById('sliderStage');
        const containerWidth = stage.offsetWidth;
        
        for (let i = 0; i < this.sliceCount; i++) {
            const sliceContainer = document.createElement('div');
            sliceContainer.className = 'slice-container';
            
            const sliceCube = document.createElement('div');
            sliceCube.className = 'slice-cube';
            
            for (let face = 1; face <= 4; face++) {
                const sliceFace = document.createElement('div');
                sliceFace.className = `slice-face face-${face}`;
                
                const sliceImage = document.createElement('div');
                sliceImage.className = 'slice-image';
                sliceImage.dataset.face = face;
                
                const sliceWidth = containerWidth / this.sliceCount;
                const leftPosition = -(i * sliceWidth);
                sliceImage.style.left = `${leftPosition}px`;
                sliceImage.style.width = `${containerWidth}px`;
                
                sliceFace.appendChild(sliceImage);
                sliceCube.appendChild(sliceFace);
            }
            
            sliceContainer.appendChild(sliceCube);
            stage.appendChild(sliceContainer);
        }
    }
    
    createDots() {
        const dotsContainer = document.getElementById('dots');
        
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            
            dot.addEventListener('click', () => {
                if (!this.isAnimating && index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    createThumbnails() {
        const thumbnailsContainer = document.getElementById('thumbnails');
        
        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.dataset.index = index;
            thumbnail.style.backgroundImage = `url(${image.thumb})`;
            
            thumbnail.addEventListener('click', () => {
                if (!this.isAnimating && index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    attachEventListeners() {
        document.getElementById('prevArrow').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextArrow').addEventListener('click', () => this.nextSlide());
        document.getElementById('playPauseBtn').addEventListener('click', () => this.toggleAutoPlay());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoPlay();
            }
        });

        const container = document.querySelector('.slider-container');
        container.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseAutoPlay();
            }
        });
        
        container.addEventListener('mouseleave', () => {
            if (this.isPlaying) {
                this.resumeAutoPlay();
            }
        });

        window.addEventListener('resize', () => this.updateSliceWidths());
    }

    updateSliceWidths() {
        const stage = document.getElementById('sliderStage');
        const containerWidth = stage.offsetWidth;
        const sliceImages = document.querySelectorAll('.slice-image');
        
        sliceImages.forEach((img, index) => {
            const sliceIndex = Math.floor(index / 4);
            const sliceWidth = containerWidth / this.sliceCount;
            const leftPosition = -(sliceIndex * sliceWidth);
            
            img.style.width = `${containerWidth}px`;
            img.style.left = `${leftPosition}px`;
        });
    }
    
    initializeImages() {
        this.setFaceImage(1, this.images[0].url);
        
        const progressBar = document.getElementById('progressBar');
        setTimeout(() => {
            progressBar.classList.add('active');
        }, 100);
    }
    
    setFaceImage(faceNumber, imageUrl) {
        const faceImages = document.querySelectorAll(`.slice-image[data-face="${faceNumber}"]`);
        faceImages.forEach(img => {
            img.style.backgroundImage = `url(${imageUrl})`;
        });
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        
        const progressBar = document.getElementById('progressBar');
        progressBar.classList.remove('active');
        progressBar.classList.add('reset');
        
        document.getElementById('prevArrow').disabled = true;
        document.getElementById('nextArrow').disabled = true;
        
        const textOverlay = document.getElementById('textOverlay');
        const titleEl = document.getElementById('slideTitle');
        const descriptionEl = document.getElementById('slideDescription');
        const cubes = document.querySelectorAll('.slice-cube');
        
        const nextFace = (this.currentFace + 1) % 4;
        const nextFaceNumber = nextFace + 1;
        
        this.setFaceImage(nextFaceNumber, this.images[index].url);
        
        textOverlay.classList.add('hiding');
        
        cubes.forEach(cube => {
            cube.className = 'slice-cube';
            void cube.offsetWidth;
            cube.classList.add(`rotate-${nextFace}`);
        });
        
        setTimeout(() => {
            titleEl.textContent = this.images[index].title;
            descriptionEl.textContent = this.images[index].description;
            textOverlay.classList.remove('hiding');
            
            this.currentIndex = index;
            this.currentFace = nextFace;
            this.updateDots();
            this.updateThumbnails();
            
            document.getElementById('prevArrow').disabled = false;
            document.getElementById('nextArrow').disabled = false;
            
            if (this.isPlaying) {
                setTimeout(() => {
                    progressBar.classList.remove('reset');
                    progressBar.classList.add('active');
                }, 50);
            }
            
            this.isAnimating = false;
        }, 950);
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }
    
    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === this.currentIndex);
        });
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3500);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resumeAutoPlay() {
        if (this.isPlaying && !this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        const btn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            btn.classList.remove('paused');
            this.startAutoPlay();
            progressBar.classList.remove('reset');
            progressBar.classList.add('active');
        } else {
            btn.classList.add('paused');
            this.pauseAutoPlay();
            progressBar.classList.remove('active');
            progressBar.classList.add('reset');
        }
    }
}



const hoverZone = document.querySelector('.hover-zone');
const logotext = document.querySelector('.logo-text');

let lastScrollY = window.scrollY;
let ticking = false;
// Scroll behavior — hide on scroll down, show on scroll up
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});



// --- Hover logic for navbar visibility ---
let isHovering = false; // track whether user is over the hover zone or navbar

// Function to show nav
function showNav() {
  navMenu.classList.remove('hidden');
  logotext.classList.remove('hidden');
  header.classList.remove('scrolled');
  hoverZone.classList.remove('scrolled');
  isHovering = true;
}

// Function to hide nav (only if scrolled away from top)
function hideNav() {
  isHovering = false;
  setTimeout(() => {
    if (!isHovering && window.scrollY > 100) {
      navMenu.classList.add('hidden');
      logotext.classList.add('hidden');
      header.classList.add('scrolled');
      hoverZone.classList.add('scrolled');
    }
  }, 150); // small delay to avoid flicker
}

// Show nav when hovering over either element
hoverZone.addEventListener('mouseenter', showNav);
navMenu.addEventListener('mouseenter', showNav);
logotext.addEventListener('mouseenter',showNav);

// Hide nav only when leaving both
hoverZone.addEventListener('mouseleave', hideNav);
navMenu.addEventListener('mouseleave', hideNav);
logotext.addEventListener('mouseleave', hideNav);


// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    
    // Header scroll effect
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

 
 

    function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.getElementById('header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 5; // adjust buffer if needed

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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








    // Select all nav links inside the food menu
    const foodLinks = document.querySelectorAll('.food-nav-menu .nav-link');

    foodLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        foodLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
    });


    // Select the display element
    const display = document.getElementById('activeLinkDisplay');

    // Function to set a link as active and update display
    function setActiveLink(link) {
        // Remove active class from all links
        foodLinks.forEach(l => l.classList.remove('active'));

        // Add active to the selected link
        link.classList.add('active');

        // Update the display text
        display.textContent = link.textContent;
    }

    // Initialize: show currently active link on page load
    const initialActive = document.querySelector('.food-nav-menu .nav-link.active');
    if (initialActive) {
        setActiveLink(initialActive);
    } else {
        display.textContent = 'None';
    }

    // Add click event listeners to each link
    foodLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // optional, if you handle scrolling separately
            setActiveLink(this);
        });
    });


        const recipeData = {
    Bread: ["Sourdough", "Baguette", "Ciabatta"],
    "Sweet Treats": ["Chocolate Cake", "Cupcakes", "Brownies"],
    Chicken: ["Roast Chicken", "Chicken Curry", "Grilled Chicken"],
    Beef: ["Beef Stew", "Beef Tacos", "Steak"],
    Lamb: ["Lamb Chops", "Lamb Curry", "Roast Leg of Lamb"],
    Pork: ["Pork Chops", "Pulled Pork", "Bacon-Wrapped Pork"],
    Vegetarian: ["Veggie Lasagna", "Stuffed Peppers", "Quinoa Salad"]
    };

    // Display elements
    const activeDisplay = document.getElementById('activeLinkDisplay');
    const recipeDropdown = document.getElementById('recipeDropdown');

    // Get category (text without extra whitespace)
    const category = link.textContent.replace(/\s+/g, ' ').trim();

    // Populate recipes for this category
    recipeDropdown.innerHTML = ''; // clear existing recipes

    if (recipeData[category]) {
        recipeData[category].forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = recipe;
            recipeDropdown.appendChild(li);
        });
    }




    

    // Services tab functionality
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetService = tab.getAttribute('data-service');
            
            // Remove active class from all tabs and contents
            serviceTabs.forEach(t => t.classList.remove('active'));
            serviceContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetService);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Contact form handling
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation feedback
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`Thank you ${data.name}! Your message has been sent. We'll get back to you at ${data.email} soon.`);
        e.target.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize slider
    new VerticalCubeSlider();
});

// Utility to pad numbers
  function pad(n){ return n < 10 ? '0' + n : n; }

  // Formatters (uses user's locale by default)
  const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
  const dateFormatter = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const dayEl = document.getElementById('clockDay');
  const dateEl = document.getElementById('clockDate');
  const timeEl = document.getElementById('clockTime');

  function updateClock(){
    const now = new Date();

    // Day and date (localized)
    dayEl.textContent = dayFormatter.format(now);
    dateEl.textContent = dateFormatter.format(now);

    // Time — 12-hour with AM/PM; change to 24-hour if you prefer
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const isAM = hours < 12;
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;

    const timeString = pad(hour12) + ':' + pad(minutes) + ':' + pad(seconds) + ' ' + (isAM ? 'AM' : 'PM');

    timeEl.textContent = timeString;
  }

  // First update immediately, then every second
  updateClock();
  setInterval(updateClock, 1000);



 contentDiv.innerHTML = sectionContent
  // Headings (allow leading spaces)
  .replace(/^\s*Ingredients:/gim, '<h2>Ingredients</h2>')
  .replace(/^\s*Instructions:/gim, '<h2>Instructions</h2>')

  // Convert bullet-style lines to <ul><li> elements
  .replace(/((?:\s*-\s.*\n?)+)/g, match => {
    const items = match
      .trim()
      .split(/\n/)
      .map(line => line.replace(/^\s*-\s*/, '').trim())
      .map(item => `<li>${item}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  })

  // Replace numbered steps (1. , 2. , etc.) with ordered list items
  .replace(/((?:\s*\d+\.\s.*\n?)+)/g, match => {
    const items = match
      .trim()
      .split(/\n/)
      .map(line => line.replace(/^\s*\d+\.\s*/, '').trim())
      .map(item => `<li>${item}</li>`)
      .join('');
    return `<ol>${items}</ol>`;
  })

  // Replace double and single newlines for spacing
  .replace(/\n\s*\n/g, '<br><br>')
  .replace(/\n/g, '<br>')
  .trim();


// ===== RUNNING LOG: READ FROM CSV =====
    document.addEventListener('DOMContentLoaded', () => {
      fetch('RUN_LOG.csv')
        .then(response => {
          if (!response.ok) {
            throw new Error('Could not load CSV file');
          }
          return response.text();
        })
        .then(csv => {
          const rows = csv.trim().split('\n').slice(1); // skip headers
          const tbody = document.querySelector('#runTable tbody');

          rows.forEach(row => {
            if (!row.trim()) return;

            // Trim each value to avoid extra spaces
            const [date, distance, time, pace, hr, rating] = row.split(',').map(cell => cell.trim());

            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${date}</td>
              <td>${distance}</td>
              <td>${time}</td>
              <td>${pace}</td>
              <td>${hr}</td>
              <td>${rating}</td>
            `;
            tbody.appendChild(tr);
          });
        })
        .catch(err => console.error('Error loading CSV:', err));
    });