import { memo } from "react";
import useScrollReveal from "../hooks/useScrollReveal.js";

const Card = memo(function Card({ className, title, text }) {
  return (
    <div className={`business-card ${className}`}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
});

function Business() {
  const ref = useScrollReveal();
  return (
    <section id="business" ref={ref}>
      <h2><b>Business Projects</b></h2>
      <div className="business-projects">
        <Card
          className="frontend"
          title="Frontend Development"
          text="Creating responsive, polished websites for businesses and personal brands using HTML, CSS, JavaScript."
        />
        <Card
          className="video"
          title="Video Editing"
          text="Professional video editing for social media, ads, and personal projects with smooth transitions and creative effects."
        />
      </div>
    </section>
  );
}

export default memo(Business);
