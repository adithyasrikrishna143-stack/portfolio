import { useEffect, useRef } from "react";

// Auto-scrolling infinite slider. rAF loop pauses when the section is
// offscreen (IntersectionObserver) and cleans up on unmount. Passive touch
// listeners; refs instead of querySelector.
export default function useSkillSlider({ speed = 0.8 } = {}) {
  const gridRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const totalScroll = grid.scrollWidth;
    const oneSet = totalScroll / 3;
    grid.scrollLeft = oneSet;

    let rafId = 0;
    let userScrolling = false;
    let userScrollTimer = 0;

    const updateActiveCard = () => {
      const cards = Array.from(grid.querySelectorAll(".skill-card-hover"));
      if (!cards.length) return;

      const gridRect = grid.getBoundingClientRect();
      const containerCenterX = gridRect.left + gridRect.width / 2;
      let closestCard = cards[0];
      let closestDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenterX - containerCenterX);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        card.classList.toggle("active", card === closestCard);
      });
    };

    const scheduleUpdate = () => {
      if (userScrollTimer) return;
      requestAnimationFrame(updateActiveCard);
    };

    const tick = () => {
      if (isVisibleRef.current && !userScrolling) {
        grid.scrollLeft += speed;
        if (grid.scrollLeft >= oneSet * 2) grid.scrollLeft -= oneSet;
        else if (grid.scrollLeft <= 0) grid.scrollLeft += oneSet;
      }
      updateActiveCard();
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      e.preventDefault();
      userScrolling = true;
      grid.scrollLeft += e.deltaY > 0 ? 80 : -80;
      updateActiveCard();
      clearTimeout(userScrollTimer);
      userScrollTimer = window.setTimeout(() => {
        userScrolling = false;
        userScrollTimer = 0;
      }, 1500);
    };

    const onTouchStart = () => {
      userScrolling = true;
      clearTimeout(userScrollTimer);
    };

    const onTouchEnd = () => {
      updateActiveCard();
      clearTimeout(userScrollTimer);
      userScrollTimer = window.setTimeout(() => {
        userScrolling = false;
        userScrollTimer = 0;
      }, 1500);
    };

    const onScroll = () => scheduleUpdate();

    grid.addEventListener("wheel", onWheel, { passive: false });
    grid.addEventListener("touchstart", onTouchStart, { passive: true });
    grid.addEventListener("touchend", onTouchEnd, { passive: true });
    grid.addEventListener("scroll", onScroll, { passive: true });

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => { isVisibleRef.current = entry.isIntersecting; });
            },
            { threshold: 0.05 },
          )
        : null;
    if (io) io.observe(grid);
    else isVisibleRef.current = true;

    updateActiveCard();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(userScrollTimer);
      grid.removeEventListener("wheel", onWheel);
      grid.removeEventListener("touchstart", onTouchStart);
      grid.removeEventListener("touchend", onTouchEnd);
      grid.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
    };
  }, [speed]);

  return { gridRef, isVisibleRef };
}
