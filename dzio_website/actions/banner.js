import {bannerService} from './../services/banner';


export const bannerActions = {
    getLast
};

function getLast(lang) {

    return new Promise((resolve, reject) => {
        bannerService.getLast(lang)
            .then((response) => {

                if (response.data) {
                    resolve(response.data);
                } else {
                    reject();
                }
            })
            .catch((error) => {

            });
    });
}
