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
  threshold: 0.01,             // %1 görününce tetikle
  rootMargin: '0px 0px -20% 0px' // ekrana girmeden biraz önce başlat
};


    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                requestAnimationFrame(() => {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    entry.target.classList.add('animated');
});

            }
        });
    }, observerOptions);

    // Apply to various elements with initial hidden state
    const animatedElements = document.querySelectorAll('.card, .education-card, .about-text, .section-title');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
element.style.transform = 'translateY(12px)'; // daha kısa mesafe = daha hızlı algı
element.style.transition = 'opacity .35s ease-out, transform .35s ease-out';
element.style.transitionDelay = '0s'; // en kritik kısım: kuyruk gecikmesini kaldır
element.style.willChange = 'opacity, transform';

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
    // Load actual file contents into code sections
    loadActualCodeContent();
    
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

    async function loadActualCodeContent() {
        try {
            // Load HTML content
            const htmlResponse = await fetch('index.html');
            if (htmlResponse.ok) {
                const htmlContent = await htmlResponse.text();
                document.getElementById('html-code').textContent = htmlContent;
            }
            
            // Load CSS content
            const cssResponse = await fetch('style.css');
            if (cssResponse.ok) {
                const cssContent = await cssResponse.text();
                document.getElementById('css-code').textContent = cssContent;
            }
            
            // Load JavaScript content
            const jsResponse = await fetch('script.js');
            if (jsResponse.ok) {
                const jsContent = await jsResponse.text();
                document.getElementById('js-code').textContent = jsContent;
            }
            
        } catch (error) {
            console.log('Could not load some code files, showing fallback content');
            // If fetching fails, show current page source
            loadCodeFromCurrentPage();
        }
    }

    function loadCodeFromCurrentPage() {
        // Get current page HTML - complete and exact
        const htmlContent = document.documentElement.outerHTML;
        document.getElementById('html-code').textContent = htmlContent;
        
        // Show message for CSS and JS that they should be fetched from files
        document.getElementById('css-code').textContent = '/* Unable to fetch CSS file directly. The complete CSS code is in style.css */';
        document.getElementById('js-code').textContent = '// Unable to fetch JS file directly. The complete JavaScript code is in script.js';
    }
    
    // Load the actual file contents first
    loadActualCodeContent();

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

// Enhanced Card Interactions with Modal Support
document.addEventListener('DOMContentLoaded', function() {
    // sadece static-card olmayanlar
    const cards = document.querySelectorAll('.card:not(.static-card)');
    
    cards.forEach((card, index) => {
        card.setAttribute('data-card-id', index);
        
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
        
        // Click effect with modal opening
        card.addEventListener('click', function(e) {
            e.preventDefault();
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                openProjectModal(card);
            }, 150);
        });
    });
});


// Project Modal System - Display Only
let currentProject = null;

// Sample project data for demonstration
const projectShowcaseData = {
    // T-MBA Team Leadership
    "0": {
        title: "T-MBA Team Leadership & Community Service",
        subtitle: "Leadership Project • 2023-2025",
        description: "Leading school project team 'T-MBA' organizing multiple fundraising concerts and events. Successfully organized 2 concerts after earthquake to help college students, events for National Children's Day, Youth and Sports Day, and spring festival concert donating all proceeds to earthquake zone students in need.",
        skills: ["Team Leadership", "Event Organization", "Community Service", "Fundraising", "Concert Production", "Project Management"],
        achievements: [
            {
                title: "Earthquake Relief Fundraising",
                description: "Organized 2 major concerts raising significant funds for earthquake victims and college students in need"
            },
            {
                title: "Community Event Leadership",
                description: "Successfully led organization of National Children's Day and Youth and Sports Day celebrations"
            }
        ],
        images: [
            {
                url: "tmba/tmba2.jpg",
                caption: "My Team in 2023-2024 school year"
            },
            {
               url: "tmba/tmba1.jpg",
                caption: "My Team in 2023-2024 school year"
            },
            {
                url: "tmba/tmbaph4.HEIC",
                caption: "On the duty at National Childern's Day"
            },
            {
                url: "tmba/tmba3.jpg",
                caption: "My Team in 2024-2025 school year"
            },
            {
                url: "tmba/tmbaph3.HEIC",
                caption: "Behind the stages with my friend and my teacher"
            }
        ],
        videos: [

            {
                url: "tmba/concert1.mp4",
                caption: "Our third concert in 2025"
            },
{
                url: "tmba/concert2.mp4",
                caption: "Our first concert in 2023"
            },
        ]
    },
    // Fibonacci Robotics
    "1": {
        title: "Fibonacci International Robotics Championship",
        subtitle: "Robotics Competition • 2024",
        description: "Led robotics team to 2nd place in Fibonacci International Finals in entrepreneurship category. As team leader, coordinated strategy, design, and implementation while managing team dynamics and competition preparation for this prestigious international competition.",
        skills: ["Robotics Programming", "Team Leadership", "International Competition", "Entrepreneurship", "Strategic Planning", "Technical Innovation"],
        achievements: [
            {
                title: "Silver Medal - International Finals",
                description: "Achieved 2nd place in Fibonacci International Finals in entrepreneurship category"
            },
            {
                title: "Team Leadership Excellence",
                description: "Successfully led diverse team through complex competition challenges and strategic planning"
            }
        ],
        images: [

            {
                url: "robo/fiboben.HEIC",
                caption: "Me with the second place certificate:)"
            },
            {
               url: "robo/fiboodul.jpg",
                caption: "My Team getting the second place award"
            },
            {
                url: "robo/fiboodul2.HEIC",
                caption: "My Team's second place certificate"
            }

        ],
        videos: [

{
                url: "robo/fibosunum.mp4",
                caption: "Me and my team doing presentation to the judges"
            }

        ]
    },
    "2": {
  title: "Robotex Turkey Finals",
  subtitle: "Robotics Championship • 2024",
  description: "Team captain responsible for both design and software in the Robotex Turkey Finals. Coordinated team workflow and delivered a successful prototype that met competition requirements.",
  skills: ["Mechanical Design", "Embedded Systems", "Team Management", "Competition Strategy", "Software Integration"],
  achievements: [
    {
      title: "Qualified for International Finals",
      description: "Successfully led the team through national finals, securing a place in international competitions."
    },
    {
      title: "Team Captain",
      description: "Managed both technical development and team coordination under high-pressure competition timelines."
    }
  ],
  images: [

            {
                url: "robo/robo2.jpg",
                caption: "Me and my team ready for presentation to the judges"
            },
            {
               url: "robo/roboodul.jpg",
                caption: "My team getting the second place award in Robotex Turkey Regionals"
            },
            {
                url: "robo/robo1.jpg",
                caption: "Me with the second place trophy:)"
            }



  ],
  videos: [



{
                url: "robo/robosunum.mp4",
                caption: "Me and my team doing presentation to the judges"
            },

{
                url: "robo/robosunum2.mp4",
                caption: "Me and my team doing presentation to the judges"
            }



    
  ]
},


"3": {
  title: "FRC Robotics Team Involvement",
  subtitle: "FIRST Robotics Competition • 2024",
  description: "Actively contributed to an international FRC robotics team as a software developer and strategic support member. Collaborated with international teammates to solve complex challenges, write optimized code, and participate in advanced autonomous and manual control systems.",
  skills: [
    "Autonomous Programming",
    "Real-Time Strategy",
    "Cross-Team Collaboration",
    "Software Optimization",
    "Sensor Integration"
  ],
  achievements: [
    {
      title: "International Robotics Collaboration",
      description: "Worked with a global team in the FIRST Robotics Competition to design and program competition-ready robots."
    },
    {
      title: "Software and Strategy Contributor",
      description: "Developed critical robot functions including autonomous routines and assisted in real-time decision-making during matches."
    }
  ],
  images: [
{
    url: "frc/atthekoy.jpg",
                caption: "Us at the village school"
},
{
    url: "frc/explain2.jpg",
                caption: "Me doing presentation to other competitors in stand"
},
{
    url: "frc/frcmaskot.jpg",
                caption: "Me with the other team's mascot:)"
},
{
    url: "frc/frcteam.jpg",
                caption: "Our FRC team"
},
{
    url: "frc/koyokulutakim.jpg",
                caption: "Our team at the village school"
},
{
    url: "frc/ourobot.jpg",
                caption: "Our FRC robot"
},
{
    url: "frc/ourstand.jpg",
                caption: "Me and my teammates at the stand:)"
},
{
    url: "frc/playinggames2.jpg",
                caption: "At the stand having fun with other teams:)"
},
{
    url: "frc/qualificationmatch.jpg",
                caption: "Our qualification match result"
},
{
    url: "frc/talkingother.jpg",
                caption: "Me explaining the game to other teams"
},


  ],
  videos: [{
    url: "frc/atthematch.MOV",
                caption: "Our team supporting our teammates at the match"
},
{
    url: "frc/birdilekhakki.mp4",
                caption: "Our make a wish project"
},
{
    url: "frc/koyokulu.mp4",
                caption: "Me explaining the application to a student"
},
{
    url: "frc/koyokulusunum.mp4",
                caption: "Me explaining FRC to the students at village school."
},
{
    url: "frc/koyokulusunum2.mp4",
                caption: "Me explaining the application to the students at village school."
}]
},
"4": {
  title: "Model United Nations (MUN)",
  subtitle: "Outstanding Delegate & Co-Chair • 2024–2025",
  description: "Participated in multiple MUN conferences as both an award-winning delegate and a committee co-chair. Demonstrated advanced diplomacy, negotiation, public speaking, and leadership skills while guiding debates and preparing official documents.",
  skills: [
    "Public Speaking",
    "Policy Research",
    "Formal Writing",
    "Leadership",
    "Conflict Resolution",
    "Moderating Debates"
  ],
  achievements: [
    {
      title: "Outstanding Delegate Award",
      description: "Received the Outstanding Delegate award at DoğaMUN 2024 for effective resolution drafting and leadership during committee sessions."
    },
    {
      title: "UNWOMEN Committee Co-Chair",
      description: "Served as co-chair for the UNWOMEN committee, preparing study guides, moderating debates, and ensuring procedural integrity."
    }
  ],
  images: [
    {
    url: "mun/meoutstand.jpg",
                caption: "Me getting 'Outstanding Delegate' award"
},
{
    url: "mun/measco.jpg",
                caption: "Me as co-chair in the session"
},
{
    url: "mun/ascochair.jpg",
                caption: "My POV of being a co-chair"
},
{
    url: "mun/narin.HEIC",
                caption: "Me with the other co-chair:)"
}




  ],
  videos: [

    {
    url: "mun/gsl.mp4",
                caption: "My opening speech as a delegate"
},
{
    url: "mun/meinthebreak.mp4",
                caption: "My POV in the break as a delegate"
},
{
    url: "mun/getout.MOV",
                caption: "Me getting the Outstanding award"
}




  ]
},


// Academic Excellence Awards (cardId: 6)
"6": {
  title: "Academic Excellence Awards",
  subtitle: "Awards • 2027–2025",
  description: "High Honor / Honor rolls, school-wide academic awards, and standardized test achievements.",
  
  // İstersen skills/achievements de girersin; şart değil
  skills: ["Academic Excellence", "Consistency", "Discipline", "High Honor"],
  achievements: [
    { title: "High Honor Roll", description: "Multiple semesters with outstanding GPA." },
    
  ],

  // ⬇⬇⬇ Videolar (0–4 mantığının aynısı; dizi halinde)
  images: [
    {
      url: "academics/honor_roll_2024.mp4",
      caption: "High Honor Roll Ceremony 2024"
    },
    {
      url: "academics/awards_day_math.mp4",
      caption: "Math Department Award"
    },
    {
      url: "academics/ielts_result_screen.mp4",
      caption: "IELTS Result Showcase"
    },
    {
      url: "academics/sat_result_walkthrough.mp4",
      caption: "SAT Score Breakdown"
    },
    {
      url: "academics/school_awards_2025.mp4",
      caption: "School Awards Day 2025"
    }
  ]
}




    
};

function openProjectModal(card) {
    const modal = document.getElementById('projectModal');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    const cardId = card.getAttribute('data-card-id');
    
    currentProject = cardId;
    
    // Get project data or create default
    const projectData = projectShowcaseData[cardId] || {
        title: title,
        subtitle: "Project • Timeline",
        description: description,
        skills: ["Technology", "Innovation", "Problem Solving"],
        achievements: [
            {
                title: "Project Achievement",
                description: "Key outcomes and recognition will be displayed here as project content is added."
            }
        ],
        images: [],
        videos: []
    };
    
    // Populate modal with project showcase data
    populateProjectDisplay(projectData);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set focus for accessibility
    modal.querySelector('.modal-close').focus();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
}

function populateProjectDisplay(data) {
    // Set main title and subtitle
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('projectMainTitle').textContent = data.title;
    document.getElementById('projectSubtitle').textContent = data.subtitle;
    
    // Set description
    document.getElementById('projectDescription').innerHTML = `<p>${data.description}</p>`;
    
    // Populate skills
    const skillsContainer = document.getElementById('projectSkills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    // Populate achievements
    const achievementsContainer = document.getElementById('projectAchievements');
    achievementsContainer.innerHTML = '';
    data.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        `;
        achievementsContainer.appendChild(achievementCard);
    });
    
    // Populate images
    const imagesContainer = document.getElementById('projectImages');
    if (data.images && data.images.length > 0) {
        imagesContainer.innerHTML = '';
        data.images.forEach((image, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'project-image';
            imageDiv.innerHTML = `
                <img src="${image.url}" alt="${image.caption || 'Project Image ' + (index + 1)}">
                <div class="project-image-caption">${image.caption || 'Project Image ' + (index + 1)}</div>
            `;
            imagesContainer.appendChild(imageDiv);
        });
    } else {
        imagesContainer.innerHTML = `
            <div class="gallery-placeholder">
                <span>📸</span>
                <p>Project images will be displayed here</p>
            </div>
        `;
    }
    
    // Populate videos
    const videosContainer = document.getElementById('projectVideos');
    if (data.videos && data.videos.length > 0) {
        videosContainer.innerHTML = '';
        data.videos.forEach((video, index) => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'project-video';
            videoDiv.innerHTML = `
                <video src="${video.url}" controls>
                    Your browser does not support the video tag.
                </video>
                <div class="project-video-caption">${video.caption || 'Project Video ' + (index + 1)}</div>
            `;
            videosContainer.appendChild(videoDiv);
        });
    } else {
        videosContainer.innerHTML = `
            <div class="video-placeholder">
                <span>🎥</span>
                <p>Project videos and demos will be displayed here</p>
            </div>
        `;
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal.classList.contains('active')) {
            closeProjectModal();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });
    }
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

