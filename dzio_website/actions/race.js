import { raceService } from './../services/race';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const raceActions = {
    get,
    getFirstByDate,
    getFirstByReunion,
    getNext,
    getNextQ5
};

function get(date, reunionNumber, raceNumber) {

    return new Promise((resolve, reject) => {
        raceService.get(date, reunionNumber, raceNumber)
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

function getFirstByDate(date) {

    return new Promise((resolve, reject) => {
        raceService.getFirstByDate(date)
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

function getFirstByReunion(date, reunionNumber) {

    return new Promise((resolve, reject) => {
        raceService.getFirstByReunion(date, reunionNumber)
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

function getNext() {

    return new Promise((resolve, reject) => {
        raceService.getNext()
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

function getNextQ5() {

    return new Promise((resolve, reject) => {
        raceService.getNextQ5()
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