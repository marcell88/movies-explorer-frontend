import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ typeMovieButton, moviesToRender, numberOfInitialMovies, numberOfMoviesToAdd, isMovieSaved, savedMovies }) {

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

        <section className='gallery'>

            <div className='gallery__container'>
                {cardsToShow.map(item => (

                    <MoviesCard key={item.movieId}
                        typeMovieButton={typeMovieButton} //save or delete
                        isSaved={isMovieSaved(savedMovies, item)}
                        movie={item}
                    />

                ))}
            </div>

            {isMoreButtonShowed && (
                <button className='gallery__more-button' onClick={showMoreCards} noValidate>Еще</button>
            )}

            {!isMoreButtonShowed && (
                <div className='gallery__footer'></div>
            )}

        </section>
    );
}

export default MoviesCardList;
