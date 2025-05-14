import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/components/Header.css";
import logo from "../../assets/images/logos/LogoMainRed.webp";
import logoHover from "../../assets/images/logos/LogoMainRed2.webp";

const Header = () => {
    const [showEmpresaDropdown, setShowEmpresaDropdown] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);

    const isEmpresaActive =
        location.pathname === "/logos" || location.pathname === "/contacto";

    useEffect(() => {
        setShowEmpresaDropdown(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowEmpresaDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleEmpresaDropdown = (e) => {
        e.preventDefault();
        setShowEmpresaDropdown(!showEmpresaDropdown);
    };

    return (
        <header className="header">
            <div className="header-inner">
                <nav className="nav-left">
                    <ul>
                        <li>
                            <NavLink
                                to="/sobre-nosotros"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Nosotros
                            </NavLink>
                        </li>
                        <li className="empresa-dropdown" ref={dropdownRef}>
                            <a
                                href="/"
                                onClick={toggleEmpresaDropdown}
                                className={
                                    showEmpresaDropdown || isEmpresaActive
                                        ? "active"
                                        : ""
                                }
                            >
                                Empresa
                            </a>
                            {showEmpresaDropdown && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li>
                                            <NavLink
                                                to="/logos"
                                                className={({ isActive }) =>
                                                    isActive ? "active" : ""
                                                }
                                            >
                                                Logos
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/contacto"
                                                className={({ isActive }) =>
                                                    isActive ? "active" : ""
                                                }
                                            >
                                                Contacto
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
                <NavLink to="/" className="logo">
                    <img
                        className="logo-default"
                        src={logo}
                        alt="Logo principal"
                    />
                    <img
                        className="logo-hover"
                        src={logoHover}
                        alt="Logo alterno"
                    />
                </NavLink>
                <nav className="nav-right">
                    <ul>
                        <li>
                            <NavLink
                                to="/equipos"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Equipos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/clips"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Contenido
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
