import { memo } from "react";
import useMobileMenu from "../hooks/useMobileMenu.js";

function Header() {
  const { isOpen, toggle, close, navRef, toggleRef } = useMobileMenu();

  return (
    <header>
      <div className="header-inner">
        <div>
          <h2><b>Editncode</b></h2>
        </div>
        <button
          ref={toggleRef}
          className={`menu-toggle${isOpen ? " open" : ""}`}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav>
          <ul
            ref={navRef}
            id="nav-list"
            className={isOpen ? "show" : undefined}
            onClick={close}
          >
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#business">Business Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);

