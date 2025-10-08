import { smoothScrollTo } from "./smoothScroll.js";

document.addEventListener("DOMContentLoaded", function () {
  const mobileHeader = document.createElement("header");
  mobileHeader.className = "mobile-header";

  const logoLink = document.createElement("a");
  logoLink.href = "/";
  logoLink.className = "header-logo-link";
  const logoImg = document.createElement("img");
  logoImg.src = "public/assets/icons/echo-logo-3.svg";
  logoImg.alt =
    "A mobile header logo I have used for everything for as long as I can remember";
  logoImg.className = "header-logo";
  logoLink.appendChild(logoImg);
  logoLink.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScrollTo(0);
  });

  const desktopHeader = document.createElement("header");
  desktopHeader.className = "desktop-header";

  const desktopLogoLink = document.createElement("a");
  desktopLogoLink.href = "/";
  desktopLogoLink.className = "header-logo-link";
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = "public/assets/icons/echo-logo-3.svg";
  desktopLogoImg.alt =
    "A desktop header logo I have used for everything for as long as I can remember";
  desktopLogoImg.className = "header-logo";
  desktopLogoLink.appendChild(desktopLogoImg);
  desktopLogoLink.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScrollTo(0);
  });

  const desktopNav = document.createElement("nav");
  desktopNav.className = "desktop-nav";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className = "desktop-nav-list";
  [
    { text: "Projects", href: "#projects" },
    { text: "Contact", href: "#contact" },
    { text: "GitHub", href: "https://github.com/larstp", target: "_blank" },
  ].forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.text;
    a.href = item.href;
    if (item.target) a.target = item.target;

    if (item.text === "Projects") {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const projectsSection = document.querySelector(".projects-section");
        if (projectsSection) {
          const targetY = projectsSection.offsetTop - 100;
          smoothScrollTo(targetY);
        }
      });
    }

    if (item.text === "Contact") {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const contactSection = document.querySelector(".contact-section");
        if (contactSection) {
          const targetY = contactSection.offsetTop - 100;
          smoothScrollTo(targetY);
        }
      });
    }

    li.appendChild(a);
    desktopNavList.appendChild(li);
  });
  desktopNav.appendChild(desktopNavList);

  desktopHeader.appendChild(desktopLogoLink);
  desktopHeader.appendChild(desktopNav);

  document.body.insertBefore(desktopHeader, document.body.firstChild);

  initScrollNavigation();

  const menuBtn = document.createElement("button");
  menuBtn.className = "header-menu-btn";
  menuBtn.setAttribute("aria-label", "Menu");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "menu-svg");
  svg.setAttribute("width", "32");
  svg.setAttribute("height", "32");
  svg.setAttribute("viewBox", "0 0 32 32");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "3");
  svg.setAttribute("stroke-linecap", "round");

  const topLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  topLine.setAttribute("class", "menu-line top");
  topLine.setAttribute("x1", "7");
  topLine.setAttribute("y1", "11");
  topLine.setAttribute("x2", "25");
  topLine.setAttribute("y2", "11");

  const bottomLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  bottomLine.setAttribute("class", "menu-line bottom");
  bottomLine.setAttribute("x1", "7");
  bottomLine.setAttribute("y1", "21");
  bottomLine.setAttribute("x2", "25");
  bottomLine.setAttribute("y2", "21");

  svg.appendChild(topLine);
  svg.appendChild(bottomLine);
  menuBtn.appendChild(svg);

  const dropdown = document.createElement("nav");
  dropdown.className = "header-dropdown";

  const navList = document.createElement("ul");
  navList.className = "header-nav-list";

  const navItems = [
    {
      text: "Projects",
      href: "#projects",
      icon: "public/assets/icons/streamline-ultimate_responsive-design-bold.svg",
      iconAlt: "Projects icon",
    },
    {
      text: "Contact",
      href: "#contact",
      icon: "public/assets/icons/material-symbols_mail-rounded.svg",
      iconAlt: "Contact icon",
    },
    {
      text: "GitHub",
      href: "https://github.com/larstp",
      target: "_blank",
      icon: "public/assets/icons/mdi_github.svg",
      iconAlt: "GitHub icon",
    },
  ];
  navItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    if (item.target) a.target = item.target;

    if (item.text === "Projects") {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const projectsSection = document.querySelector(".projects-section");
        if (projectsSection) {
          const targetY = projectsSection.offsetTop - 100;
          smoothScrollTo(targetY);
          menuOpen = false;
          dropdown.classList.remove("open");
          menuBtn.classList.remove("open");
          document.body.classList.remove("header-menu-open");
        }
      });
    }

    if (item.text === "Contact") {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const contactSection = document.querySelector(".contact-section");
        if (contactSection) {
          const targetY = contactSection.offsetTop - 100;
          smoothScrollTo(targetY);
          menuOpen = false;
          dropdown.classList.remove("open");
          menuBtn.classList.remove("open");
          document.body.classList.remove("header-menu-open");
        }
      });
    }

    const icon = document.createElement("img");
    icon.src = item.icon;
    icon.alt = item.iconAlt;
    icon.className = "dropdown-icon";
    a.appendChild(icon);

    const sep = document.createElement("span");
    sep.className = "dropdown-separator";
    a.appendChild(sep);

    const textNode = document.createElement("span");
    textNode.className = "dropdown-text";
    textNode.textContent = item.text;
    a.appendChild(textNode);

    li.appendChild(a);
    navList.appendChild(li);
  });
  dropdown.appendChild(navList);

  let menuOpen = false;
  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    menuOpen = !menuOpen;
    if (menuOpen) {
      dropdown.classList.add("open");
      menuBtn.classList.add("open");
      document.body.classList.add("header-menu-open");
    } else {
      dropdown.classList.remove("open");
      menuBtn.classList.remove("open");
      document.body.classList.remove("header-menu-open");
    }
  });

  mobileHeader.appendChild(logoLink);
  mobileHeader.appendChild(menuBtn);
  mobileHeader.appendChild(dropdown);

  document.body.insertBefore(mobileHeader, document.body.firstChild);

  function initScrollNavigation() {
    const sections = [
      { id: "projects", selector: ".projects-section" },
      { id: "contact", selector: ".contact-section" },
    ];

    const navLinks = {
      projects: document.querySelectorAll('a[href="#projects"]'),
      contact: document.querySelectorAll('a[href="#contact"]'),
    };

    let currentActiveSection = null;

    const observer = new IntersectionObserver(
      (entries) => {
        let newActiveSection = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            newActiveSection = entry.target.dataset.navSection;
          }
        });

        if (newActiveSection !== currentActiveSection) {
          Object.values(navLinks).forEach((links) => {
            links.forEach((link) => link.classList.remove("nav-active"));
          });

          if (newActiveSection && navLinks[newActiveSection]) {
            navLinks[newActiveSection].forEach((link) =>
              link.classList.add("nav-active")
            );
          }

          currentActiveSection = newActiveSection;
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-64px 0px -40% 0px",
      }
    );

    function observeSections() {
      sections.forEach((section) => {
        const element = document.querySelector(section.selector);
        if (element) {
          element.dataset.navSection = section.id;
          observer.observe(element);
        }
      });
    }

    observeSections();

    setTimeout(observeSections, 1000);

    setTimeout(observeSections, 2000);
  }
});
