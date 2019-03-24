import { constants } from './constants.js';

export function languages(state = {}, response) {
    switch (response.type) {
        case constants.GET_LANGUAGES_REQUEST:

            return {
                loading: true,
                data: []
            };
        case constants.GET_LANGUAGES_SUCCESS:

            return {
                loading: false,
                data: response.data.languages
            };
        case constants.GET_LANGUAGES_FAILURE:

            return {
                loading: false,
                message: response.message,
                data: []
            };
        default:

            return state
    }
}