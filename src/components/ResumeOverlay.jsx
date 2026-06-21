import { memo, useCallback, useEffect, useState } from "react";

// Mirrors the original resume overlay behaviour. Renders only when host
// markup (#resumeToggle / #resumeOverlay) is on the page; otherwise it's
// inert, matching the original script.js.
function ResumeOverlay() {
  const [open, setOpen] = useState(false);
  const [hasHost, setHasHost] = useState(false);

  useEffect(() => {
    setHasHost(
      !!document.getElementById("resumeToggle") ||
      !!document.getElementById("resumeOverlay"),
    );
  }, []);

  const openOverlay = useCallback(() => {
    setOpen(true);
    document.body.classList.add("show-resume");
  }, []);
  const closeOverlay = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("show-resume");
  }, []);

  useEffect(() => {
    if (!hasHost) return;
    const toggle = document.getElementById("resumeToggle");
    const close = document.getElementById("closeResume");
    const print = document.getElementById("printResume");

    const onToggle = (e) => { e.preventDefault(); openOverlay(); };
    const onPrint = () => {
      openOverlay();
      const t = setTimeout(() => window.print(), 200);
      return () => clearTimeout(t);
    };
    const onKey = (e) => {
      if (e.key === "Escape" && document.body.classList.contains("show-resume")) {
        closeOverlay();
      }
    };

    toggle && toggle.addEventListener("click", onToggle);
    close && close.addEventListener("click", closeOverlay);
    print && print.addEventListener("click", onPrint);
    document.addEventListener("keydown", onKey);

    return () => {
      toggle && toggle.removeEventListener("click", onToggle);
      close && close.removeEventListener("click", closeOverlay);
      print && print.removeEventListener("click", onPrint);
      document.removeEventListener("keydown", onKey);
    };
  }, [hasHost, openOverlay, closeOverlay]);

  if (!hasHost) return null;
  return null; // host markup owns rendering; this component only wires behaviour
}

export default memo(ResumeOverlay);
