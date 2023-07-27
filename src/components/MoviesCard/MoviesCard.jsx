import React from 'react';
import './MoviesCard.css';

function MoviesCard({ typeMovieButton, movie, isSaved, handleSaveMovie, handleDeleteMovie }) {

    // Hooks

    const [isActive, setActive] = React.useState(isSaved);
    const [isDeleting, setDeleting] = React.useState(false);

    // Callbacks

    const durationToString = (duration) => {
        const hours = Math.floor(duration / 60);
        const mins = duration % 60;
        return hours === 0 ? mins + 'm' : hours + 'h ' + mins + 'm';
    }

    const setButtonClass = () => {
        const modificatorForSave = `${isActive && 'card__save_active'}`;
        const modificatorForDelete = `${isDeleting && 'card__delete_deleting'}`;
        return typeMovieButton === 'delete' ? 'card__delete ' + modificatorForDelete : 'card__save ' + modificatorForSave;
    }

    const saveCard = async (e) => {
        e.preventDefault();
        setActive(!isActive);
        setButtonClass();
        await handleSaveMovie(movie);
    }

    const deleteCard = async (e) => {
        e.preventDefault();
        setDeleting(true);
        setActive(!isActive);
        setButtonClass();
        await handleDeleteMovie(movie);
        setDeleting(false);
    }

    return (
        <div className='card'>
            <div className='card__header'>
                <div className='card__about'>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    <p className='card__duration'>{durationToString(movie.duration)}</p>
                </div>
                <button className={setButtonClass()} type='button' onClick={isSaved ? deleteCard : saveCard}></button>
            </div>
            <a className='card__link' href={movie.trailerLink} target='_blank' rel="noreferrer"><img className='card__image' src={movie.image} alt={movie.nameRU} /></a>
        </div>
    );
}

export default MoviesCard;
