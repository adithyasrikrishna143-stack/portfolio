import { memo } from "react";
import useScrollReveal from "../hooks/useScrollReveal.js";

function About() {
  const ref = useScrollReveal();
  return (
    <section id="about" ref={ref}>
      <h2><b>About Me</b></h2>
      <p>
        I am a creative technologist focused on beautiful, functional digital experiences.
        I combine video editing, motion storytelling, and modern frontend design to help
        brands connect with their audiences.
      </p>
      <div className="about-grid">
        <div className="about-card">
          <h3>What I do</h3>
          <p>
            I design responsive websites, craft motion-led content, and build intuitive
            user journeys that feel polished across screens.
          </p>
        </div>
        <div className="about-card">
          <h3>How I work</h3>
          <p>
            I start with strong planning, then deliver fast-loading frontends and video
            edits that communicate the goal clearly — whether it's promotion, storytelling,
            or brand growth.
          </p>
        </div>
        <div className="about-card">
          <h3>Why choose me</h3>
          <p>
            My work blends technical skill with visual storytelling, giving you both crisp
            interfaces and compelling visuals in one package.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
