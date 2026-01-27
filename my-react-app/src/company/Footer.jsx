import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section">
          <h3>ZealousWeb Technologies Pvt. Ltd.</h3>
          <p>
            304, Abhishree Complex, Opp. Star Bazaar, Satellite Road,
            Ahmedabad,GJ 380015
          </p>
          <p>Sales: +91 01234 56789</p>
          <a href="#">hello@zealousweb.com</a>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press</a>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <a href="#">Products</a>
          <a href="#">Pricing</a>
          <a href="#">Case Studies</a>
          <a href="#">Testimonials</a>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">FAQs</a>
          <a href="#">Contact Support</a>
          <a href="#">Report a Bug</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
