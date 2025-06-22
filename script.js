// Enhanced Portfolio JavaScript - Modern Interactions and Animations

document.addEventListener("DOMContentLoaded", function () {
    initializePortfolio();
});

function initializePortfolio() {
    setupSmoothScrolling();
    setupScrollEffects();
    setupIntersectionObserver();
    setupParallaxEffects();
    setupHeaderEffects();
    setupCodeSection();
    setupLoadingAnimations();
    setupKeyboardNavigation();
    setupPerformanceOptimizations();
    setupDownloadButton();
}

// Enhanced Smooth Scrolling with offset for fixed header
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavigation(this.getAttribute('href'));
            }
        });
    });
}

// Enhanced Scroll Progress and Header Effects
function setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    function updateScrollEffects() {
        const header = document.querySelector('header');
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollCurrent = window.scrollY;
        const scrollPercentage = Math.min((scrollCurrent / scrollTotal) * 100, 100);
        
        // Update scroll progress bar with smooth animation
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
        
        // Enhanced header background change
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            } else {
                header.style.background = '#000000';
                header.style.backdropFilter = 'none';
                header.style.borderBottom = 'none';
            }
        }
        
        // Update active navigation based on scroll position
        updateActiveNavigationOnScroll();
        
        ticking = false;
    }
}

// Advanced Intersection Observer with staggered animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Apply to various elements with initial hidden state
    const animatedElements = document.querySelectorAll('.card, .education-card, .about-text, .section-title');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Enhanced Parallax Effects
function setupParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && window.innerWidth > 768) {
            // Subtle parallax for hero background
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            
            // Counter-parallax for hero content
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * -0.15}px)`;
            }
        }
        
        // Parallax for profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && window.innerWidth > 768) {
            const rect = profileImg.getBoundingClientRect();
            const speed = (rect.top + rect.height / 2) * 0.02;
            profileImg.style.transform = `translateY(${speed}px) scale(1) rotate(${speed * 0.1}deg)`;
        }
    });
}

// Dynamic Header Effects
function setupHeaderEffects() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    if (header && logo) {
        // Add hover effect to logo
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Enhanced Code Section with Better UX
function setupCodeSection() {
    // Ensure code tabs work properly
    window.showCode = function(type) {
        // Hide all code contents
        document.querySelectorAll('.code-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected content and activate tab
        const targetContent = document.getElementById(type + '-content');
        const targetTab = event.target;
        
        if (targetContent) {
            targetContent.classList.add('active');
        }
        if (targetTab) {
            targetTab.classList.add('active');
        }
    };

    // Enhanced copy functionality with modern clipboard API
    window.copyCode = function(elementId) {
        const codeElement = document.getElementById(elementId);
        const button = event.target;
        
        if (!codeElement) return;
        
        const text = codeElement.textContent;
        
        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopySuccess(button);
            }).catch(() => {
                fallbackCopyText(text, button);
            });
        } else {
            fallbackCopyText(text, button);
        }
    };
    
    function showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'rgba(34, 197, 94, 0.2)';
        button.style.color = '#22c55e';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
    
    function fallbackCopyText(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            document.execCommand('copy');
            showCopySuccess(button);
        } catch (err) {
            console.error('Could not copy text: ', err);
            button.textContent = 'Error';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
        
        document.body.removeChild(textarea);
    }
}

// Loading Animations for Hero Section
function setupLoadingAnimations() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const ctaButton = document.querySelector('.hero .cta-button');
    
    // Staggered loading animations
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (ctaButton) {
        setTimeout(() => {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'translateY(0)';
        }, 900);
    }
}

// Keyboard Navigation Support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for quick section navigation
        if (e.altKey && e.key >= '1' && e.key <= '8') {
            e.preventDefault();
            const sectionMap = {
                '1': '#home',
                '2': '#about',
                '3': '#education',
                '4': '#projects',
                '5': '#awards',
                '6': '#skills',
                '7': '#code',
                '8': '#contact'
            };
            
            const targetSection = document.querySelector(sectionMap[e.key]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // ESC key to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Performance Optimizations
function setupPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    
    // Optimize scroll performance
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate layouts after resize
            updateLayoutCalculations();
        }, 250);
    });
}

// Active Navigation Management
function updateActiveNavigation(target) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === target) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Layout Calculations Update
function updateLayoutCalculations() {
    // Recalculate any dynamic measurements
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Reset any cached measurements
        card.style.height = 'auto';
    });
}

// Enhanced Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Mouse move effect for subtle tilt
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
});

// Initialize when DOM is ready
console.log('Enhanced Portfolio JavaScript loaded successfully');

// Add custom cursor effect for modern browsers
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
        // Custom cursor logic can be added here
    });
}

// Download Button Functionality
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadYouwareBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadYouwareFile();
        });
    }
}

function downloadYouwareFile() {
    // YOUWARE.md file content
    const youwareContent = `# Eymen BULANIK - Portfolio Website

## Project Overview
A modern, responsive portfolio website showcasing academic achievements, research projects, and technical skills in science, technology, and robotics. The site features a sophisticated black and white design with modern animations and interactions.

## Architecture & Structure

### Core Design Philosophy
- **Modern Minimalism**: Clean, professional design with strategic use of black, white, and gray tones
- **Content-First**: Emphasizes showcasing impressive technical achievements and research work
- **Performance-Optimized**: Smooth animations, optimized loading, and responsive design
- **Accessibility-Focused**: Keyboard navigation, semantic HTML, and proper contrast ratios

### File Structure
\`\`\`
src/
├── index.html          # Main HTML structure with semantic sections
├── style.css          # Enhanced CSS with modern design system and animations
├── script.js          # Advanced JavaScript with smooth interactions
├── assets/            # Directory for images and media files
└── YOUWARE.md         # This documentation file
\`\`\`

### Key Sections
1. **Hero Section**: Animated introduction with gradient background and parallax effects
2. **About Section**: Personal introduction with animated profile placeholder and detailed background
3. **Education Section**: Academic achievements and current studies
4. **Projects Section**: Detailed project cards showcasing quantum research, robotics competitions, and community work
5. **Awards Section**: Recognition and achievements in academics and competitions
6. **Skills Section**: Technical competencies organized by category
7. **Code Section**: Interactive code viewer with tab switching and copy functionality
8. **Contact Section**: Professional contact information and collaboration interests

## Technical Implementation

### CSS Design System
- **CSS Custom Properties**: Consistent color palette and spacing using CSS variables
- **Modern Layout**: CSS Grid and Flexbox for responsive layouts
- **Advanced Animations**: CSS keyframes, transforms, and transitions for smooth UX
- **Performance**: Hardware-accelerated animations using transform and opacity
- **Responsive Design**: Mobile-first approach with strategic breakpoints

### JavaScript Features
- **Smooth Scrolling**: Enhanced navigation with offset calculations for fixed header
- **Intersection Observer**: Performance-optimized scroll animations with staggered effects
- **Parallax Effects**: Subtle depth with multiple layer movement
- **Interactive Elements**: Advanced hover effects, click animations, and keyboard navigation
- **Code Functionality**: Tab switching and modern clipboard API integration
- **Performance Optimizations**: Throttled scroll events and lazy loading capabilities

### Key Interactive Features
- **Scroll Progress Indicator**: Visual feedback for page navigation
- **Dynamic Header**: Background changes and blur effects on scroll
- **Card Hover Effects**: 3D transforms and shadow animations
- **Keyboard Navigation**: Alt+number shortcuts for quick section jumping
- **Copy Code Functionality**: Modern clipboard API with fallback support
- **Staggered Animations**: Sequential element animations for visual appeal

## Development Guidelines

### Content Management
- All content is hardcoded in HTML for optimal performance and SEO
- Project information should be updated in the Projects section card containers
- Skills and awards can be modified by editing the respective card containers
- Contact information is located in the Contact section cards

### Styling Conventions
- Use CSS custom properties for consistent theming
- Follow BEM methodology for class naming where applicable
- Maintain the established color palette (black, white, grays)
- Ensure all animations use transform and opacity for performance
- Test responsiveness across mobile, tablet, and desktop viewports

### Performance Considerations
- Images should be optimized and compressed before adding
- Use modern image formats (WebP) when possible with fallbacks
- Minimize DOM manipulation in JavaScript
- Use requestAnimationFrame for scroll-based animations
- Implement lazy loading for any additional media content

### Future Enhancement Opportunities
- Add a dark/light theme toggle while maintaining the sophisticated aesthetic
- Implement a blog section for technical articles and research updates
- Add more interactive elements like animated charts for skills visualization
- Consider adding a projects filtering system by technology or category
- Implement PWA features for offline access to portfolio content

## Content Focus Areas
The portfolio emphasizes:
- **Quantum Computing Research**: TeleQubit project and Qiskit expertise
- **Robotics Leadership**: International competition achievements and team leadership
- **Academic Excellence**: Merit scholarship and consistent high performance
- **Community Impact**: Make-A-Wish involvement and educational outreach
- **Technical Skills**: Programming, research, and engineering capabilities

## Browser Compatibility
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- CSS Grid and Flexbox support required
- JavaScript ES6+ features used
- Intersection Observer API for animations
- Modern clipboard API with fallback support

## SEO & Accessibility
- Semantic HTML5 structure throughout
- Proper heading hierarchy and ARIA labels where needed
- Alt text for images and descriptive link text
- Keyboard navigation support with visible focus indicators
- High contrast ratios and readable font sizes
- Meta tags for social media sharing

This portfolio represents a professional showcase designed to impress academic institutions, research organizations, and technology companies while maintaining excellent user experience and technical implementation standards.

This file provides guidance to YOUWARE Agent (youware.com) when working with code in this repository.`;

    // Create blob and download
    const blob = new Blob([youwareContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'YOUWARE.md';
    downloadLink.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const btn = document.getElementById('downloadYouwareBtn');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Downloaded!';
        btn.style.background = '#22c55e';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

// Service Worker registration for PWA capabilities (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for offline capabilities
    });
}