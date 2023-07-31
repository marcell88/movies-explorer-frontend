import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ movies, isLoading, savedMovies, isMovieSaved, numberOfInitialMovies, numberOfMoviesToAdd, handleDeleteMovie }) {

    return (
        <main className='movies'>
            <SearchForm />
            {!isLoading && (<MoviesCardList
                typeMovieButton='delete'
                moviesToRender={savedMovies}

                numberOfInitialMovies={numberOfInitialMovies}
                numberOfMoviesToAdd={numberOfMoviesToAdd}

                isMovieSaved={isMovieSaved}
                savedMovies={savedMovies}

                handleDeleteMovie={handleDeleteMovie}
            />)}
        </main>
    );


}

export default SavedMovies;