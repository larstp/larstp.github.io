// mainTitle.js
// Inserts and animates the main heading, then dispatches an event when done

document.addEventListener("DOMContentLoaded", function () {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Create the animated heading
  const section = document.createElement("section");
  section.className = "main-title-anim start";

  const inner = document.createElement("div");
  inner.className = "main-title-inner";

  const h1 = document.createElement("h1");
  h1.textContent = "Lars Torp Pettersen";

  const h2 = document.createElement("h2");
  h2.className = "FED";
  h2.innerHTML = "Front End Developer";

  inner.appendChild(h1);
  inner.appendChild(h2);
  section.appendChild(inner);
  main.appendChild(section);

  // Responsive animation: calculate final Y offset based on viewport
  setTimeout(() => {
    // Desired final top offset (in px) from top of viewport
    const finalOffset = 60; // adjust as needed

    // Get the current bounding rect (centered)
    const rect = section.getBoundingClientRect();
    const startY = rect.top;

    // Calculate the Y translation needed to move the top of the heading to finalOffset
    const deltaY = finalOffset - startY;

    // Set up the initial transform (centered)
    section.style.transform = `translate(-50%, 0px) scale(1.05)`;
    // Force reflow to ensure the browser applies the initial state
    void section.offsetWidth;

    // Animate to the final position
    section.style.transition = "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)";
    section.classList.remove("start");
    section.style.transform = `translate(-50%, ${deltaY}px) scale(0.92)`;

    // After animation, switch to static positioning so it flows with content
    section.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "transform") {
        section.classList.add("flow");
        section.style.transform = "none";
        section.style.transition = "none";
        document.dispatchEvent(new CustomEvent("mainTitleAnimationDone"));
        section.removeEventListener("transitionend", handler);
      }
    });
  }, 900);
});
