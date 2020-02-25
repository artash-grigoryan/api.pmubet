import { constants } from './constants.js';

export function geoLocation(state = {}, response) {
    switch (response.type) {
        case constants.AUTOCOMPLETE_REQUEST:

            return {
                predictionsLoading: true,
                input: response.data.input
            };
        case constants.AUTOCOMPLETE_SUCCESS:

            return {
                predictionsLoading: false,
                input: response.data.input,
                predictions: response.data.predictions
            };
        case constants.AUTOCOMPLETE_FAILURE:

            return {
                predictionsLoading: false,
                input: response.data.input,
                message: response.data.message
            };
        default:

            return state
    }
}