export function createProjectCard(project, technologiesData) {
  const card = document.createElement("div");
  card.className = "project-card";

  const img = document.createElement("img");
  // Handle both old and new data structures
  img.src = project.image?.src || project.img;
  img.alt = project.image?.alt || project.alt;
  img.className = "project-card-img";

  const content = document.createElement("div");
  content.className = "project-card-content";

  const title = document.createElement("h4");
  title.className = "project-card-title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-card-description";
  description.textContent = project.description;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "project-card-tags";

  // Handle both old (tags) and new (technologies) property names
  const techs = project.technologies || project.tags || [];
  if (techs && technologiesData) {
    techs.forEach((tagKey) => {
      const tech = technologiesData.technologies[tagKey];
      if (tech) {
        const tag = document.createElement("span");
        tag.className = "project-card-tag";
        tag.textContent = tech.name;
        tag.style.borderColor = tech.color + "60";
        tag.style.color = tech.color;
        tagsContainer.appendChild(tag);
      }
    });
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "project-card-buttons";

  // Live button
  const liveBtn = document.createElement("a");
  liveBtn.className =
    "project-card-btn btn-base btn-clipped-sm btn-sm btn-primary live-btn";
  // Handle both old and new data structures
  liveBtn.href = project.links?.live || project.liveUrl;
  liveBtn.target = "_blank";
  liveBtn.rel = "noopener noreferrer";

  const liveIcon = document.createElement("img");
  liveIcon.src = "public/assets/icons/material-symbols_link-rounded.svg";
  liveIcon.alt = "Open live site";
  liveIcon.className = "btn-icon-sm";

  liveBtn.appendChild(liveIcon);
  liveBtn.appendChild(document.createTextNode("Live link"));

  // Repo button
  const repoBtn = document.createElement("a");
  repoBtn.className =
    "project-card-btn btn-base btn-clipped-sm btn-sm btn-secondary repo-btn";
  // Handle both old and new data structures
  repoBtn.href = project.links?.repository || project.repoUrl;
  repoBtn.target = "_blank";
  repoBtn.rel = "noopener noreferrer";

  const repoIcon = document.createElement("img");
  repoIcon.src = "public/assets/icons/mdi_github.svg";
  repoIcon.alt = "View repository";
  repoIcon.className = "btn-icon-sm";

  repoBtn.appendChild(repoIcon);
  repoBtn.appendChild(document.createTextNode("Repo"));

  buttonsContainer.appendChild(liveBtn);
  buttonsContainer.appendChild(repoBtn);

  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(tagsContainer);
  content.appendChild(buttonsContainer);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

export async function loadTechnologies() {
  try {
    const response = await fetch("./src/data/technologies.json");
    return await response.json();
  } catch (error) {
    console.error("Failed to load technologies data:", error);
    return { technologies: {} };
  }
}
