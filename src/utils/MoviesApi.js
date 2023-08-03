import { SERVER_EXT_BASE_URL } from './server';

class MoviesApi {

    async getAllMovies() {

        const res = await fetch(SERVER_EXT_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const body = await res.json();

        return res.ok
            ? body.map(movie => {
                return {
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: 'https://api.nomoreparties.co/' + movie.image.url,
                    trailerLink: movie.trailerLink,
                    thumbnail: 'https://api.nomoreparties.co/' + movie.image.url,
                    //                    owner: {},
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                }
            })
            : Promise.reject({ errorCode: res.status, errorMsg: body.message })

    }
}

const moviesApi = new MoviesApi();

export default moviesApi;
