import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ movies, isLoading, savedMovies, isMovieSaved }) {

    // Render

    return (
        <main className='movies'>
            <SearchForm />

            {isLoading
                ? (<Preloader />)
                : (<MoviesCardList
                    typeMovieButton='delete'
                    moviesToRender={savedMovies}

                    numberOfInitialMovies={12}
                    numberOfMoviesToAdd={6}

                    isMovieSaved={isMovieSaved}
                    savedMovies={savedMovies}
                />)
            }

        </main>
    );


}

export default SavedMovies;