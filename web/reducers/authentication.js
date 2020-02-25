import { constants } from './constants.js';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { } : {loggedIn: false};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
        case constants.CHECK_AUTH_REQUEST:

            return {
                loggingIn: true,
                user: action.user
            };
        case constants.LOGIN_SUCCESS:
        case constants.CHECK_AUTH_SUCCESS:

            return {
                loggedIn: true,
                user: action.user
            };
        case constants.LOGIN_FAILURE:
        case constants.CHECK_AUTH_FAILURE:
            return {loggedIn: false, ...action};
        case constants.LOGOUT:
            return {loggedIn: false, ...action};
        default:
            return state
    }
}