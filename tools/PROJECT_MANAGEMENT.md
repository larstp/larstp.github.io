# 🚀 Project Management System

## Overview

This portfolio uses a JSON-based project management system that makes adding new projects incredibly easy... I hope!

## 🎯 How Easy Is It Now?

### **Method 1: Manual JSON Edit (30 seconds)**

Just edit `src/data/projects.json` and add your project:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "description": "Brief description of what this project does",
  "image": {
    "src": "public/assets/images/my-project-thumb.jpg",
    "alt": "My New Project screenshot"
  },
  "technologies": ["html", "css", "javascript", "react"],
  "links": {
    "live": "https://my-project.dev/",
    "repository": "https://github.com/larstp/my-project"
  },
  "featured": true,
  "dateCreated": "2025-01-15",
  "status": "active"
}
```

### **Method 2: CLI Tool (1 minute)**

```bash
npm run add-project
```

Interactive prompts guide you through adding everything!

### **Method 3: GitHub Automation**

Set up the GitHub Action to auto-add projects when you push new repos!

## 📁 File Structure

```
src/data/
├── projects.json      # All project data
├── technologies.json  # Available tech tags with colors
```

## 🛠️ Available Technologies

The system includes pre-configured technologies with brand colors:

- **Languages**: HTML, CSS, JavaScript, TypeScript
- **Frameworks**: React, Vue.js, Express
- **Styling**: Tailwind CSS, Sass
- **Tools**: Vite, Webpack, Git
- **Design**: Figma, Photoshop
- **Deployment**: Netlify, Vercel
- **Databases**: MongoDB, PostgreSQL

Adding new technologies is as simple as updating `technologies.json`!

## 🎨 Features

### **Smart Filtering & Sorting**

- Automatically shows only featured projects
- Sorts by date (newest first)
- Can filter by technology, status, etc.

### **Backward Compatible**

- Works with your existing project data
- Gracefully handles both old and new data formats

### **Validation Tools**

```bash
npm run validate-data
```

Checks for:

- Missing required fields
- Invalid technology references
- Duplicate project IDs
- Missing image files

## 🤖 GitHub Automation Setup

1. **Copy the example workflow:**

   ```bash
   cp .github/workflows/auto-add-project.yml.example .github/workflows/auto-add-project.yml
   ```

2. **Trigger from any project repo:**
   ```bash
   curl -X POST \
     -H "Authorization: token YOUR_GITHUB_TOKEN" \
     https://api.github.com/repos/larstp/larstp.github.io/dispatches \
     -d '{
       "event_type": "add-project",
       "client_payload": {
         "title": "Amazing New Project",
         "description": "This project does amazing things",
         "technologies": ["html", "css", "javascript"],
         "live_url": "https://amazing.project.dev/",
         "repo_url": "https://github.com/larstp/amazing-project"
       }
     }'
   ```

## 📊 Project Data Schema

```typescript
interface Project {
  id: string; // Unique identifier
  title: string; // Display name
  description: string; // 1-2 sentence description
  image: {
    src: string; // Path to thumbnail image
    alt: string; // Alt text for accessibility
  };
  technologies: string[]; // Array of technology IDs
  links: {
    live?: string; // Live site URL (optional)
    repository: string; // GitHub repo URL
  };
  featured: boolean; // Show in featured section
  dateCreated: string; // YYYY-MM-DD format
  status: "active" | "archived"; // Project status
}
```

## 🎯 Adding Projects is Now...

- **30 seconds** for JSON edit
- **1 minute** with CLI tool
- **Fully automated** with GitHub Actions
- **Validated** automatically
- **Styled** consistently with your existing design

You can literally add a new project faster than it takes to write a commit message weeeee! 🚀
