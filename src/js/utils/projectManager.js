// Project Manager - Easy project management system
import { createProjectCard, loadTechnologies } from "./projectCards.js";

/**
 * Load projects data from JSON file
 * @returns {Promise<Object>} Projects data with settings
 */
export async function loadProjectsData() {
  try {
    const response = await fetch("./src/data/projects.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load projects data:", error);
    return { projects: [], settings: {} };
  }
}

/**
 * Filter projects based on criteria
 * @param {Array} projects - Array of project objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered projects
 */
export function filterProjects(projects, filters = {}) {
  return projects.filter((project) => {
    // Filter by featured status
    if (
      filters.featured !== undefined &&
      project.featured !== filters.featured
    ) {
      return false;
    }

    // Filter by status
    if (filters.status && project.status !== filters.status) {
      return false;
    }

    // Filter by technology
    if (
      filters.technology &&
      !project.technologies.includes(filters.technology)
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Sort projects based on criteria
 * @param {Array} projects - Array of project objects
 * @param {string} sortBy - Field to sort by (dateCreated, title, etc.)
 * @param {string} sortOrder - 'asc' or 'desc'
 * @returns {Array} Sorted projects
 */
export function sortProjects(
  projects,
  sortBy = "dateCreated",
  sortOrder = "desc"
) {
  return [...projects].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // Handle date sorting
    if (sortBy === "dateCreated") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    if (sortOrder === "desc") {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  });
}

/**
 * Create projects section with data from JSON
 * @param {Object} options - Configuration options
 * @returns {Promise<HTMLElement>} Projects section element
 */
export async function createProjectsSection(options = {}) {
  const {
    showOnlyFeatured = true,
    maxProjects = null,
    customFilters = {},
    customSort = null,
  } = options;

  // Load data
  const projectsData = await loadProjectsData();
  const technologiesData = await loadTechnologies();

  let projects = projectsData.projects || [];

  // Apply filters
  const filters = {
    featured: showOnlyFeatured,
    status: "active",
    ...customFilters,
  };
  projects = filterProjects(projects, filters);

  // Apply sorting
  const sortBy =
    customSort?.by || projectsData.settings?.sortBy || "dateCreated";
  const sortOrder =
    customSort?.order || projectsData.settings?.sortOrder || "desc";
  projects = sortProjects(projects, sortBy, sortOrder);

  // Limit number of projects
  const maxCount =
    maxProjects ||
    projectsData.settings?.maxFeaturedProjects ||
    projects.length;
  projects = projects.slice(0, maxCount);

  // Create section
  const section = document.createElement("section");
  section.className = "projects-section projects-fade";

  const textContainer = document.createElement("div");
  textContainer.className = "projects-text";

  const heading = document.createElement("h3");
  heading.textContent = "Featured Projects";

  const desc = document.createElement("p");
  desc.textContent =
    "A curated selection of my latest projects showcasing modern web development techniques and creative problem-solving. Explore the live demos or check out the code.";

  textContainer.appendChild(heading);
  textContainer.appendChild(desc);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "projects-cards";

  // Create cards
  projects.forEach((project) => {
    const card = createProjectCard(project, technologiesData);
    cardsContainer.appendChild(card);
  });

  section.appendChild(textContainer);
  section.appendChild(cardsContainer);

  return section;
}

/**
 * Add a new project programmatically
 * @param {Object} projectData - Project data object
 * @returns {Promise<boolean>} Success status
 */
export async function addProject(projectData) {
  try {
    // This would typically be handled by your backend/CMS
    // For now, this is a template for the data structure
    const newProject = {
      id: projectData.id || generateProjectId(projectData.title),
      title: projectData.title,
      description: projectData.description,
      image: {
        src:
          projectData.image?.src ||
          "public/assets/images/placeholder-project.jpg",
        alt: projectData.image?.alt || `${projectData.title} screenshot`,
      },
      technologies: projectData.technologies || [],
      links: {
        live: projectData.links?.live || "",
        repository: projectData.links?.repository || "",
      },
      featured: projectData.featured || false,
      dateCreated:
        projectData.dateCreated || new Date().toISOString().split("T")[0],
      status: projectData.status || "active",
    };

    // In a real implementation, this would update the actual JSON file
    // For now, this provides a template for the data structure

    return true;
  } catch (error) {
    console.error("Failed to add project:", error);
    return false;
  }
}

/**
 * Generate a project ID from title
 * @param {string} title - Project title
 * @returns {string} Generated ID
 */
function generateProjectId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Validate project data structure
 * @param {Object} projectData - Project data to validate
 * @returns {Object} Validation result with errors if any
 */
export function validateProject(projectData) {
  const errors = [];

  if (!projectData.title) errors.push("Title is required");
  if (!projectData.description) errors.push("Description is required");
  if (!projectData.links?.live && !projectData.links?.repository) {
    errors.push("At least one link (live or repository) is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
