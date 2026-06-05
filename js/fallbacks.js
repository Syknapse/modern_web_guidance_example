/**
 * Fallbacks for browsers without CSS scroll-driven animation support.
 *
 * Each block is guarded by CSS.supports() — if the browser supports the native
 * CSS feature the block is skipped entirely. Native CSS is always preferred
 * for performance (compositor-thread animation, no JS event overhead).
 *
 * Guides consulted:
 *   scroll-progress-indicator    → scroll listener (ScrollTimeline fallback)
 *   shrinking-header-on-scroll   → scroll listener (ScrollTimeline fallback)
 *   scroll-entry-exit-effects    → IntersectionObserver (ViewTimeline fallback)
 *
 * Note from the guides: Do NOT use the scroll-timeline-polyfill package.
 * It is not feature-complete and has known issues.
 *
 * Note: parallax-scroll-effects is omitted — it is purely decorative and
 * the guide supports progressive enhancement (no fallback required).
 */

// ─── 1. Scroll progress bar ──────────────────────────────────────────────────
// Guide: scroll-progress-indicator
// Fires only if animation-timeline: scroll() is unsupported.

if (!CSS.supports('animation-timeline', 'scroll()')) {
  const progress = document.querySelector('#progress');

  if (progress) {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        progress.style.transform = `scaleX(${window.scrollY / scrollable})`;
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // set initial value
  }
}

// ─── 2. Shrinking header ─────────────────────────────────────────────────────
// Guide: shrinking-header-on-scroll
// Fires only if both animation-timeline AND animation-range are unsupported.

if (
  !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')
) {
  const header = document.querySelector('header');

  if (header) {
    const INITIAL_HEIGHT = 72;   // matches --header-height in variables.css
    const FINAL_HEIGHT   = 36;   // matches --header-height-shrunk
    const SCROLL_DISTANCE = 150; // matches animation-range end in header.css

    const update = () => {
      const progress = Math.min(1, window.scrollY / SCROLL_DISTANCE);
      const newHeight =
        INITIAL_HEIGHT - (INITIAL_HEIGHT - FINAL_HEIGHT) * progress;
      header.style.height = `${newHeight}px`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }
}

// ─── 3. Feature card entry / exit effects ────────────────────────────────────
// Guide: scroll-entry-exit-effects
// Fires only if animation-timeline: view() and animation-range: entry are unsupported.

if (
  !CSS.supports('(animation-timeline: view()) and (animation-range: entry)')
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Recreate the opacity + translateY effect using intersectionRatio.
        // This matches the CSS keyframes in feature-cards.css as closely as
        // a threshold-based IntersectionObserver can.
        const ratio = entry.intersectionRatio;
        entry.target.style.opacity = String(Math.min(1, ratio * 2));
        entry.target.style.transform = `translateY(${(1 - ratio) * 44}px)`;
      }
    },
    {
      // 101 thresholds from 0.00 to 1.00 gives a smooth transition
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    }
  );

  document.querySelectorAll('.feature-card').forEach((card) => {
    observer.observe(card);
  });
}
