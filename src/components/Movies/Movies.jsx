import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ isLoading, movies, savedMovies, isMovieSaved, numberOfInitialMovies, numberOfMoviesToAdd, handleSaveMovie, handleDeleteMovie }) {

    const [moviesToRender, setMoviesToRender] = React.useState([]);

    React.useEffect(() => {
        setMoviesToRender([...movies]);
    }, [movies]);

    // Render

    return (
        <main className='movies'>
            <SearchForm />
            {!isLoading && (moviesToRender.length !== 0) && (<MoviesCardList
                typeMovieButton='save'
                moviesToRender={moviesToRender}

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