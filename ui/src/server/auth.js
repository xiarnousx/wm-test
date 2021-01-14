require('dotenv').config();

const accessToken = 'token';
const uuidKey = 'uuid';

export function getToken() {
    return localStorage.getItem(accessToken);
}

export function getUuid() {
    return localStorage.getItem(uuidKey);
}

export function logout() {
    localStorage.removeItem(accessToken);
    localStorage.removeItem(uuidKey);
}

export async function login(username, password) {
    const response = await fetch(process.env.REACT_APP_REMOTE_LOGIN, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    });

    if (response.ok) {
        const { token, uuid } = await response.json();
        localStorage.setItem(accessToken, token);
        localStorage.setItem(uuidKey, uuid);
    }

    return response.ok;
}

export function isLoggedIn() {
    return !!localStorage.getItem(accessToken);
}