import { constants } from './constants.js';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { } : {loggedIn: false};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case constants.USER_INFO_REQUEST:

            return {
                loggingIn: true,
                user: action.user
            };
        case constants.USER_INFO_SUCCESS:

            return {
                loggedIn: true,
                user: action.user
            };
        case constants.USER_INFO_FAILURE:

            return {
                loggedIn: false,
                ...action
            };

        default:
            return state
    }
}