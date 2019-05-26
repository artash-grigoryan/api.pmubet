// import axios  from 'axios';
import axios  from './../helpers/axios';

export const raceService = {
    get,
    getFirstByDate,
    getFirstByReunion,
    getNext,
    getNextQ5,
};

function get(date, reunionNumber, raceNumber) {

    return axios.get('/api/race/get/'+date+'/'+reunionNumber+'/'+raceNumber);
}

function getFirstByDate(date) {

    return axios.get('/api/race/get/'+date+'/first');
}

function getFirstByReunion(date, reunionNumber) {

    return axios.get('/api/race/get/'+date+'/'+reunionNumber+'/first');
}

function getNext() {

    return axios.get('/api/race/next');
}

function getNextQ5() {

    return axios.get('/api/race/nextQ5');
}