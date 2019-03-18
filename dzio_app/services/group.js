// import axios  from 'axios';
import axios from './../helpers/axios';

export const groupService = {
    sendJoinRequest,
    acceptJoinRequest,
    cancelJoinRequest,
    saveTrip,
    getGroup,
    autoCompleteLocal,
    search,
    getGroups
};


function sendJoinRequest(groupId) {

    return axios.post('/api/group/' + groupId + '/join');
}

function acceptJoinRequest(groupId, userId) {

    return axios.post('/api/group/' + groupId + '/user/' + userId + '/accept');
}

function cancelJoinRequest(groupId, userId) {

    return axios.post('/api/group/' + groupId + '/user/' + userId + '/cancel');
}

function getGroups() {

    return axios.get('/api/groups');
}

function getGroup(id) {

    return axios.get('/api/group/' + id);
}

function saveTrip(data) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {

        return axios.put('/api/trip', data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        });
    }

    return false;
}

function autoCompleteLocal(data) {
    return axios.put('/api/trip', data);
}


function search(query) {

    return axios.get('/api/search/', query);
}