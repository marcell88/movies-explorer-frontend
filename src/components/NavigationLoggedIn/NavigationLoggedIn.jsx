import React, { useEffect } from 'react';
import NavPopup from '../NavPopup/NavPopup';

import './NavigationLoggedIn.css';

function NavigationLoggedIn({ onMoviesClick, onSavedMoviesClick, onProfileClick, onMainClick }) {

    //States

    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); }
    }, [])

    //Callbacks

    const handleButtonMenuOpen = () => {
        setMenuOpen(true);
    }

    const handleButtonMenuClose = () => {
        setMenuOpen(false);
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    // Render

    return (<nav className='navigation-loggedIn'>

        {
            windowWidth > 800
                ? (
                    <>
                        <ul className='navigation-loggedIn__container navigation-loggedIn__container_location_mid' >
                            <li className='navigation-loggedIn__item'><button className='navigation-loggedIn__button navigation-loggedIn__button_type_movies' onClick={onMoviesClick}>Фильмы</button></li>
                            <li className='navigation-loggedIn__item'><button className='navigation-loggedIn__button navigation-loggedIn__button_type_movies' onClick={onSavedMoviesClick}>Сохраненные фильмы</button></li>
                        </ul>
                        <ul className='navigation-loggedIn__container navigation-loggedIn__container_location_end' >
                            <li className='navigation-loggedIn__item'><button className='navigation-loggedIn__button navigation-loggedIn__button_type_profile' onClick={onProfileClick}>Аккаунт</button></li>
                        </ul>
                    </>
                )
                : (
                    <>
                        {isMenuOpen && <NavPopup closeMenu={handleButtonMenuClose} onMainClick={onMainClick} onMoviesClick={onMoviesClick} onSavedMoviesClick={onSavedMoviesClick} onProfileClick={onProfileClick} />}
                        < div className='navigation-loggedIn__container navigation-loggedIn__container_location_end'>
                            <button className='navigation-loggedIn__button navigation-loggedIn__button_type_menu' onClick={handleButtonMenuOpen}></button>
                        </div>
                    </>
                )
        }

    </nav >)
}

export default NavigationLoggedIn;
