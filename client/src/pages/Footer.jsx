import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/aboutUs" target="_blank">
          About us
        </Link>
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
