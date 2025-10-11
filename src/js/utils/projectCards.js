export function createProjectCard(project, technologiesData) {
  try {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("role", "listitem");

    const img = document.createElement("img");
    img.src = project.image?.src || project.img;
    img.alt = project.image?.alt || project.alt;
    img.className = "project-card-img";

    img.onerror = function () {
      console.warn(`Failed to load image: ${this.src}`);
      this.src = "public/assets/images/placeholder.jpg";
      this.alt = "Image not available";
    };

    const content = document.createElement("div");
    content.className = "project-card-content";

    const title = document.createElement("h4");
    title.className = "project-card-title";
    title.textContent = project.title || "Untitled Project";

    const description = document.createElement("p");
    description.className = "project-card-description";
    description.textContent = project.description || "No description available";

    const tagsContainer = document.createElement("div");
    tagsContainer.className = "project-card-tags";

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
        } else {
          console.warn(`Technology '${tagKey}' not found in technologies data`);
        }
      });
    }

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "project-card-buttons";

    const liveBtn = document.createElement("a");
    liveBtn.className =
      "project-card-btn btn-base btn-clipped-sm btn-sm btn-primary live-btn";
    liveBtn.href = project.links?.live || project.liveUrl || "#";
    liveBtn.target = "_blank";
    liveBtn.rel = "noopener noreferrer";
    liveBtn.setAttribute(
      "aria-label",
      `View live site for ${project.title || "project"}`
    );

    const liveIcon = document.createElement("img");
    liveIcon.src = "public/assets/icons/material-symbols_link-rounded.svg";
    liveIcon.alt = "";
    liveIcon.setAttribute("aria-hidden", "true");
    liveIcon.className = "btn-icon-sm";

    liveBtn.appendChild(liveIcon);
    liveBtn.appendChild(document.createTextNode("Live link"));

    const repoBtn = document.createElement("a");
    repoBtn.className =
      "project-card-btn btn-base btn-clipped-sm btn-sm btn-secondary repo-btn";
    repoBtn.href = project.links?.repository || project.repoUrl || "#";
    repoBtn.target = "_blank";
    repoBtn.rel = "noopener noreferrer";
    repoBtn.setAttribute(
      "aria-label",
      `View repository for ${project.title || "project"}`
    );

    const repoIcon = document.createElement("img");
    repoIcon.src = "public/assets/icons/mdi_github.svg";
    repoIcon.alt = "";
    repoIcon.setAttribute("aria-hidden", "true");
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
  } catch (error) {
    console.error("Error creating project card:", error);
    const errorCard = document.createElement("div");
    errorCard.className = "project-card project-card-error";
    errorCard.innerHTML = "<p>Error loading project</p>";
    return errorCard;
  }
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
