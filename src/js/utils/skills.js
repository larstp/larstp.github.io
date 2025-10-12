export function createSkillsSection() {
  const skillsSection = document.createElement("section");
  skillsSection.className = "skills-section skills-fade";
  skillsSection.setAttribute("aria-labelledby", "skills-heading");

  const heading = document.createElement("h3");
  heading.textContent = "Skills & Technologies";
  heading.className = "skills-heading";
  heading.id = "skills-heading";

  const subheading = document.createElement("p");
  subheading.textContent =
    "Technologies and tools I work with. Including programming, design, camera and film software.";
  subheading.className = "skills-subheading";

  const skillsContainer = document.createElement("div");
  skillsContainer.className = "skills-container";
  skillsContainer.setAttribute("role", "region");
  skillsContainer.setAttribute("aria-label", "Skills and technologies grid");

  const languagesSection = createSkillCategory(
    "Programming Languages",
    "languages",
    [{ name: "JavaScript", icon: "devicon_javascript.svg" }]
  );

  const frontendSection = createSkillCategory("Frontend", "frontend", [
    { name: "HTML5", icon: "logos_html-5.svg" },
    { name: "CSS3", icon: "logos_css-3.svg" },
  ]);

  const toolsSection = createSkillCategory("Tools & Development", "tools", [
    { name: "Git", icon: "devicon_git.svg" },
    { name: "VS Code", icon: "devicon_vscode.svg" },
    { name: "Figma", icon: "devicon_figma.svg" },
    { name: "Docker", icon: "material-icon-theme_docker.svg" },
  ]);

  const creativeSection = createSkillCategory("Creative Software", "creative", [
    { name: "Procreate", icon: "logo-procreate-icon.svg" },
    { name: "Photoshop", icon: "devicon_photoshop.svg" },
    { name: "Premiere Pro", icon: "skill-icons_premiere.svg" },
    { name: "Lightroom", icon: "logos_adobe-lightroom.svg" },
    { name: "DaVinci Resolve", icon: "simple-icons_davinciresolve.svg" },
    { name: "Affinity Designer", icon: "simple-icons_affinitypublisher.svg" },
    { name: "Affinity Photo", icon: "simple-icons_affinityphoto.svg" },
    { name: "RED Cinema Cameras", icon: "SHOTonRED_Small_transparent 1.svg" },
    { name: "Sony Cinema Cameras", icon: "sony-pro-logo.svg" },
    { name: "Arri Cinema Cameras", icon: "arri.svg" },
  ]);

  // ------------------------------------------------------------------Future categories (hidden by default)
  const backendSection = createSkillCategory("Backend", "backend", [], true);
  const frameworksSection = createSkillCategory(
    "Frameworks",
    "frameworks",
    [],
    true
  );

  skillsContainer.appendChild(languagesSection);
  skillsContainer.appendChild(frontendSection);
  skillsContainer.appendChild(toolsSection);
  skillsContainer.appendChild(creativeSection);
  skillsContainer.appendChild(backendSection);
  skillsContainer.appendChild(frameworksSection);

  skillsSection.appendChild(heading);
  skillsSection.appendChild(subheading);
  skillsSection.appendChild(skillsContainer);

  return skillsSection;
}

function createSkillCategory(title, categoryId, skills, hidden = false) {
  const category = document.createElement("div");
  category.className = `skill-category skill-category-${categoryId}`;
  if (hidden) {
    category.style.display = "none";
  }

  const categoryTitle = document.createElement("h4");
  categoryTitle.textContent = title;
  categoryTitle.className = "skill-category-title";

  const skillsGrid = document.createElement("div");
  skillsGrid.className = "skills-grid";

  skills.forEach((skill) => {
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item";
    skillItem.setAttribute("role", "img");
    skillItem.setAttribute("aria-label", `${skill.name} technology`);
    skillItem.setAttribute("title", skill.name);
    skillItem.setAttribute("tabindex", "0");

    const skillIcon = document.createElement("img");
    skillIcon.src = `public/assets/images/skills/${skill.icon}`;
    skillIcon.alt = "";
    skillIcon.setAttribute("aria-hidden", "true");
    skillIcon.className = "skill-icon";

    skillItem.appendChild(skillIcon);
    skillsGrid.appendChild(skillItem);
  });

  category.appendChild(categoryTitle);
  category.appendChild(skillsGrid);

  return category;
}
