import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ movies, isLoading, savedMovies, isMovieSaved,
    numberOfInitialMovies, numberOfMoviesToAdd, handleDeleteMovie, showOnlyShorts, showSearch }) {

    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [isShortMoviesOnly, setIsShortMoviesOnly] = React.useState(false);
    const [request, setRequest] = React.useState('');
    const [isEmpty, setEmpty] = React.useState(false);


    React.useEffect(() => {
        const newMoviesToRender = request === ''
            ? showOnlyShorts([...savedMovies], isShortMoviesOnly)
            : showOnlyShorts(showSearch(savedMovies, request), isShortMoviesOnly);
        setMoviesToRender(newMoviesToRender);

        if (newMoviesToRender.length === 0) {
            setEmpty(true);
        }
        else {
            setEmpty(false);
        }

    }, [savedMovies, request, isShortMoviesOnly]);

    const handleSearch = (req) => {
        setRequest(req);
    }

    const handleSearchFilter = (checkbox) => {
        console.log(checkbox);
        setIsShortMoviesOnly(checkbox);
    }

    return (
        <main className='movies'>
            <SearchForm
                handleSearch={handleSearch}
                handleSearchFilter={handleSearchFilter}
                handleSubmit={() => { }}
            />

            {isEmpty && (
                <div className='movies__empty'>Ничего нет</div>
            )}

            <MoviesCardList
                typeMovieButton='delete'
                moviesToRender={moviesToRender}

                numberOfInitialMovies={numberOfInitialMovies}
                numberOfMoviesToAdd={numberOfMoviesToAdd}

                isMovieSaved={isMovieSaved}
                savedMovies={savedMovies}

                handleDeleteMovie={handleDeleteMovie}
            />
        </main>
    );


}

export default SavedMovies;