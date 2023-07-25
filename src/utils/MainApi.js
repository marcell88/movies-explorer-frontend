import { SERVER_BASE_URL } from './server';

export default class MainApi {

    constructor(token = '') {
        this._baseUrl = SERVER_BASE_URL;
        this._token = token;
    }

    _statusCheck(res, str = '') {
        return res.ok
            ? res.json()
            : Promise.reject(`>>>> Ошибка - ${str}: ${res.status}`);
    }

    async getAllSavedMovies() {

        const res = await fetch(SERVER_BASE_URL + '/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${this._token}`
            },
        });

        const body = await res.json();

        return res.ok
            ? body
            : Promise.reject({ errorCode: res.status, errorMsg: body.message })

    }


}
