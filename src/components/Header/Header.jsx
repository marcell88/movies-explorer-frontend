import { useNavigate } from 'react-router-dom';

import Navigation from '../Navigation/Navigation'

import logoPath from '../../images/logo.svg';
import './Header.css';

function Header({ isLanding, isLoggedIn, goToLanding, goToLogin, goToRegistration, goToMovies, goToSavedMovies, goToProfile }) {

    // Render

    return (

        <header className={`header ${isLanding && 'header_location_landing'}`}>

            <button
                className='header__logo-button'
                type='button'
                onClick={goToLanding}
            >
                <img className='header__logo-pic' src={logoPath} alt='Логотип' />
            </button>

            <Navigation
                isLoggedIn={isLoggedIn}
                goToLanding={goToLanding}
                goToLogin={goToLogin}
                goToRegistration={goToRegistration}
                goToMovies={goToMovies}
                goToSavedMovies={goToSavedMovies}
                goToProfile={goToProfile}
            />

        </header>

    );
}

export default Header;
