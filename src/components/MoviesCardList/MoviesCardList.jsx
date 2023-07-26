import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ typeMovieButton, moviesToRender, numberOfInitialMovies, numberOfMoviesToAdd, isMovieSaved, savedMovies, handleSaveMovie, handleDeleteMovie }) {

    const [numberOfCardsToShow, setNumberOfCardsToShow] = React.useState(numberOfInitialMovies);
    const [cardsToShow, setCardsToShow] = React.useState([]);
    const [isMoreButtonShowed, setMoreButtonShowed] = React.useState(true);

    // Hooks

    React.useEffect(() => {
        setCardsToShow(moviesToRender.filter((item, index) => index < numberOfCardsToShow));
        setMoreButtonShowed(numberOfCardsToShow < moviesToRender.length);
    }, []);

    // Callbacks

    const showMoreCards = () => {
        setCardsToShow(moviesToRender.filter((item, index) => index < numberOfCardsToShow + numberOfMoviesToAdd));
        setMoreButtonShowed(numberOfCardsToShow + numberOfMoviesToAdd < moviesToRender.length);
        setNumberOfCardsToShow(numberOfCardsToShow + numberOfMoviesToAdd);
    }

    return (

        <div className='gallery'>

            <ul className='gallery__container'>
                {cardsToShow.map(item => (

                    <li className='gallery__card' key={item.movieId}>
                        <MoviesCard
                            typeMovieButton={typeMovieButton} //save or delete
                            isSaved={isMovieSaved(savedMovies, item)}
                            movie={item}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                        />
                    </li>


                ))}
            </ul>

            {isMoreButtonShowed && (
                <button className='gallery__more-button' type='button' onClick={showMoreCards}>Еще</button>
            )}

            {!isMoreButtonShowed && (
                <div className='gallery__footer'></div>
            )}

        </div>
    );
}

export default MoviesCardList;
