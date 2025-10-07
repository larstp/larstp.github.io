import { getMainTitleHTML } from "./utils/mainTitle.js";
import { createContactSection } from "./utils/contactForm.js";

document.addEventListener("DOMContentLoaded", function () {
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

  const projects = createProjectsSection();
  main.appendChild(projects);

  const contact = createContactSection();
  main.appendChild(contact);

  setTimeout(() => {
    projects.classList.add("projects-fade-in");
  }, 2500);

  setTimeout(() => {
    contact.classList.add("contact-fade-in");
  }, 3000);

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
    contactBtn.className = "portfolio-btn contact-btn";
    const contactIcon = document.createElement("img");
    contactIcon.src = "public/assets/icons/material-symbols_mail-rounded.svg";
    contactIcon.alt = "Contact icon";
    contactIcon.className = "btn-icon";
    contactBtn.appendChild(contactIcon);
    contactBtn.appendChild(document.createTextNode("Contact me"));

    contactBtn.addEventListener("click", function () {
      window.location.href = "./src/pages/contact.html";
    });

    const githubBtn = document.createElement("button");
    githubBtn.className = "portfolio-btn github-btn";
    const githubIcon = document.createElement("img");
    githubIcon.src = "public/assets/icons/mdi_github.svg";
    githubIcon.alt = "GitHub icon";
    githubIcon.className = "btn-icon";
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

  function createProjectsSection() {
    const section = document.createElement("section");
    section.className = "projects-section projects-fade";

    const textContainer = document.createElement("div");
    textContainer.className = "projects-text";
    const heading = document.createElement("h3");
    heading.textContent = "Featured Projects";
    const desc = document.createElement("p");
    desc.textContent =
      "A few of my favorite web projects. Click a card to view the live site.";
    textContainer.appendChild(heading);
    textContainer.appendChild(desc);

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "projects-cards";

    const projects = [
      {
        title: "Astro Gallery",
        url: "https://astro.larstp.dev/",
        img: "public/assets/images/astro-gallery-thumb.jpg",
        alt: "Astro Gallery screenshot",
      },
      {
        title: "Film Portfolio",
        url: "https://film.larstp.dev/",
        img: "public/assets/images/film-portfolio-thumb.jpg",
        alt: "Film Portfolio screenshot",
      },
      {
        title: "Weather App",
        url: "https://weather.larstp.dev/",
        img: "public/assets/images/weather-app-thumb.jpg",
        alt: "Weather App screenshot",
      },
    ];
    projects.forEach((proj) => {
      const card = document.createElement("a");
      card.className = "project-card";
      card.href = proj.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = proj.img;
      img.alt = proj.alt;
      img.className = "project-card-img";

      const title = document.createElement("div");
      title.className = "project-card-title";
      title.textContent = proj.title;

      card.appendChild(img);
      card.appendChild(title);
      cardsContainer.appendChild(card);
    });

    section.appendChild(textContainer);
    section.appendChild(cardsContainer);
    return section;
  }
});
