import { raceService } from './../services/race';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const raceActions = {
    get,
    getAll,
    getAllByDate,
    getFirstByDate,
    getFirstByReunion,
    getNext,
    getNextQ5
};

function get(lang, date, reunionNumber, raceNumber) {

    return new Promise((resolve, reject) => {
        raceService.get(lang, date, reunionNumber, raceNumber)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getAll(lang) {

    return new Promise((resolve, reject) => {
        raceService.getAll(lang)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getAllByDate(lang, date) {

    return new Promise((resolve, reject) => {
        raceService.getAllByDate(lang, date)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getFirstByDate(lang, date) {

    return new Promise((resolve, reject) => {
        raceService.getFirstByDate(lang, date)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getFirstByReunion(lang, date, reunionNumber) {

    return new Promise((resolve, reject) => {
        raceService.getFirstByReunion(lang, date, reunionNumber)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getNext(lang) {

    return new Promise((resolve, reject) => {
        raceService.getNext(lang)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}

function getNextQ5(lang) {

    return new Promise((resolve, reject) => {
        raceService.getNextQ5(lang)
            .then((response) => {

                if(response.data) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}