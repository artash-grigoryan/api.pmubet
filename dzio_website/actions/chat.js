import {groupService} from './../services/chat';
import {constants} from './../reducers/constants';

export const chatActions = {
    getMessages
};

export function getMessages(groupId) {

    return (dispatch) => {

        dispatch(request({
            groupId
        }));
        let promise = groupService.getMessages(groupId);

        return promise.then(response => {
                let data = response.data;

                dispatch(success({
                    ...data
                }));
            },
            error => {
                let message = error.response.data;
                dispatch(failure({
                    message
                }));
            });
    };


    function request(data) {
        return {type: constants.GROUP_MESSAGES_REQUEST, data};
    }

    function success(data) {
        return {type: constants.GROUP_MESSAGES_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GROUP_MESSAGES_FAILURE, data};
    }
}
