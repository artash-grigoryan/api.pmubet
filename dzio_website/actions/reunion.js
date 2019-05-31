import { reunionService } from './../services/reunion';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const reunionActions = {
    get,
    getAll,
};

function getAll(lang) {

    return new Promise((resolve, reject) => {
        reunionService.getAll(lang)
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

function get(lang, date) {

    return new Promise((resolve, reject) => {
        reunionService.get(lang, date)
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