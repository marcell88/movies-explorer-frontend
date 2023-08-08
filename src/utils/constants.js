export const SERVER_BASE_URL = 'https://api.themovies.nomoreparties.sbs';
export const SERVER_EXT_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const emailRegExp = /^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-.]{1,}\.[a-zA-Z]{2,5}$/.toString().slice(1, -1);


export const SHORT_MOVIE_MAX_DURATION = 40;

export const INITIAL_NUMBER_OF_CARDS = [
    {
        minWidth: 1100,
        number: 12,
    },
    {
        minWidth: 740,
        number: 8,
    },
    {
        minWidth: 0,
        number: 5,
    },
]

export const ADDITINAL_NUMBER_OF_CARDS = [
    {
        minWidth: 1100,
        number: 3,
    },
    {
        minWidth: 740,
        number: 2,
    },
    {
        minWidth: 0,
        number: 2,
    },
]