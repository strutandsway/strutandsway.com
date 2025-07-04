// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Shrink the bottom margin of the viewport for earlier trigger
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible if animation should only play once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to all elements with 'fade-in' class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) { // Change background after scrolling 80px
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Add hover effects to product cards (already handled by CSS, but keeping JS if needed for more complex effects)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // card.style.transform = 'translateY(-10px) scale(1.02)'; // Now handled by CSS :hover
    });

    card.addEventListener('mouseleave', () => {
        // card.style.transform = 'translateY(0) scale(1)'; // Now handled by CSS :hover
    });
});

// Add extra interactivity on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation (simple opacity fade-in for body)
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add click effect to CTA button (ripple effect)
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Create ripple effect span
            const ripple = document.createElement('span');
            // Get the size and position of the button
            const rect = ctaButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            // Calculate click position relative to the button
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            // Apply styles for the ripple
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none'; // Ensure ripple doesn't interfere with clicks

            // Ensure button has relative positioning for ripple to work
            ctaButton.style.position = 'relative';
            ctaButton.style.overflow = 'hidden'; // Hide overflow of ripple

            // Append ripple and remove after animation
            ctaButton.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600); // Remove ripple after its animation duration
        });
    }

    // Scroll indicator animation (no JS needed, handled by CSS animation 'bounce')
    // The previous floating elements and parallax effect have been removed for a cleaner, modern look.
});

// The @keyframes ripple CSS is now directly in styles.css for better organization
// and removed from here as it was dynamically added before.
