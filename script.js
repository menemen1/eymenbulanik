

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
                
                
                updateActiveNavigation(this.getAttribute('href'));
            }
        });
    });
}


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
        
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
        
        
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
        
        
        updateActiveNavigationOnScroll();
        
        ticking = false;
    }
}


function setupIntersectionObserver() {
  const observerOptions = {
  threshold: 0.01,             
  rootMargin: '0px 0px -20% 0px' 
};


    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                
                requestAnimationFrame(() => {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    entry.target.classList.add('animated');
});

            }
        });
    }, observerOptions);

    
    const animatedElements = document.querySelectorAll('.card, .education-card, .about-text, .section-title');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
element.style.transform = 'translateY(12px)'; 
element.style.transition = 'opacity .35s ease-out, transform .35s ease-out';
element.style.transitionDelay = '0s'; 
element.style.willChange = 'opacity, transform';

        observer.observe(element);
    });
}


function setupParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && window.innerWidth > 768) {
            
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * -0.15}px)`;
            }
        }
        
        
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && window.innerWidth > 768) {
            const rect = profileImg.getBoundingClientRect();
            const speed = (rect.top + rect.height / 2) * 0.02;
            profileImg.style.transform = `translateY(${speed}px) scale(1) rotate(${speed * 0.1}deg)`;
        }
    });
}


function setupHeaderEffects() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    
    if (header && logo) {
       
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}


function setupCodeSection() {
    
    loadActualCodeContent();
    
    
    window.showCode = function(type) {
        
        document.querySelectorAll('.code-content').forEach(content => {
            content.classList.remove('active');
        });
        
        
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        
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
            
            const htmlResponse = await fetch('index.html');
            if (htmlResponse.ok) {
                const htmlContent = await htmlResponse.text();
                document.getElementById('html-code').textContent = htmlContent;
            }
            
            
            const cssResponse = await fetch('style.css');
            if (cssResponse.ok) {
                const cssContent = await cssResponse.text();
                document.getElementById('css-code').textContent = cssContent;
            }
            
            
            const jsResponse = await fetch('script.js');
            if (jsResponse.ok) {
                const jsContent = await jsResponse.text();
                document.getElementById('js-code').textContent = jsContent;
            }
            
        } catch (error) {
            console.log('Could not load some code files, showing fallback content');
            
            loadCodeFromCurrentPage();
        }
    }

    function loadCodeFromCurrentPage() {
        
        const htmlContent = document.documentElement.outerHTML;
        document.getElementById('html-code').textContent = htmlContent;
        
        
        document.getElementById('css-code').textContent = '/* Unable to fetch CSS file directly. The complete CSS code is in style.css */';
        document.getElementById('js-code').textContent = '// Unable to fetch JS file directly. The complete JavaScript code is in script.js';
    }
    
   
    loadActualCodeContent();

    
    window.copyCode = function(elementId) {
        const codeElement = document.getElementById(elementId);
        const button = event.target;
        
        if (!codeElement) return;
        
        const text = codeElement.textContent;
        
       
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


function setupLoadingAnimations() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const ctaButton = document.querySelector('.hero .cta-button');
    
    
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


function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        
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
        
        
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}


function setupPerformanceOptimizations() {
    
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
    
    
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    
   
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            
            updateLayoutCalculations();
        }, 250);
    });
}


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


function updateLayoutCalculations() {
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        
        card.style.height = 'auto';
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
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



let currentProject = null;


const projectShowcaseData = {
   
    "0": {
        title: "T-MBA Team Leadership & Community Service",
        subtitle: "Leadership Project • 2023-2025",
        description: "Leading school project team 'T-MBA' organizing multiple fundraising concerts and events. Successfully organized 2 concerts and countless community events after earthquake to help college students, events for National Children's Day, Youth and Sports Day, and spring festival concert making around 4K USD and donating all proceeds to earthquake zone students in need.",
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
                url: "tmba/tmba2.JPG",
                caption: "My Team in 2023-2024 school year"
            },
            {
               url: "tmba/tmba1.JPG",
                caption: "My Team in 2023-2024 school year"
            },
            {
                url: "tmba/tmbaph4.HEIC",
                caption: "On the duty at National Childern's Day"
            },
            {
                url: "tmba/tmba3.JPG",
                caption: "My Team in 2024-2025 school year"
            },
            {
                url: "tmba/tmbaph3.HEIC",
                caption: "Behind the stages with my friend and my teacher"
            }
        ],
        videos: [

            {
                url: "tmba/concert1.MP4",
                caption: "Our third concert in 2025"
            },
{
                url: "tmba/concert2.MP4",
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
               url: "robo/fiboodul.JPG",
                caption: "My Team getting the second place award"
            },
            {
                url: "robo/fiboodul2.HEIC",
                caption: "My Team's second place certificate"
            }

        ],
        videos: [

{
                url: "robo/fibosunum.MP4",
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
                url: "robo/robo2.JPG",
                caption: "Me and my team ready for presentation to the judges"
            },
            {
               url: "robo/roboodul.JPG",
                caption: "My team getting the second place award in Robotex Turkey Regionals"
            },
            {
                url: "robo/robo1.JPG",
                caption: "Me with the second place trophy:)"
            }



  ],
  videos: [



{
                url: "robo/robosunum.MP4",
                caption: "Me and my team doing presentation to the judges"
            },

{
                url: "robo/robosunum2.MP4",
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
    url: "frc/explain2.JPG",
                caption: "Me doing presentation to other competitors in stand"
},
{
    url: "frc/frcmaskot.JPG",
                caption: "Me with the other team's mascot:)"
},
{
    url: "frc/frcteam.JPG",
                caption: "Our FRC team"
},
{
    url: "frc/koyokulutakim.JPG",
                caption: "Our team at the village school"
},
{
    url: "frc/ourobot.JPG",
                caption: "Our FRC robot"
},
{
    url: "frc/ourstand.JPG",
                caption: "Me and my teammates at the stand:)"
},
{
    url: "frc/playinggames2.JPG",
                caption: "At the stand having fun with other teams:)"
},
{
    url: "frc/qualificationmatch.JPG",
                caption: "Our qualification match result"
},
{
    url: "frc/talkingother.JPG",
                caption: "Me explaining the game to other teams"
},


  ],
  videos: [{
    url: "frc/atthematch.MOV",
                caption: "Our team supporting our teammates at the match"
},
{
    url: "frc/birdilekhakki.MP4",
                caption: "Our make a wish project"
},
{
    url: "frc/koyokulu.MP4",
                caption: "Me explaining the application to a student"
},
{
    url: "frc/koyokulusunum.MP4",
                caption: "Me explaining FRC to the students at village school."
},
{
    url: "frc/koyokulusunum2.MP4",
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
    url: "mun/meoutstand.JPG",
                caption: "Me getting 'Outstanding Delegate' award"
},
{
    url: "mun/measco.JPG",
                caption: "Me as co-chair in the session"
},
{
    url: "mun/ascochair.JPG",
                caption: "My POV of being a co-chair"
},
{
    url: "mun/narin.HEIC",
                caption: "Me with the other co-chair:)"
}




  ],
  videos: [

    {
    url: "mun/gsl.MP4",
                caption: "My opening speech as a delegate"
},
{
    url: "mun/meinthebreak.MP4",
                caption: "My POV in the break as a delegate"
},
{
    url: "mun/getout.MOV",
                caption: "Me getting the Outstanding award"
}




  ]
},



"5": {
  title: "Academic Excellence Awards",
  subtitle: "Awards • 2017–2025",
  description: "High Honor / Honor rolls, school-wide academic awards, and standardized test achievements.Earlier documents are lost in the earthquake.",
  
 
  skills: ["Academic Excellence", "Consistency", "Discipline", "High Honor"],
  achievements: [
    { title: "High Honor Roll", description: "Multiple semesters with outstanding GPA." },
    
  ],

  
  images: [
    {
      url: "award/takdir101.HEIC",
      caption: "High Honor Roll, 10th Grade 1st Semester"
    },
     {
      url: "award/takdir111.HEIC",
      caption: "High Honor Roll, 11th Grade 1st Semester"
    },
     {
      url: "award/takdir112.HEIC",
      caption: "High Honor Roll, 11th Grade 2nd Semester"
    },
     {
      url: "award/onur101.HEIC",
      caption: "Academic Honors, 10th Grade 1st Semester"
    },
    {
      url: "award/onur112.HEIC",
      caption: "Academic Honors, 11th Grade 2nd Semester"
    },
    {
      url: "award/ustunb.HEIC",
      caption: "Academic Exellence, 11th Grade 2nd Semester"
    },
  ]
},




6: {
  title: "Musical Expertise",
  subtitle: "Pianist & Multi-Instrumentalist • Since 5th Grade",
  description: "Professional pianist with years of performance experience in concerts and community events. Also a self-taught musician proficient in drums, guitar, and ukulele. Uses music not only for artistic expression but also as a tool for fundraising and community service.",
  skills: [
    "Professional Piano",
    "Drums",
    "Guitar",
    "Ukulele",
    "Concert Performance",
    "Music Production",
    "Event Organization",
    "Self-Taught Learning"
  ],
  achievements: [
    {
      title: "Concert Performances",
      description: "Performed piano pieces in numerous school concerts and charity events, blending music with social impact."
    },
    {
      title: "Community Engagement through Music",
      description: "Organized and participated in concerts to support earthquake recovery efforts and raise funds for children in need."
    }
  ],
  images: [
    {
      url: "music/pianophoto.JPG",
      caption: "Performing at a community event"
    },
    {
      url: "music/piano2.JPG",
      caption: "During the community event performance"
    },
    
  ],
  videos: [
    {
      url: "music/pianovideo.mov",
      caption: "Live piano performance at a school event"
    },
    
    {
      url: "music/drum2.mov",
      caption: "My drum performance"
    },
    {
      url: "music/drum3.mov",
      caption: "My drum performance"
    },
    {
      url: "music/drum4.mov",
      caption: "My drum performance"
    },
    {
      url: "music/piano2.MP4",
      caption: "My piano performance"
    },
    {
      url: "music/piano3.MP4",
      caption: "My piano performance"
    },
    
  ]
},

7: {
  title: "Robotics & Engineering",
  subtitle: "Team Leadership • International Competitions • Innovation",
  description: "Extensive experience leading robotics teams in Robotex, Fibonacci, and FRC competitions. Skilled in robot programming, team management, and strategic planning for international contests. Focused on merging creativity with technology to build innovative robotic solutions.",
  skills: [
    "Robotics Programming",
    "Team Leadership",
    "Competition Strategy",
    "FRC",
    "STEM Education",
    "Technical Innovation",
    "Problem Solving",
    "Project Management"
  ],
  achievements: [
    {
      title: "Fibonacci International Robotics Championship",
      description: "Led the team to 2nd place worldwide in entrepreneurship category. Managed robot design, presentation, and technical development."
    },
    {
      title: "Robotex Turkey Finals",
      description: "Earned Jury’s Special Award for entrepreneurship. Oversaw team operations, strategy, and community engagement."
    },
    {
      title: "FRC Team 10353 Leadership",
      description: "Directed the public relations and outreach activities, organizing STEM education events and village school visits."
    }
  ],
  images: [
    {
      url: "award/antalyajuri.png",
      caption: "This the document that states our jury special award"
    },
    {
      url: "award/mersin2.png",
      caption: "This is the document that states Robotex Turkey Local Finals Second Place "
    },
    {
      url: "robo/fiboodul2.HEIC",
      caption: "This is the document that states our second place in international Fibonacci competition"
    }
  ]

  
  
},

8: {
  title: "Languages & Communication",
  subtitle: "Fluency • Public Speaking • Global Engagement",
  description: "Fluent in English and native Turkish speaker with advanced communication and presentation skills. Proven ability to articulate ideas clearly through Model United Nations, debate championships, and public speaking at various events and conferences.",
  skills: [
    "English (C1)",
    "Turkish (Native)",
    "Public Speaking",
    "Debate",
    "Model United Nations",
    "Cross-cultural Communication",
    "Persuasive Writing",
    "Leadership through Communication"
  ],
  achievements: [
    {
      title: "Debate Championships",
      description: "Achieved first place in multiple school and regional debate competitions for persuasive argumentation and analytical reasoning."
    },
    {
      title: "Model United Nations",
      description: "Served as a delegate and later as a co-chair, receiving 'Outstanding Delegate' award for diplomatic communication and leadership."
    },
    {
      title: "Public Speaking Events",
      description: "Delivered speeches and moderated sessions at school conferences and special events, showcasing confidence and clarity."
    }
  ],
  images: [
    {
      url: "mun/meoutstand.JPG",
      caption: "Me while getting Certificate of Outstanding Delegate Award at DoğaMUN"
    },
    {
      url: "award/munodul1.HEIC",
      caption: "Certificate of Outstanding Delegate Award at DoğaMUN"
    },
    {
      url: "award/ieltssonuc.png",
      caption: "My IELTS result"
    },
    {
      url: "award/satsonuc.png",
      caption: "My SAT result"
    }
  ],



},



9: {
  title: "Sports & Dance Achievements",
  subtitle: "Volleyball • Chess • Waltz Performance",
  description: "Licensed volleyball and chess player, and passionate dancer specialized in Waltz. Champion of Bahçeşehir Hatay Volleyball Competition, 1st place in Hatay Doga Chess Competition, and performer in multiple school waltz showcases combining rhythm, strategy, and teamwork.",
  skills: [
    "Volleyball Champion",
    "Chess Champion",
    "Licensed Player",
    "Waltz Dancer",
    "Performer",
    "Teamwork",
    "Discipline",
    "Artistic Expression"
  ],
  achievements: [
    {
      title: "Volleyball Championship",
      description: "Won first place in Bahçeşehir Hatay Volleyball Competition as a licensed player representing the school team."
    },
    {
      title: "Chess Championship",
      description: "Secured 1st place in Hatay Doğa Chess Competition, representing the school in official tournaments."
    },
    {
      title: "Waltz Performances",
      description: "Performed waltz choreography in multiple school and public events, combining artistic expression with athletic discipline."
    }
  ],
  images: [
    {
      url: "award/lisanlar.png",
      caption: "These are my licences from previous season.(My current ones haven't arrived yet)"
    },
    
  ],
  videos: [
    {
      url: "vals/2023vals.mp4",
      caption: "My first Live waltz performance at school event in 2023(I am the first one from right)"
    },
     {
      url: "vals/19mayisvals.mp4",
      caption: "My second Live waltz performance at school event in 2024(I am the first one from left)"
    },
    {
      url: "vals/2025vals.mp4",
      caption: "My third Live waltz performance at school event in 2025(I am the right one in the front while we are greeting eachother.)"
    }
  ]
},


10: {
  title: "Community Service Recognition",
  subtitle: "Volunteering • Music • Social Impact",
  description: "Received Certificate of Honor from LÖSEV for volunteering with children with cancer and Certificate of Honor from Doğa Hatay for voluntary piano performances at multiple events. Recognized for exceptional community service and dedication to social causes through music and leadership.",
  skills: [
    "Community Service",
    "Volunteering",
    "Social Responsibility",
    "Music for Good",
    "Leadership",
    "Empathy",
    "Public Engagement",
    "Humanitarian Work"
  ],
  achievements: [
    {
      title: "LÖSEV Volunteering",
      description: "Received Certificate of Honor from LÖSEV for dedicated volunteer work and musical performances for children with cancer."
    },
    {
      title: "Doğa Hatay Recognition",
      description: "Awarded Certificate of Honor for piano performances at school charity events and special-day celebrations."
    },
    {
      title: "Social Impact Through Music",
      description: "Used music as a bridge to connect with communities, organizing and performing in concerts to support charitable causes."
    }
  ],
  images: [
    {
      url: "award/losevonur.HEIC",
      caption: "Certificate of Honor from LÖSEV for volunteering"
    },
    
  ],
  
}












    
};

function openProjectModal(card) {
    const modal = document.getElementById('projectModal');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    const cardId = card.getAttribute('data-card-id');
    
    currentProject = cardId;
    
    
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
 
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('projectMainTitle').textContent = data.title;
    document.getElementById('projectSubtitle').textContent = data.subtitle;
    
 
    document.getElementById('projectDescription').innerHTML = `<p>${data.description}</p>`;
    
    
    const skillsContainer = document.getElementById('projectSkills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    
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

