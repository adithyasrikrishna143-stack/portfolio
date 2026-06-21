import { useEffect, useRef } from "react";

export default function useScrollReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      options,
    );
    io.observe(node);
    return () => io.disconnect();
  }, [options]);

  return ref;
}
