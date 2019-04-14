import { raceService } from './../services/race';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const raceActions = {
    get,
    getAll,
    getNext,
    getNextQ5
};

function getAll() {

    return new Promise((resolve, reject) => {
        raceService.getAll()
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

function get(reunionID, raceNumber) {

    return new Promise((resolve, reject) => {
        raceService.get(reunionID, raceNumber)
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