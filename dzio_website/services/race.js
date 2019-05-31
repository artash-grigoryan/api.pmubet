// import axios  from 'axios';
import axios  from './../helpers/axios';

export const raceService = {
    get,
    getAll,
    getAllByDate,
    getFirstByDate,
    getFirstByReunion,
    getNext,
    getNextQ5,
};

function get(lang, date, reunionNumber, raceNumber) {

    return axios.get('/api/'+lang+'/race/get/'+date+'/'+reunionNumber+'/'+raceNumber);
}

function getAll(lang) {

    return axios.get('/api/'+lang+'/race/get/all');
}

function getAllByDate(lang, date) {

    return axios.get('/api/'+lang+'/race/get/'+date);
}

function getFirstByDate(lang, date) {

    return axios.get('/api/'+lang+'/race/get/'+date+'/first');
}

function getFirstByReunion(lang, date, reunionNumber) {

    return axios.get('/api/'+lang+'/race/get/'+date+'/'+reunionNumber+'/first');
}

function getNext(lang) {

    return axios.get('/api/'+lang+'/race/get/next');
}

function getNextQ5(lang) {

    return axios.get('/api/'+lang+'/race/get/nextQ5');
}