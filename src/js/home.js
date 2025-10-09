import { getMainTitleHTML } from "./utils/mainTitle.js";
import { createContactSection } from "./utils/contactForm.js";
import { initScrollIndicator } from "./utils/scroller.js";
import { createProjectsSection } from "./utils/projectManager.js";
import { createSkillsSection } from "./utils/skills.js";
import { smoothScrollTo } from "./utils/smoothScroll.js";

document.addEventListener("DOMContentLoaded", async function () {
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

  const projects = await createProjectsSection();
  main.appendChild(projects);

  const skills = createSkillsSection();
  main.appendChild(skills);

  const contact = createContactSection();
  main.appendChild(contact);

  setTimeout(() => {
    projects.classList.add("projects-fade-in");
  }, 2500);

  setTimeout(() => {
    skills.classList.add("skills-fade-in");
  }, 3000);

  setTimeout(() => {
    contact.classList.add("contact-fade-in");
  }, 3500);

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
    p2.style.display = "flex";
    p2.style.alignItems = "center";
    p2.style.gap = "8px";

    const stellarText = document.createTextNode(
      "Let's build something stellar together!"
    );
    p2.appendChild(stellarText);

    const rocketIcon = document.createElement("img");
    rocketIcon.src =
      "public/assets/icons/streamline-ultimate_space-rocket-earth.svg";
    rocketIcon.alt = "Space rocket icon";
    rocketIcon.style.width = "24px";
    rocketIcon.style.height = "24px";
    rocketIcon.style.filter = "invert(1) brightness(2)";
    rocketIcon.style.flexShrink = "0";
    p2.appendChild(rocketIcon);

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
    const img = document.createElement("img");
    img.className = "portfolio-img-placeholder";
    img.src = "public/assets/images/DSC03075-2.webp";
    img.alt = "Lars Torp Pettersen - Portfolio photo";
    imageContainer.appendChild(img);
    return imageContainer;
  }
});
