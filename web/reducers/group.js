import { constants } from './constants.js';

export function group(state = {}, response) {
    switch (response.type) {
        case constants.USER_GROUPS_REQUEST:
        case constants.GET_GROUPS_REQUEST:
        case constants.SEARCH_GROUPS_REQUEST:
        case constants.GET_GROUP_REQUEST:

            return {
                loading: true,
                gettingPlaces: true,
                places: null,
                groups: null
            };
        case constants.USER_GROUPS_SUCCESS:

            return {
                loading: false,
                groups: response.group.groups
            };
        case constants.USER_GROUPS_FAILURE:

            return {
                loading: false,
                message: response.message
            };
        case constants.GET_GROUP_SUCCESS:

            return {
                loading: false,
                group: response.data.group
            };
        case constants.GET_GROUP_FAILURE:

            return {
                loading: false,
                message: response.data.message
            };
        case constants.GET_GROUPS_SUCCESS:
        case constants.SEARCH_GROUPS_SUCCESS:

            return {
                loading: false,
                gettingPlaces: false,
                places: response.data.places || null,
                groups: response.data.groups || null,
                message: response.data.message
            };
        case constants.GET_GROUPS_FAILURE:
        case constants.SEARCH_GROUPS_FAILURE:

            return {
                loading: false,
                gettingPlaces: false,
                places: null,
                groups: null,
                message: response.data.message
            };
        default:

            return state
    }
}
export function join(state = {}, response) {
    switch (response.type) {
        case constants.JOIN_GROUP_REQUEST:

            return {
                loading: true
            };
        case constants.JOIN_GROUP_SUCCESS:

            return {
                loading: false,
                requestSent: true,
                message: response.data.message
            };
        case constants.JOIN_GROUP_FAILURE:

            return {
                loading: false,
                requestSent: false,
                message: response.data.message
            };

        default:

            return state
    }
}