import { memo } from "react";

function Footer() {
  return (
    <footer className="footer text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h4>NextGen Devs</h4>
            <p>
              Freelance services available through NextGen Devs — frontend development,
              video editing, and creative digital solutions.
            </p>
            <p> NextGen Devs site is coming soon....!</p>
          </div>

          <div className="col-lg-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#business">Business Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h4>Contact</h4>
            <p>97059 45589</p>
            <p>editncode@gmail.com</p>
            <p>4-45 Natta Rameswaram, Penumatra Mandal, West Godavari dt, Andhra Pradesh, India</p>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4 pt-4 border-top">
          <p className="mb-0">© 2026 Edincode. All rights reserved.</p>
          <p className="mb-0">Designed by NextGen Devs.</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
