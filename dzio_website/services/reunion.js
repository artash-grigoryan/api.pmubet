// import axios  from 'axios';
import axios  from './../helpers/axios';

export const reunionService = {
    getAll,
};

function getAll() {

    return axios.get('/api/reunion/all');
}