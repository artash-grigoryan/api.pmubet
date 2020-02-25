// import axios  from 'axios';
import axios  from './../helpers/axios';

export const userService = {
    login,
    logout,
    saveProfileInfo,
    register,
    checkAuth,
    getUserGroups,
    getById
};

function login(username, password) {

    return axios.post('/api/auth', {username, password});
}

function logout() {
    localStorage.removeItem('user');
}

function checkAuth() {

    return axios.get('/api/checkAuth');
}

function getById(userId) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return axios.get('/api/user', {
            userId: userId,
        });
    }
}

function getUserGroups(userId) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return axios.get('/api/user/'+userId+'/groups');
    }
}

function saveProfileInfo(data) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {

        return axios.put('/api/profile/', data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        });
    }

    return false;
}

function register(user) {

    return axios.post('/api/registration', user);
}