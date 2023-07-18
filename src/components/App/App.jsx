// Importing
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import InfoPopup from '../InfoPopup/InfoPopup'

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from '../Movies/Movies';

import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Header from '../Header/Header';

import api from '../../utils/api';
import { user, TranslationContext } from '../../utils/user';

import './App.css';

function App() {

  // Hooks

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [numberOfInitialMovies, setNumberOfInitialMovies] = React.useState(0);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    api.getInitialCards()
      .then(movies => {
        setMovies(movies);
        setSavedMovies(movies.filter((item, index) => index < 5)); // Для верстки считаем первые 5 филдьом - залайканы
      })
      .catch(err => { console.log(err) })
      .finally(() => { setLoading(false) });
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  React.useEffect(() => {
    setNumberOfInitialMovies(screenWidth > 1100 ? 12 : (screenWidth > 740 ? 8 : 5));
    setNumberOfMoviesToAdd(screenWidth > 1100 ? 3 : 2);
  }, [screenWidth]);

  // Callbacks

  const isMovieSaved = (savedMovies, movie) => {
    return savedMovies.filter(item => item.movieId === movie.movieId).length !== 0;
  }

  // Navigation

  const navigate = useNavigate();

  const goToLanding = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/signin');
  }

  const goToRegistration = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  const goToMovies = (e) => {
    e.preventDefault();
    navigate('/movies');
  }

  const goToSavedMovies = (e) => {
    e.preventDefault();
    navigate('/saved-movies');
  }

  const goToProfile = (e) => {
    e.preventDefault();
    navigate('/profile');
  }

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  // Render

  return (

    <TranslationContext.Provider value={user}>

      <div className="page">

        {/* HEADER */}

        <Routes>

          <Route path="/" element={<Header isLanding={true} isLoggedIn={isLoggedIn}
            goToLanding={goToLanding}
            goToLogin={goToLogin}
            goToRegistration={goToRegistration}
            goToMovies={goToMovies}
            goToSavedMovies={goToSavedMovies}
            goToProfile={goToProfile} />}
          />

          <Route path="/movies" element={<Header isLanding={false} isLoggedIn={isLoggedIn}
            goToLanding={goToLanding}
            goToLogin={goToLogin}
            goToRegistration={goToRegistration}
            goToMovies={goToMovies}
            goToSavedMovies={goToSavedMovies}
            goToProfile={goToProfile} />}
          />

          <Route path="/saved-movies" element={<Header isLanding={false} isLoggedIn={isLoggedIn}
            goToLanding={goToLanding}
            goToLogin={goToLogin}
            goToRegistration={goToRegistration}
            goToMovies={goToMovies}
            goToSavedMovies={goToSavedMovies}
            goToProfile={goToProfile} />}
          />

          <Route path="/profile" element={<Header isLanding={false} isLoggedIn={isLoggedIn}
            goToLanding={goToLanding}
            goToLogin={goToLogin}
            goToRegistration={goToRegistration}
            goToMovies={goToMovies}
            goToSavedMovies={goToSavedMovies}
            goToProfile={goToProfile} />}
          />

          <Route path="*" element={<></>} />

        </Routes>

        {/* MAIN */}

        <Routes>

          <Route path="/" element={<Main />} />

          <Route path="/movies" element={
            <Movies
              movies={movies}
              isLoading={isLoading}
              savedMovies={savedMovies}
              isMovieSaved={isMovieSaved}
              numberOfInitialMovies={numberOfInitialMovies}
              numberOfMoviesToAdd={numberOfMoviesToAdd}
            />
          } />

          <Route path="/saved-movies" element={
            <SavedMovies
              movies={movies}
              isLoading={isLoading}
              savedMovies={savedMovies}
              isMovieSaved={isMovieSaved}
              numberOfInitialMovies={numberOfInitialMovies}
              numberOfMoviesToAdd={numberOfMoviesToAdd}
            />
          } />

          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} />} />
          <Route path="/signup" element={<SignUp goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} />} />
          <Route path="*" element={<PageNotFound goBack={goBack} />} />

        </Routes>

        {/* FOOTER */}

        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/movies" element={<Footer />} />
          <Route path="/saved-movies" element={<Footer />} />
          <Route path="*" element={<></>} />
        </Routes>

        {/* POPUPS */}

        <InfoPopup isOpen={isPopupOpen} code={401} msg='Forbidden' />

      </div>

    </TranslationContext.Provider  >
  );
}

export default App;
