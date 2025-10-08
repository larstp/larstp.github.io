/**
 * Smooth scroll to a target Y position with custom easing
 * @param {number} targetY - Target scroll position
 * @param {number} duration - Animation duration in milliseconds
 */
export function smoothScrollTo(targetY, duration = 800) {
  const start = window.scrollY || window.pageYOffset;
  const distance = targetY - start;

  if (distance === 0) {
    return;
  }

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let startTime = null;

  function animateScroll(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    const currentPosition = start + distance * ease;
    window.scrollTo(0, currentPosition);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}
