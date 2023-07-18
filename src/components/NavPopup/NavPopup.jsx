import React, { useEffect } from 'react';

import './NavPopup.css';

function NavPopup({ closeMenu, onMainClick, onMoviesClick, onSavedMoviesClick, onProfileClick }) {

    // Callbacks

    const closeButtonClick = (e) => {
        e.preventDefault();
        closeMenu();
    }

    const onMainClickAndClose = (e) => {
        e.preventDefault();
        onMainClick(e);
        closeMenu();
    }

    const onMoviesClickAndClose = (e) => {
        e.preventDefault();
        onMoviesClick(e);
        closeMenu();
    }

    const onSavedMoviesClickAndClose = (e) => {
        e.preventDefault();
        onSavedMoviesClick(e);
        closeMenu();
    }

    const onProfileClickAndClose = (e) => {
        e.preventDefault();
        onProfileClick(e);
        closeMenu();
    }

    // Render

    return (
        <div className='navigation-menu'>
            <nav className='navigation-menu__container'>
                <button className='navigation-menu__close' type='button' onClick={closeButtonClick}></button>
                <ul className='navigation-menu__menu'>
                    <li className='navigation-menu__item'><button className='navigation-menu__button' type='button' onClick={onMainClickAndClose}>Главная</button></li>
                    <li className='navigation-menu__item'><button className='navigation-menu__button' type='button' onClick={onMoviesClickAndClose}>Фильмы</button></li>
                    <li className='navigation-menu__item'><button className='navigation-menu__button' type='button' onClick={onSavedMoviesClickAndClose}>Сохраненные фильмы</button></li>
                    <li className='navigation-menu__item'><button className='navigation-menu__button navigation-menu__button_type_profile' type='button' onClick={onProfileClickAndClose}>Аккаунт</button></li>
                </ul>
            </nav >
        </div>
    )
}

export default NavPopup;
