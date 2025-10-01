// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile'); // THEME CHANGE: Get mobile button
    const htmlElement = document.documentElement;
    let vantaEffect = null;

    // Function to setup or update Vanta.js background
    const setupVanta = () => {
        const isDark = htmlElement.classList.contains('dark');
        const bgColor = isDark ? 0x111827 : 0xf9fafb; // gray-900 or gray-50

        if (vantaEffect) {
            vantaEffect.setOptions({ backgroundColor: bgColor });
        } else {
            vantaEffect = VANTA.GLOBE({
                el: "#vanta-bg",
                mouseControls: true, touchControls: true, gyroControls: false,
                minHeight: 200.00, minWidth: 200.00,
                scale: 1.00, scaleMobile: 1.00,
                color: 0x667eea, backgroundColor: bgColor, size: 0.8
            });
        }
    };

    // THEME CHANGE: Function to update both theme icons
    const updateIcon = () => {
        const isDark = htmlElement.classList.contains('dark');
        const icon = isDark ? 'sun' : 'moon';
        const innerHTML = `<i data-feather="${icon}" class="toggle-icon"></i>`;

        themeToggleBtn.innerHTML = innerHTML;
        if (themeToggleMobileBtn) {
            themeToggleMobileBtn.innerHTML = innerHTML;
        }
        feather.replace();
    };

    // Load saved theme from localStorage and set initial state
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.classList.add('dark');
    }
    setupVanta();
    updateIcon();

    // THEME CHANGE: Created a shared function to handle the theme toggle logic
    const handleThemeToggle = () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        setupVanta();
        updateIcon();
    };

    // Toggle theme on button click for both desktop and mobile
    themeToggleBtn.addEventListener('click', handleThemeToggle);
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', handleThemeToggle);
    }


    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
        mobileMenu.style.display = isHidden ? 'flex' : 'none';
        // Change icon based on state
        if (isHidden) {
             menuBtn.innerHTML = '<i data-feather="x" class="menu-icon"></i>';
        } else {
             menuBtn.innerHTML = '<i data-feather="menu" class="menu-icon"></i>';
        }
        feather.replace();
    });

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            menuBtn.innerHTML = '<i data-feather="menu" class="menu-icon"></i>';
            feather.replace();
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Final call to render all static icons on the page
    feather.replace();
});
