import { useCallback, useEffect, useRef, useState } from "react";

export default function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onDocClick(e) {
      if (toggleRef.current && toggleRef.current.contains(e.target)) return;
      if (navRef.current && navRef.current.contains(e.target)) return;
      setIsOpen(false);
    }
    document.addEventListener("click", onDocClick, { passive: true });
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return { isOpen, toggle, close, navRef, toggleRef };
}
