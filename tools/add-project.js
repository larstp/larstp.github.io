#!/usr/bin/env node

/**
 * CLI Tool for Adding New Projects
 * Usage: node add-project.js
 *
 * This script helps to quickly add new projects to the portfolio-page
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function addProject() {
  console.log("🚀 Adding a new project to your portfolio!\n");

  try {
    const title = await ask("Project title: ");
    const description = await ask("Project description: ");
    const liveUrl = await ask("Live URL (optional): ");
    const repoUrl = await ask("Repository URL: ");
    const imageName = await ask("Image filename (in public/assets/images/): ");

    console.log("\nAvailable technologies:");
    console.log(
      "html, css, javascript, typescript, react, vue, tailwind, sass, nodejs, express, mongodb, postgresql, vite, webpack, figma, photoshop, git, netlify, vercel"
    );
    const techInput = await ask("Technologies (comma-separated): ");
    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const featured = await ask("Featured project? (y/n): ");

    const project = {
      id: generateId(title),
      title,
      description,
      image: {
        src: `public/assets/images/${imageName}`,
        alt: `${title} screenshot`,
      },
      technologies,
      links: {
        live: liveUrl || "",
        repository: repoUrl,
      },
      featured: featured.toLowerCase() === "y",
      dateCreated: new Date().toISOString().split("T")[0],
      status: "active",
    };

    const projectsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "projects.json"
    );
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

    projectsData.projects.push(project);

    projectsData.projects.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    );

    fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

    console.log("\n✅ Project added successfully!");
    console.log("📄 Project data:");
    console.log(JSON.stringify(project, null, 2));
    console.log(
      "\n📂 Don't forget to add your project image to public/assets/images/"
    );
  } catch (error) {
    console.error("❌ Error adding project:", error.message);
  } finally {
    rl.close();
  }
}

addProject();
