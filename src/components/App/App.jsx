// Importing
import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

import InfoPopup from '../InfoPopup/InfoPopup';
import LoadingPopup from '../LoadingPopup/LoadingPopup';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies'
import Movies from '../Movies/Movies';
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Header from '../Header/Header';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import moviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';

import './App.css';

function App() {

  // Стейтс

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [popup, setPopup] = React.useState({});
  const [mainApi, setMainApi] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [numberOfInitialMovies, setNumberOfInitialMovies] = React.useState(0);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = React.useState(0);

  const [signInInitialValues, setSignInInitialValues] = React.useState({ email: '', pass: '' });
  const [signUpInitialValues, setSignUpInitialValues] = React.useState({ email: '', pass: '', name: '' });

  // Скачиваем изначальные фильмы и данные пользователя

  const fetchMovies = async () => {
    const movies = await moviesApi.getAllMovies();
    return movies;
  }

  const fetchUser = async (jwt) => {
    const user = await auth.checkToken(jwt);
    const mainApi = new MainApi(jwt);
    return { user, mainApi };
  }

  const fetchSavedMovies = async (mainApi) => {
    const savedMovies = await mainApi.getAllSavedMovies();
    return savedMovies;
  }

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const movies = await fetchMovies();
      setMovies(movies)
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg });
    } finally {
      setLoading(false);
    }
  }

  const getUserSpecificData = async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const { user, mainApi } = await fetchUser(jwt);
        if (mainApi && user) {
          setUser(user);
          setMainApi(mainApi);
          setLoggedIn(true);
          const savedMovies = await fetchSavedMovies(mainApi);
          setSavedMovies(savedMovies);
          navigate(location.pathname);
        }
      }
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllMovies();
    getUserSpecificData();
  }, []);

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

  // Работа с пользователем

  const handleRegister = async (password, email, name) => {
    try {
      setLoading(true);
      const { token } = await auth.register(password, email, name);
      localStorage.setItem('jwt', token);
      localStorage.setItem('req', '');
      localStorage.setItem('checkbox', 'false');
      await getUserSpecificData();
      setSignUpInitialValues({ pass: '', email: '', name: '' });
      setSignInInitialValues({ pass: '', email: '' });
      navigate('/movies');
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg });
      navigate('/signup');
      setSignUpInitialValues({ pass: '', email, name })
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (password, email) => {
    try {
      setLoading(true);
      const { token } = await auth.authorization(password, email);
      localStorage.setItem('jwt', token);
      localStorage.setItem('req', '');
      localStorage.setItem('checkbox', 'false');
      await getUserSpecificData();
      setSignUpInitialValues({ pass: '', email: '', name: '' });
      setSignInInitialValues({ pass: '', email: '' });
      navigate('/movies');
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg });
      navigate('/signin');
      setSignInInitialValues({ pass: '', email });
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('req');
    localStorage.removeItem('checkbox');
    setUser({});
    setLoggedIn(false);
    setMainApi({});
    navigate('/');
  }

  const handleProfileUpdate = (name, email) => {
    setLoading(true);
    mainApi.updateProfile(name, email)
      .then(res => {
        setUser({ name: res.name, email: res.email });
        handlePopupOpen({ code: 200, msg: 'Данные успешно изменены' });
      })
      .catch(err => {
        handlePopupOpen({ code: err.errorCode, msg: err.errorMsg });
      })
      .finally(() => { setLoading(false) })
  }

  // Работа с фильмами

  const handleSaveMovie = async (movie) => {
    try {
      const newSavedMoovie = await mainApi.saveMovie(movie);
      setSavedMovies([...savedMovies, newSavedMoovie].sort((a, b) => a.movieId - b.movieId));
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg })
    }
  }

  const handleDeleteMovie = async (movie) => {
    const _id = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId)._id;
    try {
      await mainApi.deleteMovie(_id);
      setSavedMovies(savedMovies.filter(savedMovie => savedMovie.movieId !== movie.movieId));
    } catch (err) {
      handlePopupOpen({ code: err.errorCode, msg: err.errorMsg })
    }
  }

  const isMovieSaved = (savedMovies, movie) => {
    return savedMovies.filter(item => item.movieId === movie.movieId).length !== 0;
  }

  // Работа с поиском

  const showOnlyShorts = (movies, checkbox) => {
    return movies.filter(movie => checkbox ? movie.duration < 40 : true);
  }

  const showSearch = (movies, word) => {
    return movies.filter(movie => {
      return movie.country.toLowerCase().includes(word.toLowerCase()) ||
        movie.director.toLowerCase().includes(word.toLowerCase()) ||
        movie.year.toLowerCase().includes(word.toLowerCase()) ||
        movie.description.toLowerCase().includes(word.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(word.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(word.toLowerCase());
    });
  }

  // Попап с ошибкой

  const handlePopupOpen = (res) => {
    setPopupOpen(true);
    setPopup(res);
  }

  const handlePopupClose = () => {
    setPopupOpen(false);
    setPopup({
      code: 0,
      msg: '',
    })
  }

  // Navigation

  const navigate = useNavigate();
  const location = useLocation();

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

  if (isLoading) return (<LoadingPopup isOpen={isLoading} />)

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
            <ProtectedRouteElement
              element={Movies}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              movies={movies}
              savedMovies={savedMovies}
              isMovieSaved={isMovieSaved}
              numberOfInitialMovies={numberOfInitialMovies}
              numberOfMoviesToAdd={numberOfMoviesToAdd}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}

              showOnlyShorts={showOnlyShorts}
              showSearch={showSearch}
              getAllMovies={getAllMovies}
            />
          } />

          <Route path="/saved-movies" element={<ProtectedRouteElement
            element={SavedMovies}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            movies={movies}
            savedMovies={savedMovies}
            isMovieSaved={isMovieSaved}
            numberOfInitialMovies={numberOfInitialMovies}
            numberOfMoviesToAdd={numberOfMoviesToAdd}
            handleDeleteMovie={handleDeleteMovie}

            showOnlyShorts={showOnlyShorts}
            showSearch={showSearch}
          />
          } />

          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            handleProfileUpdate={handleProfileUpdate}
            handleLogout={handleLogout}
          />} />

          <Route path="/signin" element={isLoggedIn ? <Navigate to='/profile' replace /> : <SignIn signInInitialValues={signInInitialValues} isLoading={isLoading} goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} handleLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to='/profile' replace /> : <SignUp signUpInitialValues={signUpInitialValues} isLoading={isLoading} goToLanding={goToLanding} goToLogin={goToLogin} goToRegistration={goToRegistration} handleRegister={handleRegister} />} />
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

        <InfoPopup isOpen={isPopupOpen} code={popup.code} msg={`${popup.code}. ${popup.msg}`} handlePopupClose={handlePopupClose} />

      </div >

    </CurrentUserContext.Provider >
  );
}

export default App;
