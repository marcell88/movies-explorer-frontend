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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';

import './App.css';

function App() {

  // Стейтс

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [popup, setPopup] = React.useState({});

  const [moviesApi, setMoviesApi] = React.useState(new MoviesApi());
  const [mainApi, setMainApi] = React.useState({});

  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [numberOfInitialMovies, setNumberOfInitialMovies] = React.useState(0);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = React.useState(0);

  // Скачиваем изначальные фильмы

  React.useEffect(() => {
    setLoading(true);
    moviesApi.getAllMovies()
      .then(movies => {
        setMovies(movies);
      })
      .catch(err => { handlePopupOpen(err) })
      .finally(() => { setLoading(false) });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (Object.keys(mainApi).length !== 0) {
      mainApi.getAllSavedMovies()
        .then(movies => {
          setSavedMovies(movies);
        })
        .catch(err => { handlePopupOpen(err) })
        .finally(() => { setLoading(false) });
    }
  }, [mainApi]);

  // Слушаем размер экрана

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

  // Регистрация, авторизация и логуат

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoading(true);
      auth.checkToken(jwt)
        .then(res => {
          setLoggedIn(true);
          setUser({ name: res.name, email: res.email });
          setMainApi(new MainApi(jwt));
        })
        .catch(err => {
          handlePopupOpen(err);
        })
        .finally(() => { setLoading(false) })
    }
  }, []);

  const handleRegister = (password, email, name) => {
    setLoading(true);
    auth.register(password, email, name)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUser({ name, email });
        navigate('/');
        setMainApi(new MainApi(res.token));
      })
      .catch(err => {
        handlePopupOpen(err);
      })
      .finally(() => { setLoading(false) })
  }

  const handleLogin = (password, email) => {
    setLoading(true);
    auth.authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setMainApi(new MainApi(res.token));
        return auth.checkToken(res.token);
      })
      .then(res => {
        setUser({ name: res.name, email: res.email });
        navigate('/');
      })
      .catch(err => {
        handlePopupOpen(err);
      })
      .finally(() => { setLoading(false) })
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setMainApi({});
    navigate('/signin');
  }

  // Работа с пользователями

  const isMovieSaved = (savedMovies, movie) => {
    return savedMovies.filter(item => item.movieId === movie.movieId).length !== 0;
  }

  const handlePopupOpen = (err) => {
    setPopupOpen(true);
    setPopup(err);
  }

  const handlePopupClose = () => {
    setPopupOpen(false);
    setPopup({
      errorCode: 0,
      errorMsg: '',
    })
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

    <CurrentUserContext.Provider value={user}>

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

          <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
          <Route path="/signin" element={<SignIn goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} handleRegister={handleRegister} />} />
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

        <InfoPopup isOpen={isPopupOpen} code={popup.errorCode} msg={`${popup.errorCode}. ${popup.errorMsg}`} handlePopupClose={handlePopupClose} />

      </div>

    </CurrentUserContext.Provider  >
  );
}

export default App;
