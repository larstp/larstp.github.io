document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.className = "site-footer";

  const copyrightText = document.createElement("p");
  copyrightText.className = "footer-copyright";

  const copyrightStart = document.createTextNode("© 2025 ");

  const edgeLink = document.createElement("a");
  edgeLink.href = "https://www.edgefilm.no";
  edgeLink.target = "_blank";
  edgeLink.rel = "noopener noreferrer";
  edgeLink.className = "footer-link";
  edgeLink.setAttribute(
    "aria-label",
    "Visit EDGEmedia website (opens in new tab)"
  );
  edgeLink.textContent = "EDGEmedia";

  const copyrightMiddle = document.createTextNode(" - Lars Torp Pettersen.");

  const lineBreak = document.createElement("br");

  const copyrightEnd = document.createTextNode(" All rights reserved.");

  copyrightText.appendChild(copyrightStart);
  copyrightText.appendChild(edgeLink);
  copyrightText.appendChild(copyrightMiddle);
  copyrightText.appendChild(lineBreak);
  copyrightText.appendChild(copyrightEnd);

  footer.appendChild(copyrightText);
});
