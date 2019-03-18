import {placeService} from './../services/place';
import {constants} from './../reducers/constants';

export const placeActions = {
    savePlace,
    getPlaces,
    autocomplete
};

export function autocomplete(input) {

    return (dispatch) => {

        dispatch(request({
            input
        }));
        let promise = placeService.autocomplete(input);
        if (promise) {
            promise.then(response => {
                    let predictions = response.data.places.predictions;
                    dispatch(success({
                        input,
                        predictions
                    }));
                },
                error => {
                    let message = error.response.data;
                    dispatch(failure({
                        message,
                        input
                    }));
                });
        }
    };

    function request(data) {
        return {type: constants.AUTOCOMPLETE_REQUEST, data};
    }

    function success(data) {
        return {type: constants.AUTOCOMPLETE_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.AUTOCOMPLETE_FAILURE, data};
    }
}

export function savePlace(input) {


    return (dispatch) => {

        dispatch(request({
            input
        }));
        let promise = placeService.savePlace(input);
        if (promise) {
            promise.then(response => {
                    let predictions = response.data;
                    dispatch(success({
                        input,
                        predictions
                    }));
                },
                error => {
                    let message = error.response.data;
                    dispatch(failure({
                        message,
                        input
                    }));
                });
        }
    };


    function request(data) {
        return {type: constants.CREATE_PLACE_REQUEST, data};
    }

    function success(data) {
        return {type: constants.CREATE_PLACE_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.CREATE_PLACE_FAILURE, data};
    }
}

export function getPlaces() {


    return (dispatch) => {

        dispatch(request({}));
        let promise = placeService.getPlaces();
        if (promise) {
            promise.then(response => {
                    let places = response.data.places;
                    dispatch(success({
                        places
                    }));
                },
                error => {
                    let message = error.response.data;
                    dispatch(failure({
                        message
                    }));
                });
        }
    };


    function request(data) {
        return {type: constants.GET_PLACES_REQUEST, data};
    }

    function success(data) {
        return {type: constants.GET_PLACES_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GET_PLACES_FAILURE, data};
    }
}