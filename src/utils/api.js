//Предварительно - чтобы скачать 

class Api {

    getInitialCards() {
        return fetch('https://api.nomoreparties.co/beatfilm-movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => data.map(item => {
                return {
                    country: item.country,
                    director: item.director,
                    duration: item.duration,
                    year: item.year,
                    description: item.description,
                    image: 'https://api.nomoreparties.co/' + item.image.url,
                    trailerLink: item.trailerLink,
                    thumbnail: 'https://api.nomoreparties.co/' + item.image.url,
                    owner: {},
                    movieId: item.id,
                    nameRU: item.nameRU,
                    nameEN: item.nameEN,
                }
            }));
    }
}

const api = new Api();
export default api;

