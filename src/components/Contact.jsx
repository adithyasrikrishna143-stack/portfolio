import { memo } from "react";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useWhatsappForm from "../hooks/useWhatsappForm.js";

const Sticker = memo(function Sticker() {
  return (
    <aside className="contact-sticker" aria-hidden="true">
      <div className="sticker-inner">
        <div className="sticker-badge">AS</div>
        <div className="sticker-details">
          <p className="sticker-title">Get in touch</p>
          <p className="sticker-line role">Video Editor • Frontend Developer</p>
          <p className="sticker-line"><a href="mailto:editncode@gmail.com">editncode@gmail.com</a></p>
          <p className="sticker-line">
            <a
              href="https://www.linkedin.com/in/adithya-sri-krishna-2b2608378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
          <p className="sticker-line">Bhimavaram</p>
        </div>
      </div>
    </aside>
  );
});

function Contact() {
  const ref = useScrollReveal();
  const sendWhatsapp = useWhatsappForm("+919705945589");

  return (
    <section id="contact" ref={ref}>
      <h2><b>Contact</b></h2>
      <div className="contact-row">
        <Sticker />
        <form className="contact-form" onSubmit={sendWhatsapp}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={5} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default memo(Contact);
