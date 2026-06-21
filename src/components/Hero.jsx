import { memo } from "react";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useTiltCard from "../hooks/useTiltCard.js";

function Hero() {
  const sectionRef = useScrollReveal();
  const tiltRef = useTiltCard();

  return (
    <section id="hero" ref={sectionRef}>
      <div className="text">
        <h1>
          <b>
            Hi, I'm<br />
            Adithya Sri Krishna
          </b>
        </h1>
        <p>
          Video Editor • Frontend Developer.<br /> I craft engaging video edits and build
          polished, accessible frontends.
        </p>
        <p>Email: <a href="mailto:editncode@gmail.com">editncode@gmail.com</a></p>
        <p>Location: Bhimavaram</p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/adithya-sri-krishna-2b2608378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noreferrer"
          >
            Profile
          </a>
        </p>
        <p><a href="#contact" className="btn-get-in-touch">Get in touch</a></p>
      </div>

      <div className="avatar-card">
        <div className="card" id="tilt-card" ref={tiltRef}>
          {/* PLACEHOLDER: replace public/assets/background.jpg with the real avatar */}
          <img src="/assets/background.jpg" alt="Avatar" decoding="async" />
          <div className="info">
            <h3>Adithya Sri Krishna</h3>
            <p>Video Editor • Frontend Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
