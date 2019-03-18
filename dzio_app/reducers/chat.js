import { constants } from './constants.js';

export function chat(state = {}, response) {
    switch (response.type) {
        case constants.GROUP_MESSAGES_REQUEST:

            return {
                loading: true,
                messages: null
            };
        case constants.GROUP_MESSAGES_SUCCESS:

            return {
                loading: false,
                messages: response.data.messages
            };
        case constants.GROUP_MESSAGES_FAILURE:

            return {
                loading: false,
                message: response.data.message
            };
        default:

            return state
    }
}