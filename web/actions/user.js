import {userService} from './../services/user';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const userActions = {
    login,
    logout,
    saveProfileInfo,
    register,
    getUserGroups,
    checkAuth
};

export function login(username, password) {

    return (dispatch) => {

        dispatch(request({username}));

        return userService.login(username, password)
            .then(user => {
                    let data = user.data;
                    dispatch(success(data));
                    if (data && data.token) {
                        localStorage.setItem('user', JSON.stringify(data));
                        cookie.set('token', data.token);
                    }
                },
                error => {
                    dispatch(failure(error.response.data));
                });
    };

    function request(user) {
        return {type: constants.LOGIN_REQUEST, ...user}
    }

    function success(user) {
        return {type: constants.LOGIN_SUCCESS, ...user}
    }

    function failure(error) {
        return {type: constants.LOGIN_FAILURE, ...error}
    }
}

export function getUserGroups(userId) {

    return (dispatch) => {

        dispatch(request({userId}));

        return userService.getUserGroups(userId)
            .then(response => {

                    let groups = response.data.groups;
                    dispatch(success({
                        groups
                    }));
                },
                error => {
                    dispatch(failure(error.response.data));
                });
    };

    function request(group) {
        return {type: constants.USER_GROUPS_REQUEST, group}
    }

    function success(group) {
        return {type: constants.USER_GROUPS_SUCCESS, group}
    }

    function failure(error) {
        return {type: constants.USER_GROUPS_FAILURE, ...error}
    }
}

function logout() {
    userService.logout();
    document.cookie = "token" + '=; Max-Age=0';
    return {type: constants.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        return userService.register(user)
            .then(user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) {
        return {type: constants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: constants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: constants.REGISTER_FAILURE, error}
    }
}

function saveProfileInfo(formData) {
    return dispatch => {
        dispatch(request(formData));

        return userService.saveProfileInfo(formData)
            .then(user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) {
        return {type: constants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: constants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: constants.REGISTER_FAILURE, error}
    }
}

function checkAuth() {

    return dispatch => {
        dispatch(request());
        let promise = userService.checkAuth();
        if (promise) {
            return promise.then(
                user => {
                    user = user.data;
                    dispatch(success(user));
                    if (user && user.token) {
                        localStorage.setItem('user', JSON.stringify(user));
                        cookie.set('token', JSON.stringify(user.token));
                    }
                },
                error => dispatch(failure(error))
            );
        }
    };

    function request() {
        return {type: constants.CHECK_AUTH_REQUEST}
    }

    function success(user) {
        return {type: constants.CHECK_AUTH_SUCCESS, user}
    }

    function failure(error) {
        return {type: constants.CHECK_AUTH_FAILURE, error}
    }
}