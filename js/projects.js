document.addEventListener('DOMContentLoaded', function() {
    // Project data - can be replaced with real API data
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A fully responsive e-commerce website with product filtering, cart functionality, and payment integration.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=E-Commerce+Platform',
            category: 'web',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            liveLink: '#',
            codeLink: '#'
        },
        {
            id: 2,
            title: 'Dashboard UI Design',
            description: 'A modern, clean dashboard design with interactive charts, data visualization, and dark/light mode.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=Dashboard+UI+Design',
            category: 'design',
            technologies: ['Figma', 'Adobe XD', 'UI/UX'],
            liveLink: '#',
            codeLink: '#'
        },
        {
            id: 3,
            title: 'Fitness Tracker App',
            description: 'A mobile application that helps users track workouts, set goals, and monitor progress over time.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=Fitness+Tracker+App',
            category: 'app',
            technologies: ['React Native', 'Firebase', 'Redux'],
            liveLink: '#',
            codeLink: '#'
        },
        {
            id: 4,
            title: 'Portfolio Template',
            description: 'A customizable portfolio website template for creative professionals with smooth animations.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=Portfolio+Template',
            category: 'web',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
            liveLink: '#',
            codeLink: '#'
        },
        {
            id: 5,
            title: 'Mobile App UI Kit',
            description: 'A comprehensive UI kit with over 100 components for mobile app development, with accessibility features.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=Mobile+App+UI+Kit',
            category: 'design',
            technologies: ['Sketch', 'Figma', 'Prototype'],
            liveLink: '#',
            codeLink: '#'
        },
        {
            id: 6,
            title: 'Task Management System',
            description: 'A collaborative task management platform with real-time updates, user roles, and project analytics.',
            image: 'https://via.placeholder.com/600x400/2a2c39/ffffff?text=Task+Management+System',
            category: 'web',
            technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
            liveLink: '#',
            codeLink: '#'
        }
    ];
    
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.projects-grid');
    
    // Initialize with all projects
    updateProjects('all');
    
    // Filter button click event
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            updateProjects(category);
        });
    });
    
    // Project details modal functionality
    let currentProject = null;
    
    // Create project modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="Project Image">
                </div>
                <div class="modal-details">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    <div class="modal-tech"></div>
                    <div class="modal-links">
                        <a href="#" class="primary-btn view-live">View Live <i class="fas fa-external-link-alt"></i></a>
                        <a href="#" class="secondary-btn view-code">View Code <i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Modal styling
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .project-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: var(--card-bg);
            border-radius: var(--radius-lg);
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(50px);
            transition: transform 0.5s ease;
        }
        
        .project-modal.active .modal-content {
            transform: translateY(0);
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            color: var(--text-color);
            cursor: pointer;
            z-index: 10;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: var(--primary-color);
        }
        
        .modal-body {
            padding: 30px;
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .modal-image {
            width: 100%;
            border-radius: var(--radius-lg);
            overflow: hidden;
        }
        
        .modal-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .modal-details {
            flex: 1;
            min-width: 300px;
        }
        
        .modal-title {
            font-size: var(--text-2xl);
            margin-bottom: var(--space-4);
        }
        
        .modal-description {
            color: var(--text-light);
            margin-bottom: var(--space-6);
        }
        
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: var(--space-6);
        }
        
        .modal-tech span {
            font-size: var(--text-sm);
            background: var(--bg-dark);
            color: var(--text-light);
            padding: var(--space-1) var(--space-3);
            border-radius: var(--radius-md);
            margin-right: var(--space-2);
            margin-bottom: var(--space-2);
        }
        
        .modal-links {
            display: flex;
            gap: var(--space-4);
            flex-wrap: wrap;
        }
        
        @media screen and (max-width: 768px) {
            .modal-body {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Modal functionality
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Function to update displayed projects
    function updateProjects(category) {
        // Clear existing projects
        projectGrid.innerHTML = '';
        
        // Filter projects based on category
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        // Create project cards
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            projectCard.setAttribute('data-id', project.id);
            
            // Create tech tags HTML
            let techTagsHTML = '';
            project.technologies.forEach(tech => {
                techTagsHTML += `<span class="tech-tag">${tech}</span>`;
            });
            
            projectCard.innerHTML = `
                <div class="project-thumbnail">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.liveLink}" class="project-link" title="View Project"><i class="fas fa-external-link-alt"></i></a>
                            <a href="${project.codeLink}" class="project-link" title="View Code"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTagsHTML}
                    </div>
                </div>
            `;
            
            projectGrid.appendChild(projectCard);
            
            // Add click event to show modal
            projectCard.addEventListener('click', (e) => {
                // Don't open modal if clicking on direct links
                if (e.target.closest('.project-link')) return;
                
                currentProject = projects.find(p => p.id === parseInt(projectCard.getAttribute('data-id')));
                openProjectModal(currentProject);
            });
        });
        
        // Add animation classes to new cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
        });
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#project-animations')) {
            const style = document.createElement('style');
            style.id = 'project-animations';
            style.textContent = `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Function to open project modal
    function openProjectModal(project) {
        // Update modal content
        const modalImg = modal.querySelector('.modal-image img');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-description');
        const modalTech = modal.querySelector('.modal-tech');
        const liveBtn = modal.querySelector('.view-live');
        const codeBtn = modal.querySelector('.view-code');
        
        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        
        // Update tech tags
        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            modalTech.appendChild(span);
        });
        
        liveBtn.href = project.liveLink;
        codeBtn.href = project.codeLink;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    // Lazy load project images
    const lazyLoadImages = () => {
        const projectImages = document.querySelectorAll('.project-thumbnail img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src') || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            projectImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            projectImages.forEach(img => {
                img.src = img.getAttribute('data-src') || img.src;
                img.classList.add('loaded');
            });
        }
    };
    
    // Initialize lazy loading
    setTimeout(lazyLoadImages, 1000);
    
    // Add load more functionality
    let currentlyShowing = 6; // Default shown projects
    const projectsPerLoad = 3;
    
    function addLoadMoreButton() {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'primary-btn load-more-btn';
        loadMoreBtn.innerHTML = 'Load More Projects <i class="fas fa-arrow-down"></i>';
        
        loadMoreBtn.addEventListener('click', () => {
            currentlyShowing += projectsPerLoad;
            updateVisibleProjects();
            
            // Hide button if all projects are shown
            if (currentlyShowing >= projects.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
        
        // Only add button if there are more projects than initially shown
        if (projects.length > currentlyShowing) {
            const container = document.querySelector('.projects-more');
            container.appendChild(loadMoreBtn);
        }
    }
    
    function updateVisibleProjects() {
        const allProjects = document.querySelectorAll('.project-card');
        
        allProjects.forEach((project, index) => {
            if (index < currentlyShowing) {
                project.style.display = 'block';
            }
        });
    }
    
    // Initialize load more functionality
    setTimeout(addLoadMoreButton, 1000);
});