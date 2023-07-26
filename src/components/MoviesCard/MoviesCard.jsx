import React from 'react';
import './MoviesCard.css';

function MoviesCard({ typeMovieButton, movie, isSaved, handleSaveMovie, handleDeleteMovie }) {

    // Hooks

    const [isActive, setActive] = React.useState(isSaved);

    // Callbacks

    const durationToString = (duration) => {
        const hours = Math.floor(duration / 60);
        const mins = duration % 60;
        return hours === 0 ? mins + 'm' : hours + 'h ' + mins + 'm';
    }

    const setButtonClass = () => {

        // if typeMovieButton - delete
        if (typeMovieButton === 'delete') {
            return 'card__delete';
        }

        // if typeMovieButton - select
        return `card__save ${isActive && 'card__save_active'}`;
    }

    const onClick = (e) => {
        e.preventDefault();
        setActive(!isActive);
        setButtonClass();

        if (isSaved) {
            handleDeleteMovie(movie)
        } else {
            handleSaveMovie(movie);
        }

    }

    return (
        <div className='card'>
            <div className='card__header'>
                <div className='card__about'>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    <p className='card__duration'>{durationToString(movie.duration)}</p>
                </div>
                <button className={setButtonClass()} type='button' onClick={onClick}></button>
            </div>
            <a className='card__link' href={movie.trailerLink} target='_blank' rel="noreferrer"><img className='card__image' src={movie.image} alt={movie.nameRU} /></a>
        </div>
    );
}

export default MoviesCard;
