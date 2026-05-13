// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const htmlElement = document.documentElement;
  let vantaEffect = null;

  // Function to setup or update Vanta.js background
  const setupVanta = () => {
    const isDark = htmlElement.classList.contains('dark');
    const bgColor = isDark ? 0x111827 : 0xf9fafb;

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

  // Function to update both theme icons
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

  // Created a shared function to handle the theme toggle logic
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

  async function loadData() {
    const skillsContainer = document.getElementById("skills-container");
    const projectsContainer = document.getElementById("projects-container");

    // Check if containers exist (we're on index.html)
    if (!skillsContainer || !projectsContainer) {
      console.log('Not on index page, skipping data load');
      return;
    }

    try {
      // Load Skills
      console.log('Loading skills...');
      const skillsRes = await fetch("data/skills.json");
      const skills = await skillsRes.json();
      console.log('Skills loaded:', skills);

      // Display top 4 skills on index page
      skillsContainer.innerHTML = skills.slice(0, 4).map(skill => `
        <div class="skill-card" data-aos="fade-up">
          <div class="skill-icon">
            <i data-feather="${skill.icon}"></i>
          </div>
          <h3>${skill.name}</h3>
          <p>${skill.description}</p>
          <span class="skill-level">${skill.level}</span>
        </div>
      `).join("");

      // Load Projects
      console.log('Loading projects...');
      const projectsRes = await fetch("data/projects.json");
      const projects = await projectsRes.json();
      console.log('Projects loaded:', projects);

      // Display top 3 projects on index page
      projectsContainer.innerHTML = projects.slice(0, 3).map(project => `
        <div class="project-card" data-aos="fade-up">
          <img src="${project.image}" alt="${project.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(project.name)}'">
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
            </div>
            <div class="project-links">
                ${project.demolink ? `<a href="${project.demolink}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
                <a href="${project.githubrepo}" target="_blank" class="btn ${project.demolink ? 'btn-secondary' : 'btn-primary'}">GitHub</a>
            </div>
          </div>
        </div>
      `).join("");

      // Load Certificates (top 3 shown on index)
      const certsRes = await fetch("data/certificates.json");
      const certificates = await certsRes.json();
      const certsContainer = document.getElementById("certificates-container");

      if (certsContainer) {
        certsContainer.innerHTML = certificates.slice(0, 3).map(cert => `
          <div class="certificate-card" data-aos="fade-up">
            <div class="certificate-image-wrap">
              <img src="${cert.image}" alt="${cert.name}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(cert.name)}'">
            </div>
            <div class="certificate-info">
              <div class="certificate-header">
                <span class="certificate-issuer">
                  <i data-feather="award"></i>
                  ${cert.issuer}
                </span>
                <span class="certificate-date">
                  <i data-feather="calendar"></i>
                  ${cert.date}
                </span>
              </div>
              <h3>${cert.name}</h3>
              ${cert.score ? `<div class="certificate-score"><i data-feather="star"></i> Score: ${cert.score}</div>` : ''}
              <div class="certificate-tags">
                ${cert.tags.map(tag => `<span>${tag}</span>`).join('')}
              </div>
              ${cert.verifylink ? `
                <div class="certificate-links">
                  <a href="${cert.verifylink}" target="_blank" rel="noopener" class="btn btn-primary">
                    <i data-feather="external-link"></i> View Certificate
                  </a>
                </div>` : ''}
            </div>
          </div>
        `).join('');
      }

      // Replace feather icons after content is loaded
      console.log('Replacing feather icons...');
      feather.replace();
      AOS.refresh();
      console.log('Data loaded successfully!');
    } catch (err) {
      console.error("Error loading data:", err);
      // Display error message to user
      if (skillsContainer) {
        skillsContainer.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">Error loading skills. Please check console for details.</p>`;
      }
      if (projectsContainer) {
        projectsContainer.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">Error loading projects. Please check console for details.</p>`;
      }
    }
  }

  // Load data for index page
  loadData();

  // Initialize AOS
  AOS.init({ duration: 800, once: true });

  // Initialize feather icons
  feather.replace();

  // ===========================
  // PRELOADER CONTROL (THEME-AWARE)
  // ===========================
  const preloader = document.getElementById('preloader');

  const applyPreloaderTheme = () => {
    const isDark = htmlElement.classList.contains('dark');
    document.documentElement.classList.toggle('light', !isDark);
  };

  // Apply theme class immediately
  applyPreloaderTheme();

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 700);
  });

  // When theme changes, update preloader background too
  themeToggleBtn.addEventListener('click', applyPreloaderTheme);
  if (themeToggleMobileBtn)
    themeToggleMobileBtn.addEventListener('click', applyPreloaderTheme);

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
      mobileMenu.style.display = isHidden ? 'flex' : 'none';
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
  }

  // Final call to render all static icons on the page
  feather.replace();
});

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Get form elements
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const formMessage = document.getElementById('form-message');

      // Get form data
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      // Show loading state
      const originalText = btnText.textContent;
      btnText.innerHTML = '<i data-feather="loader" style="width: 16px; height: 16px; animation: spin 1s linear infinite;"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.style.cursor = 'not-allowed';
      formMessage.classList.add('hidden');
      feather.replace();

      try {
        // Send form data to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          // Success!
          btnText.innerHTML = '<i data-feather="check-circle" style="width: 16px; height: 16px;"></i> Message Sent!';
          submitBtn.style.backgroundColor = '#10b981';

          // Show success message
          formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
          formMessage.className = 'form-message form-message-success';

          // Reset form
          contactForm.reset();

          // Reset button after 5 seconds
          setTimeout(() => {
            btnText.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            formMessage.classList.add('hidden');
          }, 5000);

        } else {
          throw new Error(result.message || 'Something went wrong');
        }

      } catch (error) {
        console.error('Error:', error);

        // Show error state
        btnText.innerHTML = '<i data-feather="x-circle" style="width: 16px; height: 16px;"></i> Failed to Send';
        submitBtn.style.backgroundColor = '#ef4444';

        // Show error message
        formMessage.textContent = 'Failed to send message. Please try again or email me directly.';
        formMessage.className = 'form-message form-message-error';

        // Reset button after 5 seconds
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
        }, 5000);
      }

      // Replace feather icons
      feather.replace();
    });
  }
});

// Add spinning animation for loader
if (!document.getElementById('spinner-styles')) {
  const style = document.createElement('style');
  style.id = 'spinner-styles';
  style.textContent = `
      @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
      }
  `;
  document.head.appendChild(style);
}

// ============================================
// IMAGE LIGHTBOX MODAL
// Add this block to the very bottom of script.js
// ============================================

(function () {
    // Inject modal HTML into the page once
    const modalHTML = `
    <div id="img-modal" role="dialog" aria-modal="true" aria-label="Image preview">
      <div class="modal-inner">
        <button class="modal-close" aria-label="Close preview">&#x2715;</button>
        <img id="modal-img" src="" alt="">
        <p class="modal-caption" id="modal-caption"></p>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal    = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    const caption  = document.getElementById('modal-caption');
    const closeBtn = modal.querySelector('.modal-close');

    // Global open function — called from project/certificate card templates
    window.openImageModal = function (src, alt) {
        modalImg.src = src;
        modalImg.alt = alt || '';
        caption.textContent = alt || '';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    };

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        modalImg.src = '';
    }

    // Close via button, backdrop click, or Escape key
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
})();
