import axios from './../helpers/axios';

export const bannerService = {
    getLast
};

function getLast(lang) {

    return axios.get('/api/' + lang + '/banner/last');
}
