// import axios  from 'axios';
import axios  from './../helpers/axios';

export const raceService = {
    getAll,
    getNext,
    getNextQ5,
};

function getAll() {

    return axios.get('http://35.180.105.76:9200/api/race/all');
}

function getNext() {

    return axios.get('http://35.180.105.76:9200/api/race/next');
}

function getNextQ5() {

    return axios.get('http://35.180.105.76:9200/api/race/nextQ5');
}