import { getMainTitleHTML } from "./utils/mainTitle.js";
import { createContactSection } from "./utils/contactForm.js";
import { initScrollIndicator } from "./utils/scroller.js";
import { createProjectsSection } from "./utils/projectManager.js";

document.addEventListener("DOMContentLoaded", async function () {
  function smoothScrollTo(targetY, duration = 800) {
    const start = window.scrollY || window.pageYOffset;
    const distance = targetY - start;

    if (distance === 0) {
      return;
    }

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      const currentPosition = start + distance * ease;
      window.scrollTo(0, currentPosition);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }

  const main = document.getElementById("main-content");
  if (!main) return;

  const heroScene = document.createElement("div");
  heroScene.className = "hero-scene";

  const hero = document.createElement("section");
  hero.className = "title-hero";
  const titleContainer = document.createElement("div");
  titleContainer.className = "main-text";
  titleContainer.innerHTML = getMainTitleHTML();
  hero.appendChild(titleContainer);

  const portfolio = createScenePortfolioSection();

  const portfolioImage = createPortfolioImage();

  heroScene.appendChild(hero);
  heroScene.appendChild(portfolio);
  heroScene.appendChild(portfolioImage);

  main.appendChild(heroScene);

  // Use the new project manager
  const projects = await createProjectsSection();
  main.appendChild(projects);

  const contact = createContactSection();
  main.appendChild(contact);

  setTimeout(() => {
    projects.classList.add("projects-fade-in");
  }, 2500);

  setTimeout(() => {
    contact.classList.add("contact-fade-in");
  }, 3000);

  initScrollIndicator();

  function createScenePortfolioSection() {
    const portfolio = document.createElement("section");
    portfolio.className = "scene-portfolio";

    const left = document.createElement("div");
    left.className = "portfolio-left";

    const h3 = document.createElement("h3");
    h3.textContent = "Hi there";

    const p1 = document.createElement("p");
    p1.textContent =
      "I'm Lars, a cinematographer and avid astronomy enthusiast living in Oslo. I'm currently studying Front-End Development and UI/UX Design at NOROFF, where I'm working on building a solid foundation in HTML, CSS and JavaScript. I care greatly for all aspects of design, and I'm driven by a desire to create digital experiences that are both efficient and engaging. I am actively looking for opportunities to leverage my growing skills to solve real-world problems and contribute to a design-forward team.";

    const p2 = document.createElement("p");
    p2.textContent = "Let's build something stellar together.";

    const btnContainer = document.createElement("div");
    btnContainer.className = "portfolio-buttons";

    const contactBtn = document.createElement("button");
    contactBtn.className =
      "portfolio-btn btn-base btn-clipped btn-lg btn-primary contact-btn";
    const contactIcon = document.createElement("img");
    contactIcon.src = "public/assets/icons/material-symbols_mail-rounded.svg";
    contactIcon.alt = "Contact icon";
    contactIcon.className = "btn-icon-md";
    contactBtn.appendChild(contactIcon);
    contactBtn.appendChild(document.createTextNode("Contact me"));

    contactBtn.addEventListener("click", function () {
      const contactSection = document.querySelector(".contact-section");
      if (contactSection) {
        const targetY = contactSection.offsetTop - 100;
        smoothScrollTo(targetY);
      }
    });

    const githubBtn = document.createElement("button");
    githubBtn.className =
      "portfolio-btn btn-base btn-clipped btn-lg btn-secondary github-btn";
    const githubIcon = document.createElement("img");
    githubIcon.src = "public/assets/icons/mdi_github.svg";
    githubIcon.alt = "GitHub icon";
    githubIcon.className = "btn-icon-md";
    githubBtn.appendChild(githubIcon);
    githubBtn.appendChild(document.createTextNode("GitHub"));

    githubBtn.addEventListener("click", function () {
      window.open("https://github.com/larstp", "_blank");
    });

    btnContainer.appendChild(contactBtn);
    btnContainer.appendChild(githubBtn);

    left.appendChild(h3);
    left.appendChild(p1);
    left.appendChild(p2);
    left.appendChild(btnContainer);

    portfolio.appendChild(left);

    return portfolio;
  }

  function createPortfolioImage() {
    const imageContainer = document.createElement("div");
    imageContainer.className = "portfolio-image";
    const img = document.createElement("div");
    img.className = "portfolio-img-placeholder";
    img.textContent = "[Your Photo Here]";
    imageContainer.appendChild(img);
    return imageContainer;
  }
});
