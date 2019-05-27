import { reunionService } from './../services/reunion';
import {constants} from './../reducers/constants';
import cookie from 'js-cookie';

export const reunionActions = {
    get,
    getAll,
};

function getAll() {

    return new Promise((resolve, reject) => {
        reunionService.getAll()
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

function get(date) {

    return new Promise((resolve, reject) => {
        reunionService.get(date)
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