import axios  from 'axios';

export const placeService = {
    getPlaces,
    autocomplete,
    savePlace
};

function autocomplete(input) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {

        return axios.get(API_URL + '/api/autocomplete/' + input, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });
    }

    return false;
}


function savePlace(data) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {

        return axios.post(API_URL + '/api/place', data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                "Authorization": `Bearer ${user.token}`
            }
        });
    }

    return false;
}

function getPlaces() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {

        return axios.get(API_URL + '/api/places', {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });
    }

    return false;
}