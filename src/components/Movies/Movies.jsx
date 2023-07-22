import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ movies, isLoading, savedMovies, isMovieSaved, numberOfInitialMovies, numberOfMoviesToAdd }) {

    // Render

    return (
        <main className='movies'>
            <SearchForm />

            {isLoading
                ? (<Preloader />)
                : (<MoviesCardList
                    typeMovieButton='save'
                    moviesToRender={movies}

                    numberOfInitialMovies={numberOfInitialMovies}
                    numberOfMoviesToAdd={numberOfMoviesToAdd}

                    isMovieSaved={isMovieSaved}
                    savedMovies={savedMovies}
                />)
            }

        </main>
    );


}

export default Movies;