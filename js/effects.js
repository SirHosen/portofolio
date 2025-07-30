document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        // Show cursors once they start moving
        if (cursor.style.opacity !== '1') {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }
        
        // Move cursors to mouse position
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Follower has a slight delay for nice effect
        setTimeout(function() {
            cursorFollower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        }, 100);
    });
    
    // Custom cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .project-card, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(0.5)';
            cursorFollower.style.transform = 'scale(2)';
            cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
            cursorFollower.style.mixBlendMode = 'difference';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
            cursorFollower.style.mixBlendMode = 'normal';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const xPos = (x - 0.5) * speed * 100;
            const yPos = (y - 0.5) * speed * 100;
            
            element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });
    });
    
    // Text animation effects
    const textElements = document.querySelectorAll('.animated-text, .hero-description');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }
    });
    
    // Scroll-triggered animations
    window.addEventListener('scroll', function() {
        // Parallax scroll effect for background elements
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('.background-elements').forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Image hover effects
    const projectImages = document.querySelectorAll('.project-thumbnail');
    
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function(e) {
            const bounds = this.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.project-card, .about-image-frame, .contact-form-container');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const bounds = this.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
            const x = e.clientX - centerX;
            const y = e.clientY - centerY;
            
            const rotateX = (y / bounds.height) * 10; // Max 10 degrees rotation
            const rotateY = (x / bounds.width) * -10; // Max 10 degrees rotation
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Particles background effect
    createParticles();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '0';
    particlesContainer.style.pointerEvents = 'none';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1; // 1-6px size
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity
        
        // Random starting position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        // Random animation
        const duration = Math.random() * 20 + 10; // 10-30s
        const delay = Math.random() * 5; // 0-5s delay
        
        particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframe animation to the document
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-${window.innerHeight * 0.25}px) translateX(${window.innerWidth * 0.1}px);
            }
            50% {
                transform: translateY(-${window.innerHeight * 0.5}px) translateX(-${window.innerWidth * 0.1}px);
            }
            75% {
                transform: translateY(-${window.innerHeight * 0.75}px) translateX(${window.innerWidth * 0.1}px);
            }
            100% {
                transform: translateY(-${window.innerHeight}px) translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}