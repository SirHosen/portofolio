document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.getElementById('preloader').style.opacity = '0';
        document.getElementById('preloader').style.visibility = 'hidden';
    }, 2000);
    
    // Typed.js Initialization
    const typed = new Typed('#typed', {
        strings: [
            'Web Developer',
            'UI/UX Designer',
            'Creative Coder',
            'Freelancer'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[data-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.remove('active');
            document.querySelector('.menu-toggle').classList.remove('menu-open');
        });
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
        
        // Activate menu items based on scroll position
        activateMenuOnScroll();
        
        // Reveal animations
        revealOnScroll();
        
        // Animate skill bars
        animateSkillBars();
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('menu-open');
        mobileMenu.classList.toggle('active');
    });
    
    // Dark/Light Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // Save preference to local storage
        localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    } else if (localStorage.getItem('dark-mode') === 'false') {
        body.classList.remove('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-moon';
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For now, let's just show a success message
        alert('Message sent successfully! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Helper functions
    function activateMenuOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    function animateSkillBars() {
        const skillSection = document.getElementById('skills');
        if (!skillSection) return;
        
        const sectionPosition = skillSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const percentage = bar.getAttribute('data-percentage');
                const progress = bar.querySelector('.progress');
                
                if (!progress.style.width) {
                    progress.style.width = percentage + '%';
                }
            });
        }
    }
    
    // Initialize animations and effects
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    // Initialize project filters
    initProjectFilters();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}