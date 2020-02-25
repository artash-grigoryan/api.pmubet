import { constants } from './constants.js';

export function criterion(state = {}, response) {
    switch (response.type) {
        case constants.GET_CRITERIA_REQUEST:

            return {
                criteriaLoading: true,
                data: []
            };
        case constants.GET_CRITERIA_SUCCESS:

            return {
                criteriaLoading: false,
                data: response.data.criteria
            };
        case constants.GET_CRITERIA_FAILURE:

            return {
                criteriaLoading: false,
                message: response.message,
                data: []
            };
        default:

            return state
    }
}