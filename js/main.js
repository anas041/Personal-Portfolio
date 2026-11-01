
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. SCROLL PROGRESS BAR
  ===================================== */

  const progressBar = document.querySelector(".scroll-progress span");

  function updateScrollProgress() {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  function closeMenu() {
    if (!nav || !menuToggle) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }


  /* =====================================
     3. REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".section-label, .section-heading, .about-text, " +
    ".about-meta, .project-card, .skill-item, " +
    ".tool-card, .workflow-line, .contact-layout"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  /* =====================================
     4. ROBOT GUIDE
  ===================================== */

  const guide = document.querySelector(".guide-bot");
  const guideBubble = document.querySelector(".guide-bubble");
  const guideMessage = document.querySelector(".guide-message");
  const botButton = document.querySelector(".bot-button");
  const dismissButton = document.querySelector(".guide-dismiss");

  const guideMessages = {
    home: "Hey! Welcome to my portfolio. I'm here to guide you around.",
    about: "I'm Mohammed Anas. Explore my background and development journey here.",
    work: "Check out my real projects, including Taste of Spicy and BAKIFY.",
    skills: "Here are the technologies and skills I use in my development work.",
    "ai-workflow": "I use AI tools and modern platforms to plan, build and deploy projects.",
    contact: "Interested in working together? Visit the contact section to reach me."
  };

  let guideVisible = true;
  let lastGuideMessage = "";

  function showGuideMessage(message) {
    if (!guideMessage || !guideBubble || !guideVisible) return;

    if (lastGuideMessage === message) return;

    lastGuideMessage = message;
    guideMessage.textContent = message;

    guideBubble.classList.remove("bubble-refresh");

    // Restart the bubble animation.
    void guideBubble.offsetWidth;

    guideBubble.classList.add("bubble-refresh");
  }

  if (botButton && guide) {
    botButton.addEventListener("click", () => {
      if (!guideVisible) {
        guideVisible = true;
        guide.classList.remove("minimised");

        showGuideMessage(
          "Welcome back! Choose a section and I'll show you around."
        );
      } else {
        showGuideMessage(
          "Explore my projects, skills and workflow. Thanks for visiting!"
        );
      }
    });
  }

  if (dismissButton && guide) {
    dismissButton.addEventListener("click", () => {
      guideVisible = false;
      guide.classList.add("minimised");
    });
  }


  /* =====================================
     5. CHANGE ROBOT MESSAGE ON SCROLL
  ===================================== */

  const guideSections = document.querySelectorAll(
    "[data-guide]"
  );

  if ("IntersectionObserver" in window && guideSections.length) {
    const guideObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const message =
              guideMessages[sectionId] ||
              entry.target.dataset.guide;

            showGuideMessage(message);
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    guideSections.forEach(section => {
      guideObserver.observe(section);
    });
  }


  /* =====================================
     6. ACTIVE NAVIGATION
  ===================================== */

  const pageSections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const activeSectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const activeId = entry.target.id;

          navLinks.forEach(link => {
            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${activeId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    pageSections.forEach(section => {
      activeSectionObserver.observe(section);
    });
  }


  /* =====================================
     7. SMOOTH ANCHOR SCROLLING
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      closeMenu();
    });
  });


  /* =====================================
     8. PROJECT IFRAME FALLBACK
  ===================================== */

  const projectFrames = document.querySelectorAll(
    ".real-preview iframe"
  );

  projectFrames.forEach(frame => {
    frame.addEventListener("error", () => {
      const preview = frame.closest(".real-preview");

      if (!preview) return;

      preview.classList.add("preview-error");
    });
  });


  /* =====================================
     9. CURRENT YEAR
  ===================================== */

  const footer = document.querySelector(".footer");

  if (footer) {
    const footerText = footer.querySelector("span");

    if (footerText) {
      footerText.textContent =
        `© ${new Date().getFullYear()} MOHAMMED ANAS`;
    }
  }


  /* =====================================
     10. PAGE READY
  ===================================== */

  document.body.classList.add("page-loaded");

  console.log("Mohammed Anas Portfolio Loaded Successfully.");

});
