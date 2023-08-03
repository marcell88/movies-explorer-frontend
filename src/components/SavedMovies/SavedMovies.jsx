import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ movies, isLoading, savedMovies, isMovieSaved,
    numberOfInitialMovies, numberOfMoviesToAdd, handleDeleteMovie, showOnlyShorts, showSearch }) {

    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [isShortMoviesOnly, setIsShortMoviesOnly] = React.useState(false);
    const [request, setRequest] = React.useState('');

    React.useEffect(() => {
        const newMoviesToRender = request === ''
            ? showOnlyShorts([...savedMovies], isShortMoviesOnly)
            : showOnlyShorts(showSearch(savedMovies, request), isShortMoviesOnly);
        setMoviesToRender(newMoviesToRender);
    }, [savedMovies, request, isShortMoviesOnly]);

    const handleSearch = (req) => {
        setRequest(req);
    }

    const handleSearchFilter = (checkbox) => {
        setIsShortMoviesOnly(checkbox);
    }

    return (
        <main className='movies'>
            <SearchForm
                handleSearch={handleSearch}
                handleSearchFilter={handleSearchFilter}
                handleSubmit={() => { }}
            />
            {!isLoading && (<MoviesCardList
                typeMovieButton='delete'
                moviesToRender={moviesToRender}

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