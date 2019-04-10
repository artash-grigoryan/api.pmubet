// import axios  from 'axios';
import axios  from './../helpers/axios';

export const reunionService = {
    getAll,
};

function getAll() {

    return axios.get('http://35.180.105.76:9200/api/reunion/all');
}