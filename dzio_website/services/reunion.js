// import axios  from 'axios';
import axios  from './../helpers/axios';

export const reunionService = {
    getAll,
    get,
};

function getAll() {

    return axios.get('/api/reunion/get/all');
}

function get(date) {

    return axios.get('/api/reunion/get/'+date);
}