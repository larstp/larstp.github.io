export function createScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-downs scroll-indicator";

  const mousey = document.createElement("div");
  mousey.className = "mousey";

  const scroller = document.createElement("div");
  scroller.className = "scroller";

  mousey.appendChild(scroller);
  scrollIndicator.appendChild(mousey);

  return scrollIndicator;
}

export function initScrollIndicator() {
  const scrollIndicator = createScrollIndicator();
  document.body.appendChild(scrollIndicator);

  let isAtTop = true;

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const newIsAtTop = scrollY < 100;

    if (newIsAtTop !== isAtTop) {
      isAtTop = newIsAtTop;

      if (isAtTop) {
        scrollIndicator.classList.add("show");
      } else {
        scrollIndicator.classList.remove("show");
      }
    }
  }

  // Initial check to set the correct state
  const initialScrollY = window.scrollY || window.pageYOffset;
  isAtTop = initialScrollY < 100;

  // Only show the indicator after delay if user is at the top
  setTimeout(() => {
    if (isAtTop) {
      scrollIndicator.classList.add("show");
    }
  }, 4000);

  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
  });

  // Initial check
  handleScroll();
}
