document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.className = "site-footer";

  const copyrightText = document.createElement("p");
  copyrightText.className = "footer-copyright";
  copyrightText.textContent =
    "© 2025 EDGEmedia - Lars Torp Pettersen. All rights reserved.";

  footer.appendChild(copyrightText);
});
