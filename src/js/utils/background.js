document.addEventListener("mousemove", function (e) {
  const bottom = document.querySelector(".logo-bg-bottom");
  const top = document.querySelector(".logo-bg-top");
  if (!bottom || !top) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
  const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
  bottom.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
  top.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
});
