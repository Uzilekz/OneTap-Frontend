import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import "../../styles/components/Footer.css";
import logo from "../../assets/images/logos/LogoMainRed.webp";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content container">
                <div className="logo-section">
                    <Link to="/">
                        <img src={logo} alt="OneTap Esports" className="logo" />
                    </Link>
                </div>
                <div className="links-section">
                    <a
                        href="https://www.youtube.com/@OneTapEsports"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-button"
                    >
                        <GrYoutube size={24} />
                    </a>
                    <a
                        href="https://discord.gg/4tsfZ542Q8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-button"
                    >
                        <FaDiscord size={24} />
                    </a>
                </div>
                <div className="copyright">
                    <p>
                        &copy; {new Date().getFullYear()} OneTap Esports. Todos
                        los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
