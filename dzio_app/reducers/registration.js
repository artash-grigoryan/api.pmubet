import { constants } from './constants.js';

export function registration(state = {}, action) {
    switch (action.type) {
        case constants.REGISTER_REQUEST:
            return { registering: true };
        case constants.REGISTER_SUCCESS:
            return {};
        case constants.REGISTER_FAILURE:
            return { success: false, message: action.error.response.data.message};
        default:
            return state
    }
}