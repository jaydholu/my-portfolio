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
