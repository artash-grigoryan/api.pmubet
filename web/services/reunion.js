// import axios  from 'axios';
import axios  from './../helpers/axios';

export const reunionService = {
    getAll,
    get,
};

function getAll(lang) {

    return axios.get('/api/'+lang+'/reunion/get/all');
}

function get(lang, date) {

    return axios.get('/api/'+lang+'/reunion/get/'+date);
}