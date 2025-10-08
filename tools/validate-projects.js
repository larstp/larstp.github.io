#!/usr/bin/env node

/**
 * Project Data Validation Tool
 * Usage: node validate-projects.js
 *
 * Validates projects.json and technologies.json for consistency
 */

import fs from "fs";
import path from "path";

function validateProjects() {
  console.log("🔍 Validating project data...\n");

  try {
    const projectsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "projects.json"
    );
    const techPath = path.join(
      process.cwd(),
      "src",
      "data",
      "technologies.json"
    );

    const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
    const techData = JSON.parse(fs.readFileSync(techPath, "utf8"));

    const availableTechs = Object.keys(techData.technologies);
    const projects = projectsData.projects;

    let errors = 0;
    let warnings = 0;

    console.log(`📊 Found ${projects.length} projects`);
    console.log(`🛠️  Found ${availableTechs.length} available technologies\n`);

    projects.forEach((project, index) => {
      console.log(`Checking project ${index + 1}: ${project.title}`);

      const required = ["id", "title", "description"];
      required.forEach((field) => {
        if (!project[field]) {
          console.log(`  ❌ Missing required field: ${field}`);
          errors++;
        }
      });

      if (!project.links?.live && !project.links?.repository) {
        console.log(`  ❌ Must have at least one link (live or repository)`);
        errors++;
      }

      if (project.image?.src) {
        const imagePath = path.join(process.cwd(), project.image.src);
        if (!fs.existsSync(imagePath)) {
          console.log(`  ⚠️  Image not found: ${project.image.src}`);
          warnings++;
        }
      }

      if (project.technologies) {
        project.technologies.forEach((tech) => {
          if (!availableTechs.includes(tech)) {
            console.log(`  ⚠️  Unknown technology: ${tech}`);
            warnings++;
          }
        });
      }

      const duplicates = projects.filter((p) => p.id === project.id);
      if (duplicates.length > 1) {
        console.log(`  ❌ Duplicate project ID: ${project.id}`);
        errors++;
      }

      console.log(`  ✅ Basic validation passed\n`);
    });

    console.log("📋 Validation Summary:");
    console.log(`✅ ${projects.length} projects validated`);
    console.log(`❌ ${errors} errors found`);
    console.log(`⚠️  ${warnings} warnings found`);

    if (errors === 0) {
      console.log("\n🎉 All projects are valid!");
    } else {
      console.log("\n🔧 Please fix the errors above");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Validation failed:", error.message);
    process.exit(1);
  }
}

validateProjects();
