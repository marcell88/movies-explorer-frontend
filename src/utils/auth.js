import { SERVER_BASE_URL } from './server.js'

const makeRequest = async (endpoint, method, body, token) => {

    const option = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (body) option.body = JSON.stringify(body);
    if (token) option.headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${SERVER_BASE_URL}${endpoint}`, option);
    const data = await res.json();

    return res.ok
        ? data
        : Promise.reject({ errorCode: res.status, errorMsg: data.message });

}

export const register = (password, email, name) => {
    return makeRequest('/signup', 'POST', { password, email, name }, null);
}

export const authorization = (password, email) => {
    return makeRequest('/signin', 'POST', { password, email }, null)
}

export const checkToken = (token) => {
    return makeRequest('/users/me', 'GET', null, token);
}
