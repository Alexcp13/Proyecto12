import { NavLink } from "react-router-dom"
import "./Header.css"
import { useState } from "react";
import menuIcon from './assets/menu.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav>
                <ul className="desktop-menu">
                    <li>
                        <NavLink to="/" activeclassname="active">
                            Adivina el personaje
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rotateGame">Coloca las fotos en la posicion correcta</NavLink>
                    </li>
                    <li>
                        <NavLink to="/characters">Personajes</NavLink>
                    </li>
                </ul>
                <img src={menuIcon} className="hamburger-icon" onClick={toggleMenu} />
            </nav>
            {isOpen && (
                <div className="overlay" onClick={toggleMenu}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <ul>
                            <li>
                                <NavLink to="/" activeclassname="active" onClick={toggleMenu}>
                                    Adivina el personaje
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/rotateGame" onClick={toggleMenu}>Coloca las fotos en la posicion correcta</NavLink>
                            </li>
                            <li>
                                <NavLink to="/characters" onClick={toggleMenu}>Personajes</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;