import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ isLoading, movies, savedMovies, isMovieSaved, numberOfInitialMovies, numberOfMoviesToAdd, handleSaveMovie, handleDeleteMovie }) {

    // Render

    return (
        <main className='movies'>
            <SearchForm />
            {!isLoading && (<MoviesCardList
                typeMovieButton='save'
                moviesToRender={movies}

                numberOfInitialMovies={numberOfInitialMovies}
                numberOfMoviesToAdd={numberOfMoviesToAdd}

                isMovieSaved={isMovieSaved}
                savedMovies={savedMovies}

                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}

            />)}

        </main>
    );


}

export default Movies;