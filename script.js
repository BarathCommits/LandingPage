/*
  script.js
  This file contains JavaScript functionality for the PatentChainAI landing page.
  It handles navigation, animations, smooth scrolling, and interactive elements.
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PatentChainAI Landing Page Loaded');

    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initScrollEffects();
    initFloatingCards();
    initContactForms();
    initAnalytics();
});

// ===================== Navigation Functions =====================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle active navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Update active link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// ===================== Smooth Scrolling Functions =====================

function initSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor link clicks
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================== Animation Functions =====================

function initAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .step, .pricing-card, .support-card');
    animateElements.forEach(el => observer.observe(el));
}

// ===================== Mobile Menu Functions =====================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.nav-menu a, .nav-buttons a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navButtons.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ===================== Scroll Effects Functions =====================

function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

// ===================== Floating Cards Functions =====================

function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s, ${1.2 + index * 0.2}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// ===================== Contact Forms Functions =====================

function initContactForms() {
    // Handle support link clicks
    const supportLinks = document.querySelectorAll('.support-link');
    
    supportLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'mail2me.barath@gmail.com';
            const subject = encodeURIComponent(this.textContent.trim());
            const body = encodeURIComponent('Hello PatentChainAI Support Team,\n\nI need assistance with: ');
            
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        });
    });

    // Handle footer contact links
    const footerLinks = document.querySelectorAll('.footer-section a[href^="mailto:"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track contact link clicks
            trackEvent('Contact Link Click', {
                link: this.textContent,
                section: this.closest('.footer-section').querySelector('h4').textContent
            });
        });
    });
}

// ===================== Analytics Functions =====================

function initAnalytics() {
    // Track page views
    trackPageView('Landing Page');

    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Button Click', {
                button: this.textContent.trim(),
                section: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            const planName = this.querySelector('h3').textContent;
            trackEvent('Pricing Card Click', {
                plan: planName
            });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackEvent('Scroll Depth', {
                    percentage: maxScroll
                });
            }
        }
    });
}

// ===================== Utility Functions =====================

function trackEvent(eventName, properties = {}) {
    // Simple analytics tracking
    console.log('Analytics Event:', eventName, properties);
    
    // You can integrate with Google Analytics, Mixpanel, or other analytics services here
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, properties);
    }
}

function trackPageView(pageName) {
    console.log('Page View:', pageName);
    
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

// ===================== Performance Optimization =====================

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload critical CSS and fonts
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.includes('.css') ? 'style' : 'font';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// ===================== Error Handling =====================

function initErrorHandling() {
    // Handle JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        trackEvent('JavaScript Error', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno
        });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        trackEvent('Unhandled Promise Rejection', {
            reason: e.reason
        });
    });
}

// ===================== Accessibility Functions =====================

function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.click();
            }
        }
    });

    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
}

// ===================== SEO and Meta Functions =====================

function initSEO() {
    // Update meta description based on current section
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateMetaDescription(sectionId);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

function updateMetaDescription(sectionId) {
    const descriptions = {
        'home': 'PatentChainAI democratizes invention by reducing patent costs from €2K-€2M to just €99-€299. AI-powered patent creation and blockchain-based licensing.',
        'problems': 'Learn about the current patent system problems: exorbitant costs, limited access, years of delays, security risks, and licensing inefficiency.',
        'solutions': 'Discover how PatentChainAI solves patent system problems with AI research agents, blockchain tokenization, and smart contract licensing.',
        'pricing': 'Simple, transparent pricing for patent creation. Choose from Starter ($99), Professional ($299), or Enterprise (Custom) plans.',
        'support': 'Get help with PatentChainAI. Contact our support team for technical assistance, server issues, or general questions.'
    };

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && descriptions[sectionId]) {
        metaDescription.setAttribute('content', descriptions[sectionId]);
    }
}

// ===================== Initialize Everything =====================

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    preloadCriticalResources();
    initErrorHandling();
    initAccessibility();
    initSEO();
});

// ===================== Export for Module Usage =====================

// If using modules, export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSmoothScrolling,
        initAnimations,
        initMobileMenu,
        initScrollEffects,
        initFloatingCards,
        initContactForms,
        initAnalytics,
        trackEvent,
        trackPageView
    };
} 