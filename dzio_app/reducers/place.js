import { constants } from './constants.js';

export function place(state = {}, response) {
    switch (response.type) {

        case constants.CREATE_PLACE_REQUEST:

            return {
                saveClicked: false,
                placeUploading: true,
                input: response.data.input
            };
        case constants.CREATE_PLACE_SUCCESS:

            return {
                saveClicked: false,
                placeUploading: false,
                input: response.data.input,
                predictions: response.data.predictions
            };
        case constants.CREATE_PLACE_FAILURE:

            return {
                saveClicked: false,
                placeUploading: false,
                input: response.data.input,
                message: response.data.message
            };
        default:

            return state
    }
}