import {groupService} from './../services/group';
import {constants} from './../reducers/constants';

export const groupActions = {
    sendJoinRequest,
    acceptJoinRequest,
    cancelJoinRequest,
    getGroup,
    autoCompleteLocal,
    search,
    getGroups,
    saveTrip
};

export function sendJoinRequest(groupId) {

    return (dispatch) => {

        dispatch(request({
            groupId
        }));
        let promise = groupService.sendJoinRequest(groupId);

        return promise.then(response => {
                let data = response.data;
                dispatch(success({
                    data
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
        return {type: constants.JOIN_GROUP_REQUEST, data};
    }

    function success(data) {
        return {type: constants.JOIN_GROUP_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.JOIN_GROUP_FAILURE, data};
    }
}

export function acceptJoinRequest(groupId, userId) {

    return (dispatch) => {

        dispatch(request({
            groupId
        }));
        let promise = groupService.acceptJoinRequest(groupId, userId);

        return promise.then(response => {
                let data = response.data;
                dispatch(success({
                    data
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
        return {type: constants.JOIN_GROUP_REQUEST, data};
    }

    function success(data) {
        return {type: constants.JOIN_GROUP_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.JOIN_GROUP_FAILURE, data};
    }
}

export function cancelJoinRequest(groupId, userId) {

    return (dispatch) => {

        dispatch(request({
            groupId
        }));
        let promise = groupService.cancelJoinRequest(groupId, userId);

        return promise.then(response => {
                let data = response.data;
                dispatch(success({
                    data
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
        return {type: constants.JOIN_GROUP_REQUEST, data};
    }

    function success(data) {
        return {type: constants.JOIN_GROUP_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.JOIN_GROUP_FAILURE, data};
    }
}


export function getGroups() {


    return (dispatch) => {

        dispatch(request({}));
        let promise = groupService.getGroups();
        if (promise) {
            promise.then(response => {
                    let groups = response.data.groups;
                    dispatch(success({
                        groups
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
        return {type: constants.GET_GROUPS_REQUEST, data};
    }

    function success(data) {
        return {type: constants.GET_GROUPS_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GET_GROUPS_FAILURE, data};
    }
}

export function search(query) {

    return (dispatch) => {

        dispatch(request({query}));
        let promise = groupService.search(query);

        return promise.then(response => {
                let groups = response.data.groups;
                dispatch(success({
                    groups
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
        return {type: constants.SEARCH_GROUPS_REQUEST, data};
    }

    function success(data) {
        return {type: constants.SEARCH_GROUPS_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.SEARCH_GROUPS_FAILURE, data};
    }
}


export function autoCompleteLocal(query) {


    return (dispatch) => {

        dispatch(request({}));
        let promise = groupService.autoCompleteLocal(query);
        return promise.then(response => {
                let groups = response.data.groups;
                dispatch(success({
                    groups
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
        return {type: constants.LOCAL_AUTOCOMPLETE_REQUEST, data};
    }

    function success(data) {
        return {type: constants.LOCAL_AUTOCOMPLETE_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.LOCAL_AUTOCOMPLETE_FAILURE, data};
    }
}

export function getGroup(id) {


    return (dispatch) => {

        dispatch(request({}));
        let promise = groupService.getGroup(id);
        if (promise) {
            promise.then(response => {
                    let group = response.data.group;
                    dispatch(success({
                        group
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
        return {type: constants.GET_GROUP_REQUEST, data};
    }

    function success(data) {
        return {type: constants.GET_GROUP_SUCCESS, data};
    }

    function failure(data) {
        return {type: constants.GET_GROUP_FAILURE, data};
    }
}

export function saveTrip(input) {


    return (dispatch) => {

        dispatch(request({
            input
        }));
        let promise = groupService.saveTrip(input);

        return promise.then(response => {
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