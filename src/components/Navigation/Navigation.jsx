import { useNavigate } from 'react-router-dom';
import NavigationLoggedIn from '../NavigationLoggedIn/NavigationLoggedIn';
import './Navigation.css';

function Navigation({ isLoggedIn, goToLanding, goToLogin, goToRegistration, goToMovies, goToSavedMovies, goToProfile }) {

    // Render

    return isLoggedIn
        ? (<NavigationLoggedIn onMoviesClick={goToMovies} onSavedMoviesClick={goToSavedMovies} onProfileClick={goToProfile} onMainClick={goToLanding} />)
        : (
            <nav className='navigation' >
                <ul className='navigation__container navigation__container_location_end'>
                    <li className='navigation__item'><button className='navigation__button navigation__button_type_register' type='button' onClick={goToRegistration}>Регистрация</button></li>
                    <li className='navigation__item'><button className='navigation__button navigation__button_type_login' type='button' onClick={goToLogin}>Войти</button></li>
                </ul>
            </nav>
        )
}

export default Navigation;
