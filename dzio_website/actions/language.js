import {languageService} from './../services/language';
import {constants} from './../reducers/constants';

export const languageActions = {
    getLanguages
};

export function getLanguages() {

    return (dispatch) => {

        dispatch(request());
        let promise = languageService.getLanguages();
        if (promise) {
            promise.then(response => {
                    let languages = response.data;
                    dispatch(success({
                        languages
                    }));
                },
                error => {
                    let message = error.message;
                    dispatch(failure({
                        message
                    }));
                });
        }
    };


    function request() {
        return {type: constants.GET_LANGUAGES_REQUEST};
    }

    function success(data) {
        return {type: constants.GET_LANGUAGES_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GET_LANGUAGES_FAILURE, data};
    }
}