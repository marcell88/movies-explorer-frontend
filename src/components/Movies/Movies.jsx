import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ isLoading, movies, savedMovies, isMovieSaved, numberOfInitialMovies,
    numberOfMoviesToAdd, handleSaveMovie, handleDeleteMovie, showOnlyShorts, showSearch, getAllMovies }) {

    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [isShortMoviesOnly, setIsShortMoviesOnly] = React.useState(false);
    const [request, setRequest] = React.useState('');
    const [isEmpty, setEmpty] = React.useState(false);

    React.useEffect(() => {
        const req = localStorage.getItem('req');
        const checkbox = isShortMoviesOnly ? isShortMoviesOnly : localStorage.getItem('checkbox') !== 'all';
        const newMoviesToRender = req === ''
            ? showOnlyShorts([...movies], checkbox)
            : showOnlyShorts(showSearch(movies, req), checkbox);
        setMoviesToRender(newMoviesToRender);

        if (newMoviesToRender.length === 0) {
            setEmpty(true);
        }
        else {
            setEmpty(false);
        }
    }, [movies, request, isShortMoviesOnly]);

    const handleSubmit = async (req, checkbox) => {
        await getAllMovies();
        setRequest(req);
        setIsShortMoviesOnly(checkbox);
        localStorage.setItem('req', req);
        localStorage.setItem('checkbox', checkbox ? 'short' : 'all');
    }

    const handleSearchFilter = (checkbox) => {
        setIsShortMoviesOnly(checkbox);
    }

    return (
        <main className='movies'>

            <SearchForm
                handleSearch={() => { }}
                handleSearchFilter={handleSearchFilter}
                handleSubmit={handleSubmit}
                initialSearch={localStorage.getItem('req')}
                initialCheckbox={localStorage.getItem('checkbox') !== 'all'}
            />

            {isEmpty && (
                <div className='movies__empty'>Ничего не найдено</div>
            )}


            <MoviesCardList
                typeMovieButton='save'
                moviesToRender={moviesToRender}

                numberOfInitialMovies={numberOfInitialMovies}
                numberOfMoviesToAdd={numberOfMoviesToAdd}

                isMovieSaved={isMovieSaved}
                savedMovies={savedMovies}

                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}

            />


        </main>
    );


}

export default Movies;