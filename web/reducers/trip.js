import { constants } from './constants.js';

export function trip(state = {}, response) {
    switch (response.type) {
        case constants.AUTOCOMPLETE_REQUEST:

            return {
                predictionsLoading: true,
                input: response.input
            };
        case constants.AUTOCOMPLETE_SUCCESS:

            return {
                predictionsLoading: false,
                input: response.input,
                predictions: response.predictions
            };
        case constants.AUTOCOMPLETE_FAILURE:

            return {
                predictionsLoading: false,
                input: response.input,
                message: response.message
            };
        default:

            return state
    }
}