import { useEffect, useRef } from "react";

// rAF-throttled, GPU-accelerated, with full cleanup. Uses passive listeners.
export default function useTiltCard(strength = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform";
    el.style.transform = "translateZ(0)";

    let rafId = 0;
    let pending = null;

    const apply = () => {
      rafId = 0;
      if (!pending) return;
      const { rx, ry } = pending;
      el.style.transform = `translateZ(0) rotateX(${-rx}deg) rotateY(${ry}deg)`;
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      pending = {
        rx: ((y - cy) / cy) * strength,
        ry: ((x - cx) / cx) * strength,
      };
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pending = { rx: 0, ry: 0 };
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
}
