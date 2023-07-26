import { SERVER_BASE_URL } from './server';

export default class MainApi {

    constructor(token = '') {
        this._baseUrl = SERVER_BASE_URL;
        this._token = token;
    }

    async _makeRequest(endpoint, method, body, token) {

        const option = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (body) option.body = JSON.stringify(body);
        if (token) option.headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${this._baseUrl}${endpoint}`, option);
        const data = await res.json();

        return res.ok
            ? data
            : Promise.reject({ errorCode: res.status, errorMsg: data.message });

    }

    getAllSavedMovies() {
        return this._makeRequest('/movies', 'GET', null, this._token);
    }

    updateProfile(name, email) {
        return this._makeRequest('/users/me', 'PATCH', { name, email }, this._token);
    }

    saveMovie(movie) {
        return this._makeRequest('/movies', 'POST', movie, this._token);
    }

    deleteMovie(id) {
        return this._makeRequest('/movies' + '/' + id, 'DELETE', null, this._token);
    }

}
