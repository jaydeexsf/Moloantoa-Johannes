(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      });
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Dynamic data loader from /data/*.json
   */
  async function fetchJson(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load ' + path);
    return res.json();
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '';
  }

  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el && value) el.setAttribute(attr, value);
  }

  function setHref(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.href = value;
  }

  function setHrefOrHide(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (value && value.trim() !== '') {
      el.href = value;
      el.style.display = '';
    } else {
      el.href = '#';
      el.style.display = 'none';
    }
  }

  function updateMeta(config) {
    document.title = `${config.name} - Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const metaKeys = document.querySelector('meta[name="keywords"]');
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaDesc) metaDesc.content = config.meta?.description || '';
    if (metaKeys) metaKeys.content = config.meta?.keywords || '';
    if (metaAuthor) metaAuthor.content = config.meta?.author || config.name || '';
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogUrl) ogUrl.content = config.website || '';
    if (ogTitle) ogTitle.content = `${config.name} - Portfolio`;
    if (ogDesc) ogDesc.content = config.meta?.description || '';
    if (ogImage) ogImage.content = config.meta?.ogImage || '';
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    const twImage = document.querySelector('meta[property="twitter:image"]');
    if (twUrl) twUrl.content = config.website || '';
    if (twTitle) twTitle.content = `${config.name} - Portfolio`;
    if (twDesc) twDesc.content = config.meta?.description || '';
    if (twImage) twImage.content = config.meta?.ogImage || '';
  }

  function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    container.innerHTML = '';

    // Create a single full-width column that holds a flexible grid of icons
    const col = document.createElement('div');
    col.className = 'col-12';

    const grid = document.createElement('div');
    grid.className = 'skills-grid';

    const iconMap = {
      'TypeScript': 'bi-code-slash',
      'JavaScript': 'bi-filetype-js',
      'Java': 'bi-cup-hot',
      'SQL': 'bi-database',
      'HTML5': 'bi-filetype-html',
      'CSS': 'bi-filetype-css',
      'React': 'bi-lightning-charge',
      'ReactJS': 'bi-lightning-charge',
      'Next.js': 'bi-box',
      'NextJS': 'bi-box',
      'Node': 'bi-cpu',
      'NodeJS': 'bi-cpu',
      'Express': 'bi-node-plus',
      'ExpressJS': 'bi-node-plus',
      'Spring Boot': 'bi-flower3',
      'AWS': 'bi-cloud',
      'Docker': 'bi-box-seam',
      'Firebase': 'bi-fire',
      'MongoDB': 'bi-database',
      'PostgreSQL': 'bi-database',
      'MySQL': 'bi-database'
    };

    (skills || []).forEach((s) => {
      const badge = document.createElement('span');
      badge.className = 'skill-badge';
      badge.title = s.name;

      const iconClass = iconMap[s.name] || 'bi-gear';
      badge.innerHTML = `<i class="bi ${iconClass}"></i><span class="skill-name">${s.name}</span>`;

      grid.appendChild(badge);
    });

    col.appendChild(grid);
    container.appendChild(col);
  }

  function renderProjects(projects) {
    const container = document.getElementById('portfolio-container');
    if (!container) return;
    container.innerHTML = '';
    projects.forEach((p) => {
      // Map category to filter class
      const categoryMap = {
        'FULL STACK': 'filter-fullstack',
        'BACKEND': 'filter-backend',
        'CONTRIBUTION': 'filter-contribution'
      };
      
      const filterClass = categoryMap[p.category] || 'filter-app';
      
      const item = document.createElement('div');
      item.className = `portfolio-item isotope-item ${filterClass}`;
      
      // Create tech stack badges
      const techStack = p.tech ? p.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('') : '';
      
      item.innerHTML = `
        <div class="portfolio-content">
          <img src="${p.image}" class="img-fluid" alt="${p.title}">
          <div class="portfolio-info">
            <h4>${p.title}</h4>
            <p>${p.summary || ''}</p>
            <div class="tech-stack-badges">
              ${techStack}
            </div>
            <div class="portfolio-links">
              ${p.url ? `<a href="${p.url}" title="Live Demo" target="_blank" class="preview-link"><i class="bi bi-globe"></i></a>` : ''}
              ${p.repo ? `<a href="${p.repo}" title="GitHub Repository" target="_blank" class="details-link"><i class="bi bi-github"></i></a>` : ''}
              <a href="portfolio-details.html?id=${encodeURIComponent(p.id || p.title)}" title="More Details" class="details-link"><i class="bi bi-info-circle"></i></a>
            </div>
          </div>
        </div>
      `;
      container.appendChild(item);
    });

    // Re-init Isotope after dynamic render
    initPortfolioIsotope();

    // Refresh lightbox to catch new items
    if (typeof glightbox !== 'undefined' && glightbox && glightbox.reload) {
      try { glightbox.reload(); } catch (e) { /* noop */ }
    }
  }

  function renderWorkExperience(work) {
    const container = document.getElementById('work-container');
    if (!container) return;
    container.innerHTML = '';
    work.forEach((job) => {
      const jobEl = document.createElement('div');
      jobEl.className = 'resume-item';
      jobEl.innerHTML = `
        <h4>${job.role} - ${job.company}</h4>
        <h5>${job.start} - ${job.end}</h5>
        ${job.location ? `<p><em>${job.location}</em></p>` : ''}
        <ul>${(job.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
      `;
      container.appendChild(jobEl);
    });
  }

  function renderEducation(education) {
    const container = document.getElementById('education-container');
    if (!container) return;
    container.innerHTML = '';
    education.forEach((ed) => {
      const edEl = document.createElement('div');
      edEl.className = 'resume-item';
      edEl.innerHTML = `
        <h4>${ed.degree}</h4>
        <h5>${ed.start} - ${ed.end}</h5>
        <p><em>${ed.institution}</em></p>
        ${ed.bullets && ed.bullets.length ? `<ul>${ed.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      `;
      container.appendChild(edEl);
    });
  }

  async function loadDynamicData() {
    try {
      const [config, skills, projects, contact, experience] = await Promise.all([
        fetchJson('data/config.json'),
        fetchJson('data/skills.json'),
        fetchJson('data/projects.json'),
        fetchJson('data/contact.json'),
        fetchJson('data/experience.json')
      ]);

      updateMeta(config);

      setText('site-name', config.name);
      setText('hero-name', config.name);
      setText('about-title', config.title);
      setText('about-text', config.about);
      setText('about-phone', config.phone);
      setText('about-email', config.email);
      setText('about-city', config.location || '');
      setText('resume-name', config.name);
      setText('resume-summary', config.about);
      setText('resume-location', config.location || '');
      setText('resume-phone', config.phone || '');
      setText('resume-email', config.email || '');
      setText('footer-name', config.name);

      // Images
      const heroImgEl = document.querySelector('#hero img');
      if (heroImgEl && config.heroImage) heroImgEl.src = config.heroImage;
      setAttr('about-image', 'src', config.photo || 'assets/img/profile.jpg');

      // Socials (prefer config, fallback to contact.json)
      const githubLink = config.github || contact.social?.github || '';
      const linkedinLink = config.linkedin || contact.social?.linkedin || '';
      const websiteLink = config.website || contact.social?.website || '';
      const twitterLink = config.twitter || contact.social?.twitter || '';
      const instagramLink = config.instagram || contact.social?.instagram || '';

      setHrefOrHide('social-github', githubLink);
      setHrefOrHide('social-linkedin', linkedinLink);
      setHrefOrHide('social-website', websiteLink);
      setHrefOrHide('social-twitter', twitterLink);
      setHrefOrHide('social-instagram', instagramLink);

      // Contact block
      setText('contact-address', contact.address || config.location || '');
      setText('contact-phone', contact.phone || config.phone || '');
      setText('contact-email', contact.email || config.email || '');
      setHref('social-twitter', contact.social?.twitter || '');

      // Hero typed update if present
      const typed = document.getElementById('hero-typed');
      if (typed) {
        typed.setAttribute('data-typed-items', 'Full Stack Engineer, Backend Developer, Problem Solver');
      }

      // Render lists
      renderSkills(skills.skills || []);
      renderProjects(projects.projects || []);
      renderWorkExperience(experience.work || []);
      renderEducation(experience.education || []);

      // Degree from education (first item)
      const degree = (experience.education && experience.education[0] && experience.education[0].degree) ? experience.education[0].degree : '';
      setText('about-degree', degree);

    } catch (e) {
      // Fail silently to avoid breaking static page
      console.error(e);
    }
  }

  window.addEventListener('load', loadDynamicData);

  // Initialize or re-initialize Isotope for portfolio after dynamic updates
  function initPortfolioIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      // Destroy existing instance if any
      if (container.isotope) {
        container.isotope.destroy();
      }

      // Initialize Isotope with proper settings
      imagesLoaded(container, function() {
        const iso = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
          filter: '*',
          sortBy: 'original-order'
        });

        // Add click listeners to filter buttons
        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            const active = isotopeItem.querySelector('.isotope-filters .filter-active');
            if (active) active.classList.remove('filter-active');
            this.classList.add('filter-active');
            
            const filter = this.getAttribute('data-filter');
            iso.arrange({ filter: filter });
            
            if (typeof aosInit === 'function') {
              aosInit();
            }
          });
        });
      });
    });
  }

  // Portfolio details loader for portfolio-details.html
  async function loadPortfolioDetails() {
    if (!document.body.classList.contains('portfolio-details-page')) return;
    try {
      const projects = await fetchJson('data/projects.json');
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const project = (projects.projects || []).find(p => (p.id || p.title) === id) || (projects.projects || [])[0];
      if (!project) return;

      // Swiper images
      const swiperWrapper = document.querySelector('.portfolio-details .swiper-wrapper');
      if (swiperWrapper) {
        swiperWrapper.innerHTML = '';
        (project.images || [project.image]).forEach(src => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.innerHTML = `<img src="${src}" alt="${project.title}">`;
          swiperWrapper.appendChild(slide);
        });
      }

      // Info card
      const infoList = document.querySelector('.portfolio-info .list-unstyled');
      if (infoList) {
        infoList.innerHTML = `
          <li><i class="bi bi-bookmark-check"></i> <strong>Category:</strong> ${project.category || ''}</li>
          <li><i class="bi bi-calendar3"></i> <strong>Project Date:</strong> ${project.date || ''}</li>
          <li><i class="bi bi-envelope"></i> <strong>Contact:</strong> <a href="mailto:${(await fetchJson('data/contact.json')).email}">${(await fetchJson('data/contact.json')).email}</a></li>
          <li><i class="bi bi-github"></i> <strong>Repository:</strong> ${project.repo ? `<a href="${project.repo}" target="_blank">View Source Code</a>` : 'N/A'}</li>
          <li><i class="bi bi-globe"></i> <strong>Live Demo:</strong> ${project.url ? `<a href="${project.url}" target="_blank">View Demo</a>` : 'N/A'}</li>
        `;
      }

      // Description and features
      const desc = document.querySelector('.portfolio-description .lead');
      if (desc) desc.textContent = project.description || '';
      const featuresGrid = document.querySelector('.features-grid .row');
      if (featuresGrid && project.features) {
        // Replace feature cards with simple bullet list if needed
        featuresGrid.innerHTML = `
          <div class="col-12">
            <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
        `;
      }

      // Tech stack badges
      const techIcons = document.querySelector('.tech-stack .tech-icons');
      if (techIcons && project.tech) {
        const iconMap = {
          'React': '<i class="bi bi-lightning-charge"></i>',
          'ReactJS': '<i class="bi bi-lightning-charge"></i>',
          'Next.js': '<i class="bi bi-box"></i>',
          'NextJS': '<i class="bi bi-box"></i>',
          'Express': '<i class="bi bi-node-plus"></i>',
          'ExpressJS': '<i class="bi bi-node-plus"></i>',
          'MongoDB': '<i class="bi bi-database"></i>',
          'MySQL': '<i class="bi bi-database"></i>',
          'TailwindCSS': '<i class="bi bi-brush"></i>',
          'Bootstrap': '<i class="bi bi-bootstrap"></i>',
          'JWT': '<i class="bi bi-shield-lock"></i>',
          'Cloud Storage': '<i class="bi bi-cloud"></i>'
        };
        techIcons.innerHTML = project.tech.map(t => `<span class=\"tech-badge\">${iconMap[t] || '<i class=\"bi bi-gear\"></i>'} ${t}</span>`).join('');
      }

      // Re-init swiper
      initSwiper();
    } catch (e) {
      console.error(e);
    }
  }

  window.addEventListener('load', loadPortfolioDetails);

})();