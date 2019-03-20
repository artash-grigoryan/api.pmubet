import {criterionService} from './../services/criterion';
import {constants} from './../reducers/constants';

export const criterionActions = {
    getCriteria
};

export function getCriteria() {

    return (dispatch) => {

        dispatch(request());
        let promise = criterionService.getCriteria();
        if (promise) {
            promise.then(response => {
                    let criteria = response.data;
                    dispatch(success({
                        criteria
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
        return {type: constants.GET_CRITERIA_REQUEST};
    }

    function success(data) {
        return {type: constants.GET_CRITERIA_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GET_CRITERIA_FAILURE, data};
    }
}