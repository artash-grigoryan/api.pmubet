// import axios  from 'axios';
import axios  from './../helpers/axios';

export const raceService = {
    get,
    getAll,
    getNext,
    getNextQ5,
};

function get(reunionID, raceNumber) {

    return axios.get('/api/race/get/'+reunionID+'/'+raceNumber);
}

function getAll() {

    return axios.get('/api/race/all');
}

function getNext() {

    return axios.get('/api/race/next');
}

function getNextQ5() {

    return axios.get('/api/race/nextQ5');
}